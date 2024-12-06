import { Schema, model } from "mongoose";

const TeamsSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        }
    }, {
        id_members: []
    }, {
        leader: {
            type: String,
            required: true
        }
    }, {
        round: {
            type: Number,
            default:0
        }
    }, {
        grades: []
    }
])

export const TeamsModel = model("teams", TeamsSchema)