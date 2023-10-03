import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material'

const ApplyToJob = () => {
    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData ? userData.userId : null;
    const [hourlyRate, setHourlyRate] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [estimatedAmount, setEstimatedAmount] = useState(0);
    const navigate = useNavigate();

    const taxFee = hourlyRate * 0.2; // Calculate 20% of the hourly rate
    const formattedTaxFee = taxFee.toFixed(2);

    const handleSubmit = async () => {
        // Validate data before sending the request
        if (!hourlyRate || !coverLetter) {
          // Handle validation error, e.g., display an error message
          return;
        }
    
        // Prepare data for the request
        const data = {
          hourlyRate,
          coverLetter,
          userId,
          jobId: id // jobId from URL params
        };
    
        // Send the POST request to your API endpoint
        await axios.post('/api/freelancer/submitProposal', data)
          .then(response => {
            // Handle successful response, e.g., show a success message to the user
            console.log('Application submitted successfully:', response.data);
            navigate('/freelancer/dashboard');
          })
          .catch(error => {
            // Handle error, e.g., display an error message to the user
            console.error('Error submitting application:', error);
          });
      };

  return (
    <Container sx={{ pb: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', border: '1px solid #e4ebe4', borderRadius: '15px', mt: 8}}>
            <Box sx={{ p: 4 }}>
                <Typography variant='h2' sx={{ fontSize: '22px' }}>Terms</Typography>
                <Typography variant='h2' sx={{ fontSize: '22px', mt: 2 }}>What is the rate you'd like to bid for this job?</Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap'}}>
                    <Box sx={{ width: '80%' }}>
                        <Typography variant='body2'>Your profile rate: <strong>$35.00/hr</strong></Typography>
                    </Box>
                    <Box sx={{ width: '20%' }}>
                        <Typography variant='body2'>Client’s budget: <strong>$25.00 - $50.00</strong></Typography>
                    </Box>
                </Box>

                <Box sx={{ borderBottom: '', display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '80%', mt: 4 }}>
                        <Typography variant='body2'><strong>Hourly Rate</strong></Typography>
                        <Typography variant='body2'>Total amount the client will see on your proposal</Typography>
                    </Box>
                    <Box sx={{ width: '20%', mt: 4 }}>
                        <TextField id="hourlyRate" type='number' label="Your Hourly Rate" variant="outlined" value={hourlyRate} onChange={(e) => {
        const rate = parseFloat(e.target.value);
        setHourlyRate(rate);
        const estimatedAmount = rate * 0.8; // Calculate 80% of hourly rate
        setEstimatedAmount(estimatedAmount);
    }} />
                    </Box>
                    <Box sx={{ width: '80%', mt: 4 }}>
                        <Typography variant='body2'><strong>20% Freelancer Service Fee</strong></Typography>
                    </Box>
                    <Box sx={{ width: '20%', mt: 4 }}>
                        <Typography variant='body2'>-${formattedTaxFee}/hr</Typography>
                    </Box>

                    <Box sx={{ width: '80%', mt: 4 }}>
                        <Typography variant='body2'><strong>You'll receive</strong></Typography>
                        <Typography variant='body2'>The estimated amount you'll receive after service fees</Typography>
                    </Box>
                    <Box sx={{ width: '20%', mt: 4 }}>
                        <TextField id="outlined-basic" type='text' label="You will recieve" variant="outlined" value={`$${estimatedAmount}`} disabled />
                    </Box>
                </Box>

            </Box>
        </Box>

        <Box sx={{ border: '1px solid #e4ebe4', borderRadius: '15px', mt: 8 }}>
            <Box sx={{ p: 4 }}>
                <Typography variant='h2' sx={{ fontSize: '22px' }}>Additional Detials</Typography>
            </Box>

            <Box sx={{ p: 4 }}>
                <Typography variant='body2'>Cover letter</Typography>
                <TextField
                    sx={{ mt:2 }}
                    id="coverLetter"
                    label="Cover Letter"
                    multiline
                    rows={8}
                    fullWidth
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                />
            </Box>

            <Box sx={{ p: 4 }}>
                <Button variant="contained" onClick={handleSubmit}>Send for 16 Connects</Button>
                <Button variant="text">Cancel</Button>
            </Box>
        </Box>
    </Container>
  )
}

export default ApplyToJob