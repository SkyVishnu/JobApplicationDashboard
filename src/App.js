import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import JobApplicationForm from './JobApplicationForm';
import EditApplicationForm from './EditApplicationForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';


const App = () => {

  useEffect(()=>{

    axios.get(' https://2o5r8.wiremockapi.cloud/api/v1/applications')
    .then((res)=>{
      setApplications(res.data)
    }).catch((err)=>{
      console.log('error')
    })
  },[])
  const [open, setOpen] = useState(false);
  const[editOpen,setEditOpen] = useState(false)
const [applications, setApplications] = useState([]); 
const [toedit,setToEdit] = useState([])
const[filtermode,setFilterMode]= useState(false)

  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false);
  const handleCloseedit = () => setEditOpen(false);
  const [filterStatus, setFilterStatus] = useState(''); // State for filter
  const [filteredApplications, setFilteredApplications] = useState(applications);



  const handleEdit = (app) => {
  
    setToEdit(app.id)
    setEditOpen(true)
    console.log(`Edit application with ID: ${app.id}`);
  };

  const handleFilter = () => {
    const filtered = applications.filter(app => 
      filterStatus ? app.status === filterStatus : true
    );
    setFilteredApplications(filtered);
  };

  const handleFilterMode = () =>{
    setFilterMode((prev)=>!prev)
  }
  
  // const handleDelete = (id) => {
  
  //   console.log(`Delete application with ID: ${id}`);
  // };

  const handleAddApplication = (application) => {
    // setApplications((prev) => [
    //   ...prev,
    //   { id:  prev.length + 1, ...application }, 
    // ]);
    // console.log("appending", applications);
    // handleClose(); // Close the modal 

    axios.post(`https://rldm4.wiremockapi.cloud/api/v1/application/create`,{
      "title": application.title,
      "company": application.company,
      "dateApplied": application.dateApplied,
      "status": application.status
    }).then((res)=>{
      console.log(res.data)
      setOpen(false)
    }).catch((err)=>{
      console.log(err)
    })
  };

  
  const handleDelete = (id) => {
    // setApplications((prev) => prev.filter((app) => app.id !== id)); 
    // console.log(`Deleted application with ID: ${id}`);
    axios.post(`https://rldm4.wiremockapi.cloud/api/v1/application/delete/${id}`)
    .then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
   
  };
  
  const handleUpdateApplication = (updatedApplication) => {
    // setApplications((prev) =>
    //   prev.map((app) =>
    //     app.id === updatedApplication.id ? updatedApplication : app
    //   )
    // );
    // setEditOpen(false); // Close the modal
    // console.log('Updated Application:', updatedApplication);
    const id = updatedApplication.id
  console.log(id,
updatedApplication)
    

    axios.put(`https://rldm4.wiremockapi.cloud/api/v1/application/update/${id}`,{
      "title": updatedApplication.jobTitle,
      "company": updatedApplication.companyName,
      "dateApplied": updatedApplication.dateApplied,
      "status": updatedApplication.status
    }).then((res)=>{
      console.log(res.data)
        setEditOpen(false); // Close the modal after updating
     console.log('Updated Application:', updatedApplication);
    }).catch((err)=>{
      console.log(err)
    })
  };
  
  
  return (
    <div className="App"> 
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              JOB APPLICATION MANAGEMENT DASHBOARD
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{ marginLeft: 'auto' }}
            >
              Open Application Form
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Modal for Job Application Form */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
         
          <JobApplicationForm onSubmit={handleAddApplication} />
        </Box>
      </Modal>

        {/* Modal for Edit Application Form */}
        <Modal
        open={editOpen}
        onClose={handleCloseedit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
         
          <EditApplicationForm onSubmit={handleUpdateApplication} initialValues={toedit} />
        </Box>
      </Modal>

      {/* Display Submitted Applications */}
 

<Container sx={{ marginTop: 4, padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
  <Typography 
    variant="h5" 
    gutterBottom 
    sx={{ 
      color: '#1976d2', 
      fontWeight: 'bold', 
      borderBottom: '2px solid #1976d2', 
      paddingBottom: 1 
    }}>
    Submitted Applications
  </Typography>

  <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="applied">Applied</MenuItem>
          <MenuItem value="interviewing">Interviewing</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

     { filtermode && <Button 
        variant="contained" 
        color="primary" 
        onClick={handleFilter}
        sx={{ marginBottom: 2 }}
      >
        Filter
      </Button>}

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleFilterMode}
        sx={{ marginBottom: 2 }}
      >
        Filter Mode
      </Button>

      {filtermode &&    
  <List>
    {filteredApplications.map((app) => (
      <ListItem 
        key={app.id} 
        sx={{ 
          backgroundColor: '#fff', 
          marginBottom: 2, 
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
          borderRadius: 1, 
          '&:hover': { 
            backgroundColor: '#e3f2fd', 
          }
        }}>
        <ListItemText
          primary={`${app.title} at ${app.company}`}
          secondary={`Date Applied: ${app.dateApplied} | Status: ${app.status}`}
          sx={{ 
            primary: { 
              fontWeight: 500, 
              color: '#424242' 
            },
            secondary: { 
              color: '#616161' 
            } 
          }}
        />
        {/* Action Buttons for Edit and Delete */}
        <IconButton 
          edge="end" 
          aria-label="edit" 
          sx={{ marginRight: 1 }} 
          onClick={() => handleEdit(app)}
        >
          <EditIcon color="primary" />
        </IconButton>
        <IconButton 
          edge="end" 
          aria-label="delete" 
          onClick={() => handleDelete(app.id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </ListItem>
    ))}
  </List>
}
  {!filtermode &&    
  <List>
    {applications.map((app) => (
      <ListItem 
        key={app.id} 
        sx={{ 
          backgroundColor: '#fff', 
          marginBottom: 2, 
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
          borderRadius: 1, 
          '&:hover': { 
            backgroundColor: '#e3f2fd', 
          }
        }}>
        <ListItemText
          primary={`${app.title} at ${app.company}`}
          secondary={`Date Applied: ${app.dateApplied} | Status: ${app.status}`}
          sx={{ 
            primary: { 
              fontWeight: 500, 
              color: '#424242' 
            },
            secondary: { 
              color: '#616161' 
            } 
          }}
        />
        {/* Action Buttons for Edit and Delete */}
        <IconButton 
          edge="end" 
          aria-label="edit" 
          sx={{ marginRight: 1 }} 
          onClick={() => handleEdit(app)}
        >
          <EditIcon color="primary" />
        </IconButton>
        <IconButton 
          edge="end" 
          aria-label="delete" 
          onClick={() => handleDelete(app.id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </ListItem>
    ))}
  </List>
}
</Container>


    </div>
  );
};

export default App;
