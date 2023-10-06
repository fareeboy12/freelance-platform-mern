const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const FreelancerDetail = require('../models/FreelancerDetail');
const EmployerDetail = require('../models/EmployerDetail');

const registerUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure user data from the request body
  const { firstName, lastName, accountType, email, password } = req.body;

  try {
    // Check if user with the same email exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      firstName,
      lastName,
      accountType,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Create and return a JSON Web Token (JWT) for authentication
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const loginUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // Destructure user data from the request body
    const { email, password } = req.body;
  
    try {
      // Check if a user with the provided email exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      // Check if the provided password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
  
      // If the login is successful, create and return a JSON Web Token (JWT)
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
        async (err, token) => {
          if (err) throw err;
          // Return the user data and token
          let responseData = {
            token,
            user: {
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              accountType: user.accountType,
              country: user.country,
              state: user.state,
              city: user.city,
              phone: user.phone
            },
          };
    
          // Check if the user is a Freelancer
          if (user.accountType === 'Freelancer') {
            // Fetch Freelancer details for the logged-in user
            const freelancerDetail = await FreelancerDetail.findOne({ userId: user._id });
            responseData.freelancerDetail = freelancerDetail;
          }

          else if (user.accountType === 'Employer') {
            // Fetch Freelancer details for the logged-in user
            const employerDetail = await EmployerDetail.findOne({ userId: user._id });
            responseData.employerDetail = employerDetail;
          }
    
          res.json(responseData);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};
  
  module.exports = {
    registerUser,
    loginUser,
  };
