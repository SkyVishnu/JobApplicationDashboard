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


const JobApplicationForm = ({ onSubmit }) => {
  const [title, setJobTitle] = useState( '');
  const [company, setCompanyName] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('applied');


  const handleSubmit = (e) => {
    e.preventDefault();
    const applicationData = {
      
      title,
      company,
      dateApplied,
      status,
    };
    onSubmit(applicationData); // Send data back to parent
    // Reset form
    setJobTitle('');
    setCompanyName('');
    setDateApplied('');
    setStatus('applied');
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
        value={title}
        onChange={(e) => setJobTitle(e.target.value)}
        required
      />
      <TextField
        label="Company Name"
        variant="outlined"
        value={company}
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
        {'Submit'}
      </Button>
    </Box>
  );
};

export default JobApplicationForm;
