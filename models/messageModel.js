import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatroomId:{ type:mongoose.Schema.Types.ObjectId, ref:'Chatroom',required:true},
    senderId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    system: { type: Boolean, default: false }
})

export default mongoose.model("Message",messageSchema);