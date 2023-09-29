const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalController');

router.get('/getProposals/:id', proposalController.getProposals);

module.exports = router;