const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalController');

// Endpoint to submit a proposal
router.post('/submitProposal', proposalController.submitProposal);

module.exports = router;