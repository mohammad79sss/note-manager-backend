import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    system: { type: Boolean, default: false }
});

export default mongoose.model("Comment", commentSchema);
