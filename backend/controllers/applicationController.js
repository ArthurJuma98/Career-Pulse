const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyForJob = async (req, res) => {
    const { jobId, resume, coverLetter } = req.body;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found!' });
        }

        const application = await Application.create({
            job: jobId,
            applicant: req.user._id,
            resume,
            coverLetter
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getApplications  = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user._id }).populate('job');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};