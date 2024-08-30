const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

exports.getDashboardData = async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        const totalUsers = await User.countDocuments();

        const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(5);
        const recentApplications = await Application.find().sort({ appliedAt: -1 }).limit(5);

        res.status(200).json({
            totalJobs,
            totalApplications,
            totalUsers,
            recentJobs,
            recentApplications
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company', 'name email');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobDetails = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('company', 'name email');
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found!' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    const { jobType, applicationDeadline, description, location, title, requirements } = req.body;

    try {
        const job = Job.findById(req.params.id);

        if (!job) {
            res.status(404).json({ message: 'job not found!' });
        }

        //validate if logged-in user is the admin

        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not Authorized to update this job!' })
        }

        job.title = title || job.title;
        job.description = description || job.description;
        job.location = location || job.location;
        job.applicationDeadline = applicationDeadline || job.applicationDeadline;
        job.requirements = requirements || job.requirements;
        job.jobType = jobType || job.jobType;

        const updatedJob = await job.save();
        res.status(200).json(updatedJob);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'job not found!' })
        }

        //validate if logged-in user is the admin

        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not Authorized to delete this job!' });
        }

        await job.remove();
        res.status(200).json({ message: 'job has been removed!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate('job applicant');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};