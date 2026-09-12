import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        images: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true,
    },
)

const Activity = mongoose.models.Activity || mongoose.model("Activity", ActivitySchema)

export default Activity
