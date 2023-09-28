import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import PasswordStrengthBar from 'react-password-strength-bar';

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    accountType: 'Freelancer',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });

    if (name === 'password') {
      setPasswordStrength(evaluatePasswordStrength(value));
    } else if (name === 'confirmPassword') {
      checkPasswordMatch(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const evaluatePasswordStrength = (password) => {
    // Password strength evaluation logic
    // ...

    return 'Strength'; // Replace with your strength result
  };

  const checkPasswordMatch = (confirmPassword) => {
    if (user.password === confirmPassword) {
      setPasswordMatch('Password Match');
    } else {
      setPasswordMatch('Passwords do not match');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      
      const userDataToSend = {
        firstName: user.firstName,
        lastName: user.lastName,
        accountType: user.accountType,
        email: user.email,
        password: user.password,
      };

        const response = await axios.post('/api/auth/register', userDataToSend);
  
        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem('token', data.token);
          navigate("/login");
        } else {
          console.error('Registration failed:', response.data.message);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error during registration:', error);
      }
  };

  return (
    <Container maxWidth="sm" style={containerStyle}>
      <Typography variant="h4" align="center" style={{ color: 'black' }} gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          style={{ backgroundColor: 'white' }}
          required
          pattern="[A-Za-z]*"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          style={{ backgroundColor: 'white' }}
          pattern="[A-Za-z]*"
        />
        <TextField
          label="Account Type"
          select
          variant="outlined"
          fullWidth
          margin="normal"
          name="accountType"
          value={user.accountType}
          onChange={handleChange}
          style={{ backgroundColor: 'white' }}
          required
        >
          <MenuItem value="Freelancer">Freelancer</MenuItem>
          <MenuItem value="Employer">Employer</MenuItem>
        </TextField>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={user.email}
          onChange={handleChange}
          style={{ backgroundColor: 'white' }}
          required
          type="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={user.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ backgroundColor: 'white' }}
          required
          minLength="8"
        />
        <div style={{ color: 'black' }}>Password Strength:</div>
        <PasswordStrengthBar password={user.password} />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ backgroundColor: 'white' }}
          required
        />
        <div style={{ color: user.password === user.confirmPassword ? 'green' : 'red' }}>
          {passwordMatch}
        </div>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Signup
        </Button>
        <div style={{ color: 'black' }}>
            Already Have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </Container>
  );
}

export default Register;
