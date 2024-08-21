const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    company: {
        type: mongoose.Schema.Types.objectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    requirements: {
        type: [String],
        required: true
    },

    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Associate', 'Hybrid', 'Remote'],
        default: 'Full-time'
    },

    applicationDeadline: {
        type: Date,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;