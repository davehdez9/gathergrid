import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity',
            required: true
        },
        name : {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        body: {
            type: String,
            required: true
        },
        read: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

const Message =
    mongoose.models.Message || mongoose.model('Message', MessageSchema)

export default Message