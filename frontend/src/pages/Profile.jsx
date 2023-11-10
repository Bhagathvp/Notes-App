import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal, Backdrop, Fade, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Nav from '../components/nav'
import { createNote, deleteNote, editNote, getUser } from '../api/Api';
import toast from 'react-hot-toast'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '3px'
  },
  element:{
    margin: '2px',
    width: '40vw'
  },
  btn:{
    margin: '4px',
    boxShadow: theme.shadows[5],
  },
  btn2: {
    boxShadow: theme.shadows[5],
    width: '100px',
    marginLeft: '10px'
  },
  division: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Note Maker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Profile() {

    const classes = useStyles();

    const [notes, setNotes] = useState(null);
    const [name,setName] = useState('User');
    const [openModal, setopenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [Id , setId] = useState('');
    const [heading, setHeading] =  useState('');
    const [description , setDescription] = useState('');

    React.useEffect(()=>{

        const id = JSON.parse(localStorage.getItem('auth')).token;
        getUser({id}).then(res => {
          console.log(res.data);
          setName(res.data.name);
          setNotes(res.data.notes);

        }).catch(err =>{
          console.log(err);
          toast.error( err.response.data.message ? err.response.data.message : err.response.data )
        })
    },[])

    const handleopen = (e)=>{
      setopenModal(true);

      if(e.target.value){
        setId(e.target.value);
        notes.forEach(note => {
          if(note._id === e.target.value){
            setHeading(note.heading);
            setDescription(note.description);
          }
        });
      }
    }
    const handleClose = ()=>{
      setopenModal(false);
      setOpen(false);
      setId(null)
      setHeading('')
      setDescription('')
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      setopenModal(false);

      const heading = data.get('heading');
      const description = data.get('description');
      console.log({
        heading : heading,
        description : description
      })
      if(description.length > 300){
        toast.error('description should be less than 500')
        return
      }
      if(heading.trim() === '' ||  description.trim() === ''){
        toast.error('Cannot have an empty string');
        return
      }

      if(Id){

        editNote({
          id : Id,
          heading : heading,
          description : description
        }).then(res=>{
          console.log(res.data);
          setNotes(res.data.notes);
          toast.success('edited successfully');
        }).catch(err => {
          console.log(err)
          toast.error( err.response.data.message ? err.response.data.message : err.response.data );
        });

      }else{

        createNote({
          heading : heading,
          description : description
        }).then(res=>{
          console.log(res.data);
          setNotes(res.data.notes);
          toast.success('added successfully')
        }).catch(err => {
          console.log(err)
          toast.error( err.response.data.message ? err.response.data.message : err.response.data );
        });

      }
      
    }

    const openDelete =(e) =>{
      setId(e.target.value);
      setOpen(true);
    }

    const Submit = (e) =>{
      e.preventDefault();
      setOpen(false);
      const id = Id;
      setId(null)
      deleteNote({id : id}).then(res=>{
        console.log(res.data);
        setNotes(res.data.notes);
        toast.success('deleted successfully');
      }).catch(err => {
        console.log(err)
      })
    }
    

  return (
    <ThemeProvider theme={defaultTheme}>
        <Nav/>
      <CssBaseline />
      
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container align='center' maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome {name ? name : 'User'}
            </Typography>
            <Button
              sx={{bgcolor:'black', color:'yellow'}}
              align="center"
              onClick={handleopen}
            >Create new note</Button>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {notes?.map((note,index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {note.heading}
                    </Typography>
                    <Typography>
                      {note.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={openDelete} size="small" value={note._id}>Delete</Button>
                    <Button onClick={handleopen} size="small" value={note._id}>Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Note maker
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Create Your Note!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
      <Modal
          open={openModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className={classes.modal}
        >
          <Fade in={openModal}>
            <form className={classes.paper} onSubmit={handleSubmit}>
              {
                Id &&
                <>
                  <TextField className={classes.element} 
                  label="Heading" 
                  variant="outlined" 
                  id='heading'
                  name='heading'
                  value={heading}
                  onChange={(e)=>setHeading(e.target.value)}
                  required/>
                  <TextField 
                  className={classes.element} 
                  label="Enter Note here" 
                  variant="outlined" 
                  id='description'
                  name='description'
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  multiline 
                  maxRows={6} 
                  minRows={6} 
                  required
                  />
                  <div style={{display: 'flex', justifyContent:'space-around',margin:'5px'}}>
                    <Button className={classes.btn} type='submit'>Edit</Button>
                    <Button className={classes.btn} onClick={handleClose}>Close</Button>
                  </div>
                  

                </>
                }
                {
                  !Id &&
                <>
                  <TextField className={classes.element} 
                  label="Heading" 
                  variant="outlined" 
                  id='heading'
                  name='heading'
                  required/>
                  <TextField 
                  className={classes.element} 
                  label="Enter Note here" 
                  variant="outlined" 
                  id='description'
                  name='description'
                  multiline 
                  maxRows={6} 
                  minRows={6} 
                  required
                  />
                  <div style={{display: 'flex', justifyContent:'space-around',margin:'5px'}}> 
                    <Button className={classes.btn} type='submit'>create</Button>
                    <Button className={classes.btn} onClick={handleClose}>Close</Button>
                  </div>
                  
                </>
                

              }
              
            </form>
          </Fade>
        </Modal>
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          className={classes.modal}
        >
          <Fade in={open}>
            <form className={classes.paper} onSubmit={Submit}>
              <Typography >Are you sure you want to delete?</Typography>
              <div className={classes.division}>
                <Button  className={classes.btn2} type='submit'>yes</Button>
                <Button  className={classes.btn2} onClick={handleClose}>NO</Button>
              </div>
              
            </form>
          </Fade>
        </Modal>
    </ThemeProvider>
  );
}