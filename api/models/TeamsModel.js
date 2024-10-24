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
            type: Schema.Types.ObjectId,
            required: true
        }
    }, {
        round: {
            type: Number,
            required: true
        }
    }, {
        grades: []
    }
])

export const TeamsModel = model("teams", TeamsSchema)