import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Avatar, Rating, Box, Chip, Container as MuiContainer } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FreelancerDashboard = () => {

  const [jobs, setJobs] = useState([]);

  
  useEffect(() => {
    
    axios.get('/api/employer/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  return (
    <MuiContainer maxWidth="xl" sx={{ mt: 8, pb: 8 }}>
      {jobs.map((job) => (
        <Box boxShadow={3} key={job._id}>
          <Card variant="outlined" sx={{ mt: 1 }}>
            <CardContent>
              <Link href="/job-details" color="inherit" underline="none">
                <Typography variant="h6" gutterBottom>
                  {job.jobTitle}
                </Typography>
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', lineHeight: '1.2' }}>
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  <AttachMoneyIcon fontSize="small" color="info" />
                  {job.budgetType === 'Fixed' ? (
                    `Fixed: $${job.projectBudget}`
                  ) : (
                    `Hourly: $${job.budgetFrom} - $${job.budgetTo}`
                  )}
                </Typography>
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  Intermediate
                </Typography>
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  Est. Time: 1 to 3 months, Less than 30 hrs/week
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Posted 29 minutes ago
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {job.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                {job.selectedSkills.map((skill, index) => (
                  <Link key={index} href={`/skills/${skill}`} color="inherit" underline="none">
                    <Chip label={skill} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                  </Link>
                ))}
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Proposals: Less than 5
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontSize: '1rem', marginRight: 1 }}>
                  <VerifiedUserIcon />
                </Avatar>
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  Payment Verified
                </Typography>
                <Rating name="job-rating" value={5} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ marginLeft: 1, marginRight: 1 }}>
                  $20k+ spent
                </Typography>
                <Avatar sx={{ bgcolor: 'info.main', color: 'info.contrastText', fontSize: '1rem', marginRight: 1 }}>
                  <LocationOnIcon />
                </Avatar>
                <Typography variant="body2">
                  United States
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
    ))}
    </MuiContainer>
  );''
}

export default FreelancerDashboard;