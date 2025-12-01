import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },

    endTime: {
        type: Date,
    },

    pauses: [
        {
            start: Date,
            end: Date
        }
    ],

    duration: {
        type: Number,
    },

    status: {
        type: String,
        enum: ["active", "ended"],
        default: "active"
    }
});

export const Session = mongoose.model('Session', sessionSchema);