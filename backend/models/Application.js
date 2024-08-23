const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },

    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    resume: {
        type: String,
        required: true
    },

    coverLetter: {
        type: String
    },

    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Accepted','Rejected'],
        default: 'pending'
    },

    applideAt: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;