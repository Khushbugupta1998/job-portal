import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'recruiter', 'admin'], default: 'user' },

    // Profile Fields

    phone: { type: String },
    location: { type: String },
    about: { type: String },
    skills: [{ type: String }],
    experienceYears: { type: Number },
    company: { type: String },
    avatarUrl: { type: String },
    resumeUrl: { type: String }
},
    { timestamps: true }
)

export default mongoose.model('User', userSchema)