import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Link, Button, Rating } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { FavoriteBorder, Verified } from '@mui/icons-material';

const SingleJob = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [jobData, setJobData] = useState(null);

    useEffect(() => {
        // Fetch the job data using the ID from the URL
        axios.get(`/api/employer/job/${id}`)
          .then((response) => {
            setJobData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching job:', error);
          });
    }, [id]); // Fetch data whenever the ID changes
    
    if (!jobData) {
        return <p>Loading...</p>;
    }

    const handleApplyNowClick = () => {
        // Redirect user to ApplyToJob component with the job ID in the URL
        navigate(`/proposals/job/${jobData?._id}/apply`);
    };

    const displayJobCreationTime = (createdAt) => {
        const now = moment();
        const jobCreationTime = moment(createdAt);
      
        const timeDifference = now.diff(jobCreationTime, 'minutes');
      
        if (timeDifference < 60) {
          return `${timeDifference} minutes ago`;
        } else if (timeDifference < 1440) {
          return `${Math.floor(timeDifference / 60)} hours ago`;
        } else if (timeDifference < 43200) {
          return `${Math.floor(timeDifference / 1440)} days ago`;
        } else {
          return `${Math.floor(timeDifference / 43200)} months ago`;
        }
      };

        const renderContent = () => {
            if (jobData.budgetType === 'Fixed') {
            return (
                <Box sx={{ borderTop: '1px solid #e4ebe4', display: 'flex', flexWrap: 'wrap', justifyContent: 'start', py: 2 }}>
                <Box sx={{ width: '30%' }}>
                    <Typography variant='body2'>{`$${jobData?.projectBudget.toFixed(2)}`}</Typography>
                    <Typography variant='body2'>Fixed-price</Typography>
                </Box>
                <Box sx={{ width: '70%' }}>
                    <Typography variant='body2'>{jobData?.projectLength}</Typography>
                    <Typography variant='body2'>Project Length</Typography>
                </Box>
                </Box>
            );
            } else if (jobData.budgetType === 'Hourly') {
            return (
                <Box sx={{ borderTop: '1px solid #e4ebe4', display: 'flex', flexWrap: 'wrap', justifyContent: 'start', py: 2 }}>
                <Box sx={{ width: '30%' }}>
                    <Typography variant='body2'><strong>{jobData?.hoursPerWeek ? '' : 'Less than 30 hrs/week'}</strong></Typography>
                    <Typography variant='body2'>Hourly</Typography>
                </Box>
                <Box sx={{ width: '30%' }}>
                    <Typography variant='body2'><strong>{jobData?.projectLength ? '' : '1 to 3 months'}</strong></Typography>
                    <Typography variant='body2'>Project Length</Typography>
                </Box>
                <Box sx={{ width: '30%' }}>
                    <Typography variant='body2'><strong>{jobData?.experienceLevel ? '' : 'Expert'}</strong></Typography>
                    <Typography variant='body2'>I am willing to pay higher rates for the most experienced freelancers</Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Typography variant='body2'><strong>{`$${jobData?.budgetFrom.toFixed(2)} - $${jobData?.budgetTo.toFixed(2)}`}</strong></Typography>
                    <Typography variant='body2'>Hourly</Typography>
                </Box>
                </Box>
            );
            }
            return null; // Return null if budgetType is neither 'Fixed' nor 'Hourly'
        };

  return (
    <Container>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', border: '1px solid #e4ebe4', borderRadius: '15px', mt: 8}}>
            <Box sx={{ width: '78%', p: 4 }}>
                <Typography variant='h1' sx={{ fontSize: '22px', mb: 5 }}>{jobData?.jobTitle}</Typography>
                <Link href="#">Graphic Design</Link>
                <Typography variant='body2' sx={{ mt: 1 }}>Posted {displayJobCreationTime(jobData?.createdAt)}</Typography>
                <Box sx={{ borderTop: '1px solid #e4ebe4', mt:3, py: 3 }}>
                    <Typography variant='body2'>{jobData?.description}</Typography>
                </Box>

                {renderContent()}
                <Box sx={{ borderTop: '1px solid #e4ebe4', py: 2 }}>
                    <Typography variant='body2'><strong>Project Type:</strong> One-time project</Typography>
                </Box>
                <Box sx={{ borderTop: '1px solid #e4ebe4', py: 2 }}>
                    <Typography variant='h6' sx={{ mt:1 }}>Activity on this job</Typography>
                    <Typography variant='body2' sx={{ mt:1 }}>Proposals: 5 to 10</Typography>
                    <Typography variant='body2' sx={{ mt:1 }}>Last viewed by client: 1 hour ago</Typography>
                    <Typography variant='body2' sx={{ mt:1 }}>Interviewing: 0</Typography>
                    <Typography variant='body2' sx={{ mt:1 }}>Invites sent: 0</Typography>
                    <Typography variant='body2' sx={{ mt:1 }}>Unanswered invites: 0</Typography>
                </Box>
            </Box>
            <Box sx={{ width: '22%', p: 2, borderLeft: '1px solid #e4ebe4' }}>
                <Button variant="contained" sx={{ borderRadius: '10rem' }} onClick={handleApplyNowClick}>Apply Now</Button>
                <Button variant="outlined" sx={{ mt: 2, borderRadius: '10rem' }}><FavoriteBorder /> Save Job</Button>
                <Box sx={{ mt:2 }}>
                    <Typography variant='body2'>Send a proposal for: 16 Connects</Typography>
                    <Typography variant='body2'>Available Connects: 312</Typography>
                </Box>
                <Box sx={{ borderTop: '1px solid #e4ebe4', mt:3, pt:3 }}>
                    <Typography variant='body1' sx={{ mb:2 }}>About the client</Typography>
                    <Typography variant='body2'><Verified sx={{ verticalAlign: 'middle' }}/> Payment Method Verified</Typography>
                    <Typography variant='body2' sx={{ fontSize: '12px', mr: 2, mt:2, verticalAlign: 'middle' }}><Rating sx={{ verticalAlign: 'middle' }} size='small' name="job-rating" value={4.5} precision={0.1} readOnly /> 4.81 of 16 reviews</Typography>
                    <Typography variant='body2' sx={{ mt:2 }}><strong>United States</strong></Typography>
                    <Typography variant='body2'>New York 6:22 pm</Typography>

                    <Typography variant='body2' sx={{ mt:2 }}><strong>25 jobs posted</strong></Typography>
                    <Typography variant='body2'>72% hire rate, 6 open jobs</Typography>

                    <Typography variant='body2' sx={{ mt:2 }}><strong>$9.7K total spent</strong></Typography>
                    <Typography variant='body2'>20 hires, 2 active</Typography>

                    <Typography variant='body2' sx={{ mt:2 }}><strong>$22.04 /hr avg hourly rate paid</strong></Typography>
                    <Typography variant='body2'>374 hours</Typography>

                    <Typography variant='body2' sx={{ mt: 4 }}>Member since Feb 21, 2021</Typography>
                </Box>
            </Box>
        </Box>

        <Box sx={{ border: '1px solid #e4ebe4', borderRadius: '15px', mt: 3 }}>
            <Typography variant='h3' sx={{ fontSize: '22px' }}>Client's recent history (2)</Typography>
        </Box>
    </Container>
  )
}

export default SingleJob