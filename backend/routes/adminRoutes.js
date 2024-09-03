const express = require('express');

const { getDashboardData } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

//manage jobs

router.get('/dashbord', getDashboardData, protect, admin);
router.get('/jobs', protect, admin, getAllJobs);
router.get('/jobs/:id', protect, admin, getJobDetails);
router.put('/jobs/:id', protect, admin, updateJob);
router.delete('/jobs/:id', protect, admin, deleteJob);

//manage applications

router.get('/applications', protect, admin, getAllApplications);
router.get('/applications', protect, admin, getApplicationDetails);
router.put('/applcations', protect, admin, updateApplicationStatus);
router.delete('/applications', protect, admin, deleteApplicaton);


//manage users
router.get('/users', protect, admin, getAllUsers);
router.get('/users/:id', protect, admin, getUserDetails);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;