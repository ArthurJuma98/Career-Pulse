const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    const { title, description, location, jobType, requirements, applicationDeadline } = req.body;

    try {
        const job = await Job.create({
            company: req.user._id,
            title,
            description,
            location,
            jobType,
            requirements,
            applicationDeadline
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company', 'name email');
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};