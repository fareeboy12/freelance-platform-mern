const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Route to create a new job
router.post('/post-a-job', jobController.createJob);
router.get('/jobs', jobController.getJob);
router.get('/job/:id', jobController.getSingleJob);

module.exports = router;