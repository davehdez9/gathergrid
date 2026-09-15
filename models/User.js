import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        bookmarks : {
            type : [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Activity'
                }
            ],
            default: [],
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User
