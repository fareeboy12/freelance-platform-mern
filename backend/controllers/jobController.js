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
    // const jobs = await Job.deleteMany();

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const jobId = req.params.id; // Extract the job ID from the request parameters

    // Find the job by ID in the database
    const job = await Job.findById(jobId);

    if (!job) {
      // If the job with the given ID is not found, return a 404 Not Found status
      return res.status(404).json({ message: 'Job not found' });
    }

    // If the job is found, return its data
    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  createJob,
  getJob,
  getSingleJob
};