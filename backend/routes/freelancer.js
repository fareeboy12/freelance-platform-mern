const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalController');
const freelancerController = require('../controllers/freelancerController');

// Endpoint to submit a proposal
router.post('/submitProposal', proposalController.submitProposal);
router.post('/updateProfile', freelancerController.updateProfile);
router.get('/getProfile/:id', freelancerController.getProfile);

module.exports = router;