import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatroomId:{ type:mongoose.Schema.types.objectId,ref:'Chatroom',required:true},
    senerId:{type:mongoose.Schema.types.objectId, ref:'User', required: true},
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    system: { type: Boolean, default: false }
})

export default mongoose.model("Message",messageSchema);