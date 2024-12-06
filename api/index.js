import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userController from "./controllers/UsersController.js"
import EventsController from "./controllers/EventsController.js";
import TeamsController from "./controllers/TeamsController.js";

const app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Conexión exitosa"));

app.use(cors());
app.use(helmet());
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hola desde mi servidor!")
})
app.get("/user/list",userController.getUsers)
app.post("/user/register",userController.register)
app.post("/user/login",userController.login)
app.put("/user/update-profile/:id",userController.updateProfile)

app.get("/event/list",EventsController.getEvents)
app.post("/event/create",EventsController.createEvent)

app.post("/event/:idEvent/:idTeam")

app.get("/team/list",TeamsController.getTeams)


app.listen(4000,()=>console.log("Server is running"))