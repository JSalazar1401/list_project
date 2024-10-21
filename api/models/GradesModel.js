import { Schema, model } from "mongoose";

const GradesSchema = new Schema([
    {
        id_group: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }, {
        ronda: {
            type: Number,
            required: true
        }
    }, {
        id_event: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }, {
        grades: []
    }
])

export const GradesModel = model("grades", GradesSchema);
