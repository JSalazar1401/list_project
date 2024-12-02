import { EventModel } from "../models/EventsModel.js";
import { GradesModel } from "../models/GradesModel.js";
import { TeamsModel } from "../models/TeamsModel.js";

//Crear calificaciones
//Devolverlas


export default {
    createGrade: async (req, res) => {
        try {
            const idTeam = req.params.idTeam;
            const group = await TeamsModel.findById(idTeam);
            if (!group) {
                return res.status(400).json({ msg: "Grupo no encontrado :C" })
            };
            const round = req.body.round;
            if (!round) {
                return res.status(400).json({ msg: "Ronda invalida :C" })
            }

            const idEvent = req.params.idEvent;
            const event = await EventModel.findById(idEvent);
            if (!event) {
                return res.status(400).json({ msg: "Evento no encontrado :C" })
            }
            //Validar que el equipo si este registrado al evento
            if (!event.groups.includes(group._id)) {
                return res.status(400).json({ msg: "No hay corelacion entre el grupo y el evento :C" })
            }
            //Validar que la calificacion no exista!
            const gradesFromDb = await GradesModel.findOne({ id_event: event._id, round: round, id_group: group._id });
            gradesFromDb.grades.filter((grade) => {
                grade.id_judge == req.body.id_judge
            })
            //Calificaciones
            const grade = req.body.grade;




        } catch (error) {

        }
    }
}