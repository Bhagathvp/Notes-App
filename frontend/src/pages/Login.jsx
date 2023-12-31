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

import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { signInApi } from '../api/Api';
import Nav from '../components/nav';

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

// TODO remove, this demo shouldn't need to reset the theme.

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
  
  
export default function SignIn() {

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email.trim() !== "" && password.trim() !== "") {
      console.log({
        email: email,
        password: password,
      });
      signInApi({
        email: email,
        password: password,
      }).then(res=>{
        console.log(res);
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/profile')
      }).catch(error => {
        console.log(error);
        toast.error(error.response.data);
      })
    } else {
      toast.error("Both email and password fields must be filled out.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Nav/>
      <Container 
      
      component="main" maxWidth="xs">
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
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 ,color: "black"}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,bgcolor:'black',":hover":'white'}}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}