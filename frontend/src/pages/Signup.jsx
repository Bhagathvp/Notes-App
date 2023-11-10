import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast from 'react-hot-toast';

import { signUpApi } from '../api/Api';
import Nav from '../components/nav';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://hinged.vercel.app/">
        Note Maker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme({
    palette: {
      background: {
        default: '#e6e9f0',
      },
      text: {
        primary: '#000000',
      },
    },
  });
  

export default function SignUp() {
  const navigate = useNavigate();
  
 const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const email = data.get('email');
  const password = data.get('password');
  const Fname = data.get('firstName');
  const Lname = data.get('lastName');

  if (email.trim() !== "" && password.trim() !== "" && Fname.trim() !== "" && Lname.trim() !== "") {
    console.log({
      email: email,
      password: password,
      firstname : Fname,
      lastname: Lname
    });
   
      signUpApi(
        {
          email: email,
          password: password,
          firstname : Fname,
          lastname: Lname
        }
      ).then(res=>{
        console.log(res);
        toast.success(res.data);
        navigate('/login')
      }).catch(error=>{
        console.log(error);
        toast.error(error.response.data)
      })
    
  } else {
    toast.error("All fields must be filled out.");
  }
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Nav/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            border: 2,
            p : 5,
            borderRadius: 2,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#21302b' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3,color: 'black' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:'black' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}