import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        withUsers: [{contactId:{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
            email: {
                type: String
            }
        }}],
        messages: [
            {
                sender: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                content: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
)

export default mongoose.model("chats", chatSchema);
