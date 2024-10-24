//Ver calificaciones del equipo
//Ver la informacion del equipo al que pertenece
//Lideres inscriben a evento a su equipo
//equipos -> Ver información del evento (jueces, estatus, cuantos participantes, cuantos equipos, ronda del evento)

import { UserModel } from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    register: async (req,res)=>{
        try {
            console.log(req.body)
            const hash = await bcrypt.hash(req.body.password,10);
            const user = {
                name:req.body.name,
                password:hash,
                email:req.body.email,
                CURP:req.body.CURP,
                rol:req.body.rol
            };
            await UserModel.create(user);
            res.status(200).json({msg:"Usuarios registrado con exito"});
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg:"Ocurrior un error al registrarte "});
        }
    },
    login:async (req,res)=>{
        try {
            
            const email = req.body.email;
            const password = req.body.password;
            if(!email || !password){
                return res.status(400).json({msg: "Parametros invalidos"})
            }
    
            const user = await UserModel.findOne({email});
            if(!user){
                return res.status(400).json({msg: "Credenciales invalidas!"})
            }
            if(!bcrypt.compare(password,user.password)){
                return res.status(400).json({msg: "Credenciales invalidas!"})
            }
    
            //Creacion de token
            const token = await jwt.sign(user,process.env.PRIVATE_KEY);
    
            return res.status(200).json({token});
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg:"Ocurrior un error al loguearte "});
        }
    },
    updateProfile:async (req,res)=>{
        try {
            const user = await UserModel.findById(req.params.id);
            if(!user){
                return res.status(400).json({msg: "Usuario no encontrado!"})
            }
            user.name = req.body.name ? req.body.name : user.name; 
            user.password = req.body.password ? req.body.password : user.password;
            user.CURP = req.body.CURP ? req.body.CURP : user.CURP; 
            user.email = req.body.email ? req.body.email : user.email;
    
            await UserModel.findByIdAndUpdate(user._id, user);

            return res.status(200).json({msg:"Perfil actualizado con exito"});
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg:"Ocurrior un error al actualizar tu perfil "});
        }
    }
}