import { Schema, model } from "mongoose";

const GroupsSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        }
    }, {
        members: []
    }, {
        lider: {
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

export const GroupsModel = model("groups", GroupsSchema)