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
import { useUser } from '../context/authContext';

const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        const userData = response.data.user;
        console.log(userData)
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        const accountType = userData.accountType;

        let redirectUrl = '';
        if (accountType === 'Freelancer') {
          redirectUrl = '/freelancer/dashboard';
        } else if (accountType === 'Employer') {
          redirectUrl = '/employer/dashboard';
        }

        navigate(redirectUrl);
        // Login successful
        // You can handle success, e.g., redirect to a dashboard page or store the token in local storage.
      } else {
        console.log(response)
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during login:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={containerStyle}>
      <Typography variant="h4" align="center" style={{ color: 'black' }} gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          style={{ backgroundColor: 'white' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
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
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
