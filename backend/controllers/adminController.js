const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

exports.getDashboardData = async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        const totalUsers = await User.countDocuments();

        const recentJobs = await Job.find().sort({ createdAt: -1 }).limit(5);
        const recentApplications = await Appliction.find().sort({ appliedAt: -1 }).limit(5);

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