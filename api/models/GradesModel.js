import { Schema, model } from "mongoose";

const GradesSchema = new Schema([
    {
        id_group: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }, {
        round: {
            type: Number,
            required: true
        }
    }, {
        id_event: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }, {
        grades: [{
            id_metrica: {
                type: Schema.Types.ObjectId,
                required: true
            },
            calificacion: {
                type: Number,
                required: true
            }
        }]
    }
])

export const GradesModel = model("grades", GradesSchema);
