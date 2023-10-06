import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, Box, Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Skeleton, TextField, Typography, styled } from '@mui/material'
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

  
  const skills = [
    'PHP',
    'CSS',
    'JavaScript',
    'HTML',
    'Python',
    'Java',
    'Ruby',
    'C++',
    'C#',
    'Swift',
    'SQL',
    'Node.js',
    'React.js',
    'Angular.js',
    'Vue.js',
    'Express.js',
    'Django',
    'Laravel',
    'ASP.NET',
    'WordPress',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'Firebase',
    'Git',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'AWS',
    'Azure',
    'Google Cloud Platform'
  ];

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


const FreelancerProfile = () => {

    const { userData } = useUser();
    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState('');
    const [profilePicture, setProfilePicture] = useState();

    const [freelancerDetail, setFreelancerDetail] = useState({
        profilePicture: '',
        profileTitle: '',
        hourlyRate: '',
        skills: [],
        userId: '',
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

    const [selectedSkills, setSelectedSkills] = useState(freelancerDetail?.skills || []);

    const defaultSkills = [...new Set(freelancerDetail.skills || [])];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFreelancer({ ...freelancerDetail, [name]: value });
    };

    const handleSkillChange = (_, newSkills) => {
        setSelectedSkills(newSkills);
        setFreelancer({ ...freelancerDetail, skills: newSkills.map(skill => skill) });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const data = {
                ...freelancerDetail,
                ...userDetail,
                ...password,
                ...profilePicture
            }
            // Send a POST request to the server endpoint with profileInfo data
            const response = await axios.post('/api/freelancer/updateProfile', data);

            if(response.status == "200"){
                toast.success('Profile Updated Successfully.');
                fetchProfileData();
            }
            else{
                toast.error('Something went wrong.');
            }


            // Handle the response if needed
            console.log('Profile updated successfully!', response.data);
        } catch (error) {
            // Handle errors here, e.g., show an error message to the user
            console.error('Error updating profile:', error);
        }
    }


    const fetchProfileData = async () => {
        try {
            const userId = userData?.userId;
            const response = await axios.get(`/api/freelancer/getProfile/${userId}`);
            setFreelancerDetail(response.data.freelancerDetail);
            setUserDetail(response.data.userDetail);
            setLoading(false);
        } catch (error) {
          console.error('Error fetching employer profile data:', error);
        }
    };

    useEffect(() => {

        fetchProfileData();

        // console.log(userData)
    }, [userData]);

    const handleUserDetail = (e) => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value});
    }

    const handleFreelancerDetail = (e) => {
        const {name, value} = e.target;
        setFreelancerDetail({...freelancerDetail, [name]: value});
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

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
        console.log(base64)
        setProfilePicture({profilePicture: base64});
        setImagePreview(base64);
      };

      if (loading) {
        // Render skeleton loading UI while data is being fetched
        return (
            <Container sx={{ py: 10 }}>
                {/* <Skeleton variant="rect" width={200} animation="wave" height={200} sx={{ borderRadius: '50%', margin: '0 auto 2rem auto' }} />
                <Skeleton variant="text" width={200} animation="wave" height={40} sx={{ margin: '0 auto 1rem auto' }} />
                <Skeleton variant="text" width={200} animation="wave" height={40} sx={{ margin: '0 auto 1rem auto' }} />
                <Skeleton variant="text" width={200} animation="wave" height={40} sx={{ margin: '0 auto 1rem auto' }} /> */}
                {/* Render other skeleton components as needed */}

                <Box>
                    <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                    <Box sx={{ border: '1px solid #e4ebe4', borderRadius: '15px', mt: 5, p: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '30%', mt: 2, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center' }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                            <Skeleton variant="rect" width={50} animation="wave" height={50} sx={{ borderRadius: '50%', margin: '0 auto 2rem auto' }} />
                        </Box>
                        <Box sx={{ width: '50%', mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'end', alignContent: 'center' }}>
                            <Skeleton variant="rect" width={200} animation="wave" height={200} sx={{ borderRadius: '50%', margin: '0 auto 2rem auto' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="rectangular" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '32%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '49%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '49%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Skeleton variant="text" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Skeleton variant="rounded" animation="wave" height={40} sx={{ width: '100%' }} />
                        </Box>
                    </Box>
                </Box>
            </Container>
        );
    }

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
                        <VisuallyHiddenInput type="file" name="profilePicture" id="profilePicture" accept={fileTypes} onChange={(e) => handleFileUpload(e)} />
                    </Button>
                </Box>
                <Box sx={{ width: '50%', mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'end', alignContent: 'center' }}>
                    {imagePreview ? (
                        <Box
                            component="img"
                            src={imagePreview}
                            alt="Image Preview"
                            sx={{
                                borderRadius: '50%',
                                objectFit: 'cover',
                                height: '200px',
                                width: '200px',
                            }}
                        />
                    ) : (
                        <Box
                            component="img"
                            src={freelancerDetail?.profilePicture || "https://pjiorgdev.wpenginepowered.com/wp-content/uploads/2023/09/user.png"}
                            alt=""
                            sx={{
                                borderRadius: '50%',
                                objectFit: 'cover',
                                height: '200px',
                                width: '200px',
                            }}
                        />
                    )}
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="firstName" name="firstName" type="text" label="First Name" variant="outlined" fullWidth value={userDetail?.firstName} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="lastName" name="lastName" type="text" label="Last Name" variant="outlined" fullWidth value={userDetail?.lastName} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="profileTitle" name="profileTitle" type="text" label="Profile Title" variant="outlined" fullWidth value={freelancerDetail?.profileTitle} onChange={handleFreelancerDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="email" name="email" type="email" label="Email" variant="outlined" fullWidth value={userDetail?.email} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    <TextField id="phone" name="phone" type="tel" label="Phone" variant="outlined" fullWidth value={userDetail?.phone} onChange={handleUserDetail} />
                </Box>
                <Box sx={{ width: '32%', mt: 2 }}>
                    {/* <TextField id="hourlyRate" name="hourlyRate" type="number" label="Hourly Rate" variant="outlined" fullWidth startAdornment={<InputAdornment position="start">$</InputAdornment>} value={freelancerDetail.hourlyRate} onChange={handleInputChange} /> */}
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Hourly Rate</InputLabel> */}
                    <FormControl fullWidth>
                        <OutlinedInput id="hourlyRate" name="hourlyRate" type="number" sx={{ color: '#000' }} label="Hourly Rate" variant="outlined" fullWidth startAdornment={<InputAdornment position="start">$</InputAdornment>} value={freelancerDetail?.hourlyRate} onChange={handleFreelancerDetail} />
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
                    <TextField id="password" name="password" type="password" label="Password" variant="outlined" fullWidth value={userDetail?.password} onChange={handlePasswordChange} />
                </Box>
                <Box sx={{ width: '49%', mt: 2 }}>
                    <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" variant="outlined" fullWidth value={userDetail?.password} onChange={handleConfirmPasswordChange} />
                </Box>
                <Box sx={{ width: '100%', mt: 2 }}>
                <Autocomplete
                        multiple
                        limitTags={5}
                        id="skills"
                        name="skills"
                        fullWidth
                        value={selectedSkills}
                        defaultValue={defaultSkills} // Set default skills from the database
                        options={skills}
                        getOptionLabel={(option) => option || 'Default Title'}
                        onChange={handleSkillChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Skills" placeholder="Skills" />
                        )}
                    />
                </Box>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <TextField id="description" name="description" label="Description" multiline rows={10} fullWidth value={freelancerDetail?.description} onChange={handleFreelancerDetail}/>
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