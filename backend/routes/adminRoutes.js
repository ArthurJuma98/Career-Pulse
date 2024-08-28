const express = require('express');

const { getDashboardData } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashbord', getDashboardData, protect, admin);

module.exports = router;
