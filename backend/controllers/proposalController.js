const Proposal = require('../models/Proposal');
const Job = require('../models/Jobs');
const User = require('../models/User');

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

const getProposals = async (req, res) => {
    const jobId = req.params.id;
    // console.log(jobId)

    try {
        // Fetch proposals by job ID from the database
        const proposals = await Proposal.find({ jobId: jobId })
            .populate({
                path: 'userId',
                model: 'User',
                select: '-password', // exclude password field
            });

        // Map through proposals and extract user data
        const populatedProposals = proposals.map(proposal => {
            const { userId, ...rest } = proposal._doc;
            return {
                ...rest,
                user: userId // include user data
            };
        });
      
        res.json(populatedProposals);
    } catch (error) {
        console.error('Error fetching proposals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
  submitProposal,
  getProposals
};
