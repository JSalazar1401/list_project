import { EventModel } from "../models/EventsModel";

//Crear eventos
//Actualizar
//Cambiar estatus
//Cambiar ronda (eliminar a los equipos)

export default {
    createEvent: async (req, res) => {
        try {
            const metrics = req.body.metrics;
            //Validar que metricas es un arreglo
            if (!Array.isArray(metrics)) {
                return res.status(400).json({ msg: "Metricas no es un arreglo" })
            }
            //Validar que metricas tiene al menos una metrica
            if (!(metrics.length > 0)) {
                return res.status(400).json({ msg: "Metricas viene vacio :c" })
            }
            //Validar que descripcion y maximo de puntos existe
            //iterar
            const incompleteMetrics = metrics.filter((metric) => (!metric.description) || (!metric.max_points));
            if (incompleteMetrics.length > 0) {
                return res.status(400).json({ msg: "Alguna de las metricas esta incompleta" })
            }
            //Validar que descripcion si tiene texto
            //Validar que el maximo de puntos es mayor a 0
            const invalidMetrics = metrics.filter((metric) => metric.description.length === 0 || metric.max_points === 0);
            if (invalidMetrics.length > 0) {
                return res.status(400).json({ msg: "Alguna de las metricas es invalida" })
            }

            const event = {
                name: req.body.name,
                metrics: metrics,
                maxRound: req.body.maxRound
            };

            await EventModel.create(event);
            return res.status(200).json({ msg: "Evento creado con exito :3" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Error al crear el evento :c" });
        }
    }
}