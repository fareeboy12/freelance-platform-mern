import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Rating, Box, Chip, Link } from '@mui/material';
import { LocationOn, ThumbDown, FavoriteBorder, Verified } from '@mui/icons-material';
import moment from 'moment';

const HourlyJob = ({ jobId }) => {

    const navigate = useNavigate();

    const [jobData, setJobData] = useState(null);

    useEffect(() => {
        // Fetch the specific job by jobId
        axios.get(`/api/employer/job/${jobId}`)
          .then((response) => {
              setJobData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching job:', error);
          });
      }, [jobId]);


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

      const handleJobClick = (jobId) => {
        navigate(`/job/${jobId}`);
      };

  return (
    <Box>
        <Box key={jobData?._id} sx={{ borderBottom: '1px solid #e4ebe4', py: 5, px: 5, '&:hover': {backgroundColor: '#f2f7f2', }, }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Box sx={{ width: '80%' }}>
                    <Link href="#" underline="hover" onClick={() => handleJobClick(jobData?._id)}>{jobData?.jobTitle}</Link>
                </Box>
                <Box sx={{ width: '10%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', border: '2px solid #d5e0d5', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                        <Link href="#"><ThumbDown fontSize='small' sx={{ verticalAlign: 'middle' }} /></Link>
                    </Box>
                    <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', border: '2px solid #d5e0d5', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                        <Link href="#"><FavoriteBorder fontSize='small' sx={{ verticalAlign: 'middle' }} /></Link>
                    </Box>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Typography variant='body1' sx={{ fontSize: '12px' }}>Hourly: <strong>${jobData?.budgetFrom}-${jobData?.budgetTo}</strong> - Expert - Est. Time: 1 to 3 months, Less than 30 hrs/week - Posted {displayJobCreationTime(jobData?.createdAt)}</Typography>
                </Box>
                <Box sx={{ width: '100%', mt: 3 }}>
                    <Typography variant='body1' sx={{ fontSize: '14px' }}>{jobData?.description}</Typography>
                    <Link href="#">More</Link>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 3 }}>
                    {jobData?.selectedSkills.map((skill, index) => (
                    <Link key={index} href={`/skills/${skill}`} color="inherit" underline="none">
                        <Chip label={skill} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                    </Link>
                    ))}
                </Box>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Typography variant='body1' sx={{ fontSize: '12px' }}>Proposal: <strong>Less than 5</strong></Typography>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', alignContent: 'center', mt: 2 }}>
                    <Typography variant='body2' sx={{ fontSize: '12px', mr: 2, verticalAlign: 'middle' }}><Verified sx={{ verticalAlign: 'middle' }} fontSize='small'/> Payment verified</Typography>
                    <Typography variant='body2' sx={{ fontSize: '12px', mr: 2, verticalAlign: 'middle' }}><Rating sx={{ verticalAlign: 'middle' }} size='small' name="job-rating" value={4.5} precision={0.1} readOnly /></Typography>
                    <Typography variant='body2' sx={{ fontSize: '12px', mr: 2, verticalAlign: 'middle' }}><strong>$40K+</strong> spent</Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px', verticalAlign: 'middle' }}><LocationOn sx={{ verticalAlign: 'middle' }} fontSize='small'/>United States</Typography>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default HourlyJob