import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    thought: {
        type: String,
        required: true
    }
}, { timestamps: true } );

const Message = mongoose.model("message", messageSchema);
export default Message;