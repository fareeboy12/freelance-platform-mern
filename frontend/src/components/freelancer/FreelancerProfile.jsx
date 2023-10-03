import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Box, Button, Container, TextField, Typography, styled } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { useUser } from '../../context/authContext';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const FreelancerProfile = () => {
    
    const [profileInfo, setProfileInfo] = useState({
        firstName: '',
        lastName: '',
        profileTitle: '',
        email: '',
        phone: '',
        hourlyRate: '',
        country: '',
        state: '',
        city: '',
        password: '',
        description: '',
    });

    const { userData, setFreelancer, freelancerDetail } = useUser();

    // useEffect(() => {
    //     console.log(profileInfo)
    // }, [profileInfo])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFreelancer({ ...freelancerDetail, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            // Send a POST request to the server endpoint with profileInfo data
            const response = await axios.post('/api/freelancer/updateProfile', {
                ...freelancerDetail,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                email: userData?.email,
                userId: userData?.userId
            });

            // Handle the response if needed
            console.log('Profile updated successfully!', response.data);
        } catch (error) {
            // Handle errors here, e.g., show an error message to the user
            console.error('Error updating profile:', error);
        }
    }


  return (
    <Container sx={{ py: 10 }}>
        <Box>
            <Typography variant='h1' sx={{ fontSize: '28px' }}>Your Profile</Typography>
            <Box sx={{ border: '1px solid #e4ebe4', borderRadius: '15px', mt: 5, p: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Box sx={{ width: '30%', mt: 2, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant='body1'>Profile Picture</Typography>
                    <Button component="label" sx={{ mt: 2 }} size='large' variant="contained" startIcon={<CloudUpload />}>
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Box>
                <Box sx={{ width: '50%', mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'end', alignContent: 'center' }}>
                    <img src="https://pjiorgdev.wpenginepowered.com/wp-content/uploads/2023/09/user.png" height="200px" width="200px" alt="" />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="firstName" name="firstName" type="text" label="First Name" variant="outlined" fullWidth value={userData?.firstName} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="lastName" name="lastName" type="text" label="Last Name" variant="outlined" fullWidth value={userData?.lastName} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="profileTitle" name="profileTitle" type="text" label="Profile Title" variant="outlined" fullWidth value={freelancerDetail.profileTitle} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="email" name="email" type="email" label="Email" variant="outlined" fullWidth value={userData?.email} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="phone" name="phone" type="tel" label="Phone" variant="outlined" fullWidth value={freelancerDetail.phone} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="hourlyRate" name="hourlyRate" type="number" label="Hourly Rate" variant="outlined" fullWidth value={freelancerDetail.hourlyRate} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="country" name="country" type="text" label="Country" variant="outlined" fullWidth value={freelancerDetail.country} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="state" name="state" type="text" label="State" variant="outlined" fullWidth value={freelancerDetail.state} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="city" name="city" type="text" label="City" variant="outlined" fullWidth value={freelancerDetail.city} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '49%', mt: 2 }}>
                    <TextField id="password" name="password" type="password" label="Password" variant="outlined" fullWidth value={freelancerDetail.password} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '49%', mt: 2 }}>
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" variant="outlined" fullWidth value={freelancerDetail.password} onChange={handleInputChange} />
                </Box>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <TextField id="description" name="description" label="Description" multiline rows={10} fullWidth value={freelancerDetail.description} onChange={handleInputChange}/>
                </Box>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Button variant="contained" size="large" color="primary" type="submit" fullWidth onClick={handleSubmit}>Update Profile</Button>
                </Box>
            </Box>
        </Box>
    </Container>
  )
}

export default FreelancerProfile