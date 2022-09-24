import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passwords',
    },],
    name: {
        type: String,
        required: true,
    },
    telegram: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
}, { timestamps: true },);

export default mongoose.model('User', UserSchema);