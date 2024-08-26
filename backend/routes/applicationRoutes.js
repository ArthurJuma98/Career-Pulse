const express = require('express');

const {
    applyForJob,
    getJobApplications,
    getApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', protect, applyForJob);
router.get('/my-applications', protect, getApplications);
router.get('/job-applications/:jobId', protect, getJobApplications);
router.put('/update-status/:id', protect, updateApplicationStatus);

module.exports = router;