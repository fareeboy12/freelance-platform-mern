import React, { useState, useContext, useEffect  } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useUser } from '../../context/authContext';

const steps = [
  'Getting Started',
  'Job Title',
  'Skills',
  'Scope',
  'Budget',
  'Description',
];

const PostAJob = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobType, setJobType] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [selectedSkills, setSelectedSkills] = useState('');
  const [scope, setScope] = useState('');
  const [budgetType, setBudgetType] = useState('hourly');
  const [budgetFrom, setBudgetFrom] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [description, setDescription] = useState('');

  const { userData } = useUser();
  const userId = userData.userId;

//   useEffect(() => {
//     console.log('userData:', userData);
//   }, [userData]);

  

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = async () => {
    // Prepare the data to send in the POST request
    const formData = {
      jobType,
      jobTitle,
      selectedSkills,
      scope,
      budgetType,
      budgetFrom,
      budgetTo,
      projectBudget,
      description,
      userId,
    };
  
    try {
      const response = await axios.post('/api/employer/post-a-job', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Handle success, e.g., show a success message or redirect
        console.log('Job posted successfully');
      } else {
        // Handle error, e.g., show an error message
        console.error('Error posting job');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error posting job:', error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">What would you like to do?</FormLabel>
            <RadioGroup
              name="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <FormControlLabel
                value="shortTerm"
                control={<Radio />}
                label="Short Term or Part-Time work"
              />
              <FormControlLabel
                value="longTerm"
                control={<Radio />}
                label="Longer-term work"
              />
            </RadioGroup>
          </FormControl>
        );
      case 1:
        return (
          <Box>
            <TextField
              label="Job Title"
              variant="outlined"
              fullWidth
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </Box>
        );
      case 2:
        return (
          <TextField
            label="Search or add up to 10 skills"
            variant="outlined"
            fullWidth
            value={selectedSkills}
            onChange={(e) => setSelectedSkills(e.target.value)}
          />
        );
      case 3:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Scope</FormLabel>
            <RadioGroup
              name="scope"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            >
              <FormControlLabel
                value="Large"
                control={<Radio />}
                label="Large"
              />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel
                value="Small"
                control={<Radio />}
                label="Small"
              />
            </RadioGroup>
          </FormControl>
        );
      case 4:
        return (
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Budget</FormLabel>
              <RadioGroup
                name="budgetType"
                value={budgetType}
                onChange={(e) => setBudgetType(e.target.value)}
              >
                <FormControlLabel
                  value="hourly"
                  control={<Radio />}
                  label="Hourly rate"
                />
                <FormControlLabel
                  value="project"
                  control={<Radio />}
                  label="Project Budget"
                />
              </RadioGroup>
            </FormControl>
            {budgetType === 'hourly' ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10", mt: 5 }}>
                <TextField
                  label="From"
                  variant="outlined"
                  sx={{ width: "20%", mr: "20px" }}
                  type="number"
                  value={budgetFrom}
                  onChange={(e) => setBudgetFrom(e.target.value)}
                />
                <TextField
                  label="To"
                  variant="outlined"
                  sx={{ width: "20%" }}
                  type="number"
                  value={budgetTo}
                  onChange={(e) => setBudgetTo(e.target.value)}
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10", mt: 5 }}>
                <TextField
                    label="Project Budget"
                    variant="outlined"
                    sx={{ width: "20%" }}
                    type="number"
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                />
              </Box>
            )}
          </div>
        );
      case 5:
        return (
        <TextField
          id="filled-textarea"
          label="Description"
          placeholder="Job Description"
          fullWidth
          multiline
          minRows={10}
          variant="filled"
          onChange={(e) => setDescription(e.target.value)}
        />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 8 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        <Box sx={{ mt: 0, p: 10 }}>
          {getStepContent(activeStep)}

          <Box sx={{ mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mt: 2, mr: 2 }}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
                sx={{ mt: 2 }}
              >
                Finish
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ mt: 2 }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PostAJob;
