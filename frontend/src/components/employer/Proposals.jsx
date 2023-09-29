import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FavoriteBorder, LocationOn, ThumbDown, Verified, Person } from '@mui/icons-material'
import { Box, Chip, Container, Rating, Typography } from '@mui/material'

const Proposals = () => {
    const { id } = useParams(); // Extract job ID from URL params
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        // Fetch proposals for the specific job using the ID from the URL
        axios.get(`/api/proposals/getProposals/${id}`)
          .then((response) => {
            console.log(response.data)
            setProposals(response.data);
          })
          .catch((error) => {
            console.error('Error fetching proposals:', error);
          });
      }, [id]); // Fetch data whenever the job ID changes

  return (
    <Container sx={{ my: 8 }}>
        <Box>
        {proposals.map((proposal) => (
            <Box key={proposal?._id} sx={{ borderBottom: '1px solid #e4ebe4', py: 5, px: 5, '&:hover': {backgroundColor: '#f2f7f2', }, }}>
                {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '80%' }}>
                        <Link href="#" underline="hover">sdfdsf</Link>
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
                        <Typography variant='body1' sx={{ fontSize: '12px' }}>Hourly: <strong>$12-$15</strong> - Expert - Est. Time: 1 to 3 months, Less than 30 hrs/week - Posted 2 minutes ago</Typography>
                    </Box>
                    <Box sx={{ width: '100%', mt: 3 }}>
                        <Typography variant='body1' sx={{ fontSize: '14px' }}>asdsadsad</Typography>
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
                </Box> */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '18%' }}>
                    {proposal?.user?.profilePicture ? (
                        // If user has profile picture, display it
                        <img src={proposal.user.profilePicture} alt="Profile" />
                    ) : (
                        // If user doesn't have profile picture, display Material-UI's Person icon
                        // <Person fontSize='large'/>
                        <img src="data:image/png;base64,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" alt="" />
                    )}
                    </Box>
                    <Box sx={{ width: '80%' }}>
                        <Typography variant='body'>{proposal?.user?.firstName} {proposal?.user?.lastName}</Typography>
                        <Typography variant='body2'>{proposal?.user?.title ? '' : 'Full Stack Developer'}</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 3 }}>
                            <Box sx={{ width: '50%' }}>
                                <Typography variant='body2'>${proposal?.hourlyRate}</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Typography variant='body2'>${proposal?.user?.totalEarnings ? '' : '0'} earned</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt:3 }}>
                            <Typography><strong>Cover letter - </strong>{proposal?.coverLetter}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 3 }}>
                        {proposal?.user?.skills && proposal.user.skills.length > 0 ? (
                            // User has skills, map and display individual chips
                            proposal.user.skills.map((skill, index) => (
                                <Link key={index} href={`/skills/${skill}`} color="inherit" underline="none">
                                    <Chip label={skill} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                                </Link>
                            ))
                        ) : (
                            // User doesn't have skills, display default chips
                            ['HTML', 'CSS', 'PHP', 'Laravel'].map((skill, index) => (
                                <Chip key={index} label={skill} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                            ))
                        )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        ))}
        </Box>
    </Container>
  )
}

export default Proposals