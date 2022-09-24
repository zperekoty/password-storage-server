import mongoose from 'mongoose';

const PasswordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    login: { type: String },
    name: { type: String, required: true },
    url: { type: String, required: true },
    username : { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true },);

export default mongoose.model('Password', PasswordSchema);