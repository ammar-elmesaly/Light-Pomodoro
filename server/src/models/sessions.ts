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

    plannedDuration: {
        type: Number,  // in ms
        required: true
    },
    
    duration: {
        type: Number,  // in ms
    },

    status: {
        type: String,
        enum: ['active', 'ended', 'paused'],
        default: 'active'
    }
},
{ versionKey: false }
);

export const Session = mongoose.model('Session', sessionSchema);