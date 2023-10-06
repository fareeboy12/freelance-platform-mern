import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { useUser } from '../../context/authContext';
import toast, { Toaster } from 'react-hot-toast';

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


  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

const EmployerProfile = () => {

    const { userData } = useUser();
    const [profilePicture, setProfilePicture] = useState();
    const [employerDetail, setEmployerDetail] = useState({
        profilePicture: '',
        companyName: '',
        companySize: '',
        description: ''
    });
    const [userDetail, setUserDetail] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        country: '',
        state: '',
        city: ''
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {

        const fetchProfileData = async () => {
            try {
                const userId = userData?.userId;
                const response = await axios.get(`/api/employer/getProfile/${userId}`);
                setEmployerDetail(response.data.employerDetail);
                setUserDetail(response.data.userDetail);
            } catch (error) {
              console.error('Error fetching employer profile data:', error);
            }
        };
        fetchProfileData();

        // console.log(userData)
    }, [userData]);


    const handleUserDetail = (e) => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value});
    }

    const handleEmployerDetail = (e) => {
        const {name, value} = e.target;
        setEmployerDetail({...employerDetail, [name]: value});
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Send a POST request to the server endpoint with profileInfo data
            const response = await axios.post('/api/employer/updateProfile', {
                ...employerDetail,
                ...userDetail,
                ...password,
                ...profilePicture
            });

            if(response.status == "200"){
                toast.success('Profile Updated Successfully.');
            }
            else{
                toast.error('Something went wrong.');
            }

        } catch (error) {
            // Handle errors here, e.g., show an error message to the user
            console.error('Error updating profile:', error);
        }
    }

    const fileTypes = '.jpg, .jpeg, .png';
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB limit

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        
        if (file.size > MAX_FILE_SIZE) {
          // Show an error message to the user
          console.error('File size exceeds the limit.');
          return;
        }
      
        const base64 = await convertToBase64(file);
        setProfilePicture(base64);
      };


  return (
    <Container sx={{ py: 10 }}>
        <Toaster position="top-right" reverseOrder={false} />
        <Box>
            <Typography variant='h1' sx={{ fontSize: '28px' }}>Your Profile</Typography>
            <Box sx={{ border: '1px solid #e4ebe4', borderRadius: '15px', mt: 5, p: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Box sx={{ width: '30%', mt: 2, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant='body1'>Profile Picture</Typography>
                    <Button component="label" sx={{ mt: 2 }} size='large' variant="contained" startIcon={<CloudUpload />}>
                        Upload file
                        <VisuallyHiddenInput name="profilePicture" id="profilePicture" type="file" accept={fileTypes} onChange={(e) => handleFileUpload(e)} />
                    </Button>
                </Box>
                <Box sx={{ width: '50%', mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'end', alignContent: 'center' }}>
                <Box
                component="img"
                src={employerDetail?.profilePicture || "https://pjiorgdev.wpenginepowered.com/wp-content/uploads/2023/09/user.png"}
                alt=""
                sx={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    height: '200px',
                    width: '200px',
                }}
                />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="firstName" name="firstName" type="text" label="First Name" variant="outlined" fullWidth value={userDetail?.firstName} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="lastName" name="lastName" type="text" label="Last Name" variant="outlined" fullWidth value={userDetail?.lastName} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="email" name="email" type="email" label="Email" variant="outlined" fullWidth value={userDetail?.email} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="phone" name="phone" type="tel" label="Phone" variant="outlined" fullWidth value={userDetail?.phone} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="companyName" name="companyName" type="text" label="Company Name" variant="outlined" fullWidth value={employerDetail?.companyName} onChange={handleEmployerDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <FormControl sx={{ minWidth: 345 }}>
                        <InputLabel id="demo-simple-select-helper-label">Company Size</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            variant="outlined"
                            name="companySize"
                            value={employerDetail?.companySize}
                            label="Company Size"
                            onChange={handleEmployerDetail}
                            displayEmpty={true}
                        >
                            <MenuItem value={'small'}>Small</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'large'}>Large</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="country" name="country" type="text" label="Country" variant="outlined" fullWidth value={userDetail?.country} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="state" name="state" type="text" label="State" variant="outlined" fullWidth value={userDetail?.state} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="city" name="city" type="text" label="City" variant="outlined" fullWidth value={userDetail?.city} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '49%', mt: 2 }}>
                    <TextField id="password" name="password" type="password" label="Password" variant="outlined" fullWidth value={password} onChange={handlePasswordChange} />
                </Box>
                <Box sx={{ width: '49%', mt: 2 }}>
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" variant="outlined" fullWidth value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </Box>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <TextField id="description" name="description" label="Description" multiline rows={10} fullWidth value={employerDetail?.description} onChange={handleEmployerDetail}/>
                </Box>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Button variant="contained" size="large" color="primary" type="submit" fullWidth onClick={handleSubmit}>Update Profile</Button>
                </Box>
            </Box>
        </Box>
    </Container>
  )
}

export default EmployerProfile