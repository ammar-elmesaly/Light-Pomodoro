import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
},
{ versionKey: false }
);

export const Project = mongoose.model('Project', projectSchema);