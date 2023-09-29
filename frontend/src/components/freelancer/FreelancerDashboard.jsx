import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Container as MuiContainer, Button, CircularProgress } from '@mui/material';
import HourlyJob from './HourlyJob';
import FixedPriceJob from './FixedPriceJob';

const FreelancerDashboard = () => {

  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(10);
  const [allJobsLoaded, setAllJobsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    
    axios.get('/api/employer/jobs')
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  const loadMoreJobs = () => {
    setVisibleJobs(visibleJobs + 10);
    if (visibleJobs >= jobs.length - 10) {
      setAllJobsLoaded(true); // Set the flag when all jobs are loaded
    }
  };

  return (
    <MuiContainer maxWidth="xl" sx={{ mt: 8, pb: 8 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box sx={{ width: '80%' }}>
          {loading && <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box> /* Show loading indicator */}
          {!loading && (
            <Box sx={{ border: '1px solid #e4ebe4', borderRadius: '15px' }}>
              <Box sx={{ pt: 4, pl: 4 }}>
                <Typography variant="h2" sx={{ fontSize: '22px' }}>Jobs you might like</Typography>
              </Box>
              {jobs.slice(0, visibleJobs).map((job, index) => (
                <Box key={index}>
                  {job?.budgetType === 'Hourly' ? <HourlyJob jobId={job._id} /> : <FixedPriceJob jobId={job?._id} />}
                </Box>
              ))}
              {!allJobsLoaded && (
                <Box sx={{ width: '100%', my: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button variant="outlined" color="primary" onClick={loadMoreJobs} sx={{ borderRadius: '10rem' }}>
                    Load More Jobs
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
        <Box sx={{ width: '18%' }}></Box>
      </Box>
    </MuiContainer>
  );''
}

export default FreelancerDashboard;