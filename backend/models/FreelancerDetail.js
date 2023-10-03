const mongoose = require('mongoose');

const freelancerDetailSchema = new mongoose.Schema({
  profileTitle: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: String,
    required: true
  },
  totalEarnings: {
    type: String,
    required: false
  },
  skills: {
    type: Array,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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

const FreelancerDetail = mongoose.model('FreelancerDetail', freelancerDetailSchema);

module.exports = FreelancerDetail;