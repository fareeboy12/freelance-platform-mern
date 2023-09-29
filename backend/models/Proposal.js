const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  hourlyRate: {
    type: Number,
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job model
    required: true,
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming employer details are stored in a User model)
    required: true,
  },
},  {
    timestamps: true,
  });

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;