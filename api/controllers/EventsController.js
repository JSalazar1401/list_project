import { EventModel } from "../models/EventsModel.js";
import { GradesModel } from "../models/GradesModel.js";
import { TeamsModel } from "../models/TeamsModel.js";

//Crear eventos
//Actualizar
//Cambiar estatus
//Cambiar ronda (eliminar a los equipos)

const validateEvent = (metrics, name, maxRound) => {
    const data = {
        isValid: false,
        msg: ""
    }
    //Validar que metricas es un arreglo
    if (!Array.isArray(metrics)) {
        data.msg = "Metricas no es un arreglo"
        return data;
    }
    //Validar que metricas tiene al menos una metrica
    if (!(metrics.length > 0)) {
        data.msg = "Metricas viene vacio :c"
        return data
    }
    //Validar que descripcion y maximo de puntos existe
    const incompleteMetrics = metrics.filter((metric) => (!metric.description) || (!metric.max_points));
    if (incompleteMetrics.length > 0) {
        data.msg = "Alguna de las metricas esta incompleta";
        return data;
    }
    //Validar que descripcion si tiene texto Y validar que el maximo de puntos es mayor a 0
    const invalidMetrics = metrics.filter((metric) => metric.description.length === 0 || metric.max_points === 0);
    if (invalidMetrics.length > 0) {
        data.msg = "Alguna de las metricas es invalida";
        return data
    }
    //Validamos el nombre del evento
    if (!name && !name.length) {
        data.msg = "El nombre del evento esta vacio";
        return data
    }
    //Validamos que el maximo de rondas es mayor a 0
    if (!maxRound) {
        data.msg = "Numero maximo de rondas invalido!"
        return data
    }
    //En dado caso que ninguna validacion declaramos que el evento es valido.
    data.isValid = true;
    return data;
}

export default {
    createEvent: async (req, res) => {
        try {
            const { metrics, title, maxRound } = req.body;
            const { isValid, msg } = validateEvent(metrics, title, maxRound);
            if (!isValid) {
                return res.status(400).json({ msg })
            }
            const event = {
                name: title,
                metrics: metrics,
                maxRound: maxRound
            };

            await EventModel.create(event);
            return res.status(200).json({ msg: "Evento creado con exito :3" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Error al crear el evento :c" });
        }
    },
    updateEvent: async (req, res) => {
        try {
            const idEvent = req.params.id;
            const event = await EventModel.findById(idEvent);
            if (!event) {
                return res.status(400).json({ msg: "El evento no existe!" });
            }
            const { metrics, name, maxRound } = req.body;
            const { isValid, msg } = validateEvent(metrics, name, maxRound);
            if (!isValid) {
                return res.status(400).json({ msg })
            }
            await EventModel.findByIdAndUpdate(idEvent, {
                $set: {
                    metrics,
                    name,
                    maxRound
                }
            });
            return res.status(200).json({ msg: "Evento actualizado exitosamente!." })
        } catch (error) {
            return res.status(500).json({ msg: "Error al actualizar el evento :c" });
        }
    },
    changeStatus: async (req, res) => {
        try {
            const idEvent = req.params.id;
            const event = await EventModel.findById(idEvent);
            if (!event) {
                return res.status(400).json({ msg: "Evento no encontrado" })
            }
            if (!["pending", "active", "done"].includes(req.body.status.toLowerCase())) {
                return res.status(400).json({ msg: "El estatus que envias no es aceptable." })
            }
            await EventModel.findByIdAndUpdate(idEvent, {
                $set: {
                    status: req.body.status
                }
            });
            return res.status(200).json({ msg: "Se actualizo el estatus con exito!" })
        } catch (error) {
            return res.status(500).json({ msg: "Error al crear el evento :c" });
        }
    },
    changeRound: async (req, res) => {
        try {
            const idEvent = req.params.id;
            const event = await EventModel.findById(idEvent);
            if (!event) {
                return res.status(400).json({ msg: "Evento no encontrado" })
            }
            const teamsPerRound = req.query.maxTeams ? req.query.maxTeams : 5;
            //1. Traer calificaciones por grupo
            const { groups } = event;
            const teamsWithFinalGrade = [];
            for (const group of groups) {
                const gradesPerMetric = [];
                //Aqui traemos calificaciones por GRUPO
                const { grades } = await GradesModel.findOne({ id_event: event._id, id_group: group });
                //2. Promediar por metrica
                const alreadyChecked = [];
                for (const grade of grades) {
                    const filteredGrades = grades.filter(item => {
                        return grade.id_metric === item.id_metric && !alreadyChecked.includes(grade.id_metric)
                    })
                    console.log(filteredGrades)
                    let gradePerMetric = 0
                    if (filteredGrades.length > 0) {
                        gradePerMetric = filteredGrades.reduce((a, b) => a.grade + b.grade );
                    }
                    if (!alreadyChecked.includes(grade.id_metric)) {
                        alreadyChecked.push(filteredGrades[0].id_metric)
                        gradesPerMetric.push({
                            id_metric:grade.id_metric,
                            grade:gradePerMetric / filteredGrades.length
                        })
                    }
                }
                //3. Promedio final
                const finalGrade = gradesPerMetric.reduce((a,b)=>a.grade+b.grade) / gradesPerMetric.length
                teamsWithFinalGrade.push({
                    idTeam:group,
                    finalGrade,
                    gradesPerMetric
                })
            }
            //4. Ordenar de mayor a menor
            const sortedTeams = teamsWithFinalGrade.sort((a,b)=>a-b);
            //5. Tomar solo la cantidad de maximo de equipos
            const passedTeams = sortedTeams.slice(0,teamsPerRound);
            //Actualizar la ronda de los equipos
            for(const team of passedTeams){
                await TeamsModel.findByIdAndUpdate(team.idTeam,{
                    $set:{
                        round:req.body.round,
                    }
                });
            }
            //Actualizar el arreglo de equipos en el evento
            const nextTeams = passedTeams.map((i)=>i.idTeam);
            await EventModel.findByIdAndUpdate(event._id,{
                $set:{
                    groups:nextTeams,
                    round:req.body.round
                }
            });

            return res.json({msg:"Cambiamos la ronda con exito!"})
        } catch (error) {
            return res.status(500).json({ msg: "Error al cambiar de ronda. :c" });
        }

    }
}
