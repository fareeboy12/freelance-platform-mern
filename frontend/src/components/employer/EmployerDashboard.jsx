import { Box, Container, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const EmployerDashboard = () => {

  const [jobData, setJobData] = useState(null);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData ? userData.userId : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
        // Fetch the job data using the user ID
        axios.get(`/api/employer/jobs/${userId}`)
            .then((response) => {
                setJobData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching jobs:', error);
            });
    }
}, [userId]); // Fetch data whenever the user ID changes
  
  if (!jobData) {
      return <p>Loading...</p>;
  }

  const handleJobClick = (jobId) => {
    // Redirect the user to the Proposals component with the specific job ID
    navigate(`/applicants/job/${jobId}`);
  };

  return (
    <Container sx={{ mt: 8, pb: 8 }}>
      <Box>
        <Typography variant='h2' sx={{ fontSize: '22px' }}>Your Dashboard</Typography>
      </Box>
      <Box sx={{ border: '1px solid #e4ebe4', borderRadius: '15px', mt: 8 }}>
          <Box sx={{ p: 4 }}>
            <Typography variant='h2' sx={{ fontSize: '22px' }}>Your Postings</Typography>
            {jobData.map((job) => (
              <Box key={job._id} sx={{ mt: 3 }}>
                <Link href="#" onClick={() => handleJobClick(job._id)}>{job?.jobTitle}</Link>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                  <Box sx={{ width: '30%' }}>
                    <Typography variant='body2'>Fixed Price - Public</Typography>
                    <Typography variant='body2'>Created {moment(job.createdAt).fromNow()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '70%' }}>
                    <Box sx={{ width: '30%' }}>
                      <Typography variant='body2'>{job.proposalsCount}</Typography>
                      <Typography variant='body2'>Proposals</Typography>
                    </Box>
                    <Box sx={{ width: '30%' }}>
                      <Typography variant='body2'>0</Typography>
                      <Typography variant='body2'>Messaged</Typography>
                    </Box>
                    <Box sx={{ width: '30%' }}>
                      <Typography variant='body2'>0</Typography>
                      <Typography variant='body2'>Hired</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
      </Box>
    </Container>
  );
}

export default EmployerDashboard;