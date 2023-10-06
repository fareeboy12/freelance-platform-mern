const mongoose = require('mongoose');

const employerDetailSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: false
  },
  companySize: {
    type: String,
    required: false
  },
  totalSpendings: {
    type: String,
    required: false
  },
  hireRate: {
    type: String,
    required: false
  },
  avgHourlyRate: {
    type: String,
    required: false
  },
  totalHours: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  profilePicture: {
    type: String,
    required: false
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  }
},
{
  timestamps: true,
});

const EmployerDetail = mongoose.model('EmployerDetail', employerDetailSchema);

module.exports = EmployerDetail;