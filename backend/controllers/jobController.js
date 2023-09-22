const Job = require('../models/Jobs');

// Create a new job
const createJob = async (req, res) => {
  try {
    // Destructure job data from the request body
    const {
      jobType,
      jobTitle,
      selectedSkills,
      scope,
      budgetType,
      budgetFrom,
      budgetTo,
      projectBudget,
      description,
      userId,
    } = req.body;

    // Create a new job instance
    const job = new Job({
      jobType,
      jobTitle,
      selectedSkills,
      scope,
      budgetType,
      budgetFrom,
      budgetTo,
      projectBudget,
      description,
      userId,
    });

    // Save the job to the database
    await job.save();

    res.status(200).json({ message: 'Job posted successfully', job });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getJob = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createJob,
  getJob
};