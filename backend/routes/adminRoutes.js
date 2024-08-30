const express = require('express');

const { getDashboardData } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashbord', getDashboardData, protect, admin);
router.get('/jobs', protect, admin, getAllJobs);
router.get('/jobs/:id', protect, admin, getJobDetails);
router.put('/jobs/:id', protect, admin, updateJob);
router.delete('/jobs/:id', protect, admin, deleteJob);

router.get('/applications', protect, admin, getAllApplications);
router.get('/applications', protect, admin, getApplicationDetails);
router.put('/applcations', protect, admin, updateApplicationStatus);
router.delete('/applications', protect, admin, deleteApplicaton);

module.exports = router;