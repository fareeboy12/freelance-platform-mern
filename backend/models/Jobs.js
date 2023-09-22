const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobType: String,
    jobTitle: String,
    selectedSkills: [String],
    scope: String,
    budgetType: String,
    budgetFrom: Number,
    budgetTo: Number,
    projectBudget: Number,
    description: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
