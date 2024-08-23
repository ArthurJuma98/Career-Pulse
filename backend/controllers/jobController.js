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
        const { search, location, jobType, sortBy } = req.query;

        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };    //case insensitive search
        }

        if (location) {
            query.title = { $regex: location, $options: 'i' };  //case insensitive search
        }

        if (jobType) {
            query.title = jobType;
        }

        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = 1; //specific to field in ascending order
        }

        const jobs = await Job.find(query).populate('company', 'name email').sort(sortOptions);
        res.status(200).json(jobs)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('company', 'name email');

        if (!job) {
            return res.status(404).json({ message: 'job not found!' })
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.updateJob = async (req, res) => {
    const { jobType, applicationDeadline, description, location, title, requirements } = req.body;

    try {
        const job = Job.findById(req.params.id);

        if (!job) {
            res.status(404).json({ message: 'job not found!' });
        }

        //validate if logged-in user is the job poster

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

        //validate if logged-in user is the job poster

        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not Authorized to delete this job!' });
        }

        await job.remove();
        res.status(200).json({ message: 'job has been removed!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};