const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');

router.post('/updateProfile', employerController.updateProfile);
router.get('/getProfile/:id', employerController.getProfile);

module.exports = router;