import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const EditApplicationForm = ({ onSubmit, initialValues}) => {
//   const [jobTitle, setJobTitle] = useState(initialValues.jobTitle);
//   const [companyName, setCompanyName] = useState(initialValues.companyName);
//   const [dateApplied, setDateApplied] = useState(initialValues.dateApplied);
//   const [status, setStatus] = useState(initialValues.status);
const [jobTitle, setJobTitle] = useState('');
const [companyName, setCompanyName] = useState('');
const [dateApplied, setDateApplied] = useState('');
const [status, setStatus] = useState('');

  //  update state when initialValues change
  useEffect(() => {
    // setJobTitle(initialValues.jobTitle);
    // setCompanyName(initialValues.companyName);
    // setDateApplied(initialValues.dateApplied);
    // setStatus(initialValues.status);
axios.get(`https://rldm4.wiremockapi.cloud/api/v1/application/${initialValues}  `)
.then((res)=>{
      setJobTitle(res.data.title);
    setCompanyName(res.data.company);
     setDateApplied(res.data.dateApplied);
    setStatus(res.data.status);
}).catch((err)=>{
    console.log('error')
})
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const applicationData = {
      id: initialValues,
      jobTitle,
      companyName,
      dateApplied,
      status,
    };
    console.log(applicationData)
    onSubmit(applicationData); // Send updated data to the parent component
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <TextField
        label="Job Title"
        variant="outlined"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        required
      />
      <TextField
        label="Company Name"
        variant="outlined"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <TextField
        label="Date Applied"
        type="date"
        variant="outlined"
        value={dateApplied}
        onChange={(e) => setDateApplied(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <FormControl fullWidth required>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="applied">Applied</MenuItem>
          <MenuItem value="interviewing">Interviewing</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        {'Update'}
      </Button>
    </Box>
  );
};

export default EditApplicationForm;
