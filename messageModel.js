import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    thoughts: {
        type: Array,
        required: true
    },
    reports: {
        type: String
    },
    isReported: {
        type: Boolean,
        required: true
    }
}, { timestamps: true } );

const Message = mongoose.model("message", messageSchema);
export default Message;