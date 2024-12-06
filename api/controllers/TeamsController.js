//Crear equipo
//inscribirse al evento

import { EventModel } from "../models/EventsModel.js";
import { TeamsModel } from "../models/TeamsModel.js";

export default {
    createTeam: async (req, res) => {
        try {
            const team = {
                name: req.body.name,
                id_members: req.body.id_members,
                leader: req.body.id_leader
            };
            await TeamsModel.create(team);
            return res.status(200).json({ msg: "Grupo creado con exito!" })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Ocurrio un error al guardar el equipo" })
        }
    },
    registerEvent: async (req, res) => {
        try {
            const idTeam = req.params.id;
            const team = await TeamsModel.findById(idTeam);
            if (!team) {
                return res.status(400).json({ msg: "El equipo no existe!" })
            }
            const idEvent = req.params.idEvent;
            const event = await EventModel.findById(idEvent);
            if (!event) {
                return res.status(400).json({ msg: "El evento al que te intentas registrar no existe!" })
            }
            //Registar al equipo dentro del evento
            await EventModel.findByIdAndUpdate(idEvent,{
                $push:{
                    "groups":idTeam
                }
            })
            return res.status(200).json({msg:"El equipo se inscribio con exito!"})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Ocurrio un error al registrar el equipo" })
        }
    },
    getTeams: async (req, res) => {
        try {
            const teams = await TeamsModel.find();
            return res.status(200).json(teams)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Ocurrior un error al obtener los equipos " });
        }
    }
}
