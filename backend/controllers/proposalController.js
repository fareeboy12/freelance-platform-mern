const Proposal = require('../models/Proposal');
const Job = require('../models/Jobs');

const submitProposal = async (req, res) => {
    const { hourlyRate, coverLetter, userId, jobId } = req.body;
  try {
    const job = await Job.findById(jobId);
    const employerId = job.userId;
    // Create a new proposal instance
    const proposal = new Proposal({
      hourlyRate,
      coverLetter,
      userId,
      jobId,
      employerId,
    });

    console.log(req.body)

    // Save the proposal to the database
    await proposal.save();

    res.status(201).json({ message: 'Proposal submitted successfully.' });
  } catch (error) {
    console.error('Error submitting proposal:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  submitProposal,
};
