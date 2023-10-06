import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, InputAdornment, Box, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '../context/authContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setFreelancer, setEmployer, setAuthToken } = useUser();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      const { user, token, freelancerDetail, employerDetail } = response?.data;

      setUser(user);
      setFreelancer(freelancerDetail);
      setEmployer(employerDetail);
      setAuthToken(token);

      const redirectUrl = user.accountType === 'Freelancer' ? '/freelancer/dashboard' : '/employer/dashboard';
      navigate(redirectUrl);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
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
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 2 }}>
          Login
        </Button>
        <Box sx={{ color: 'black', mt: 2, textAlign: 'center' }}>
          Don't Have an account? <Link to="/register">Register Now!</Link>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
