const express = require('express');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createJob)  //create a job (company only)
    .get(getJobs);    //get all jobs

router.route('/:id')
    .get(getJobById)    //get job by id
    .put(protect, updateJob)    //make changes and update a job (company only)
    .delete(protect, deleteJob);    //delete a job (company only)


module.exports = router;