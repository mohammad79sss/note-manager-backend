import mongoose from 'mongoose';

const chatroomSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, default: '' },
    isShared: { type: Boolean, default: false },
    sharedId: { type: String, unique: true, sparse: true },
    lastModified: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Chatroom", chatroomSchema);
