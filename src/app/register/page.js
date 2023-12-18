'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export default function Page() {
  // This function does the actual work
  // calling the fetch to get things from the database.
  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === "valid") {
      console.log("User Registered");
    } else {
      console.log("User not Registered");
    }
  }

  // When the button is clicked, this is the event that is fired.
  // The first thing we need to do is prevent the default refresh of the page.
  const handleSubmit = async (event) => {
    console.log("handling submit");

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // Extract form data
    let email = data.get('email');
    let pass = data.get('pass');
    let add = data.get('add');
    let numb = data.get('numb');
    let dob = data.get('dob'); // Assuming dob is part of the form

    console.log("Sent email:" + email);
    console.log("Sent pass:" + pass);
    console.log("Sent address:" + add);
    console.log("Sent phone number:" + numb);
    console.log("Sent date of birth:" + dob);

    // Make sure to include dob in the URL
    runDBCallAsync(`http://localhost:3000/api/register?email=${email}&pass=${pass}&add=${add}&numb=${numb}&dob=${dob}`);
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            User Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              name="numb"
              label="Phone Number"
              type="numb"
              id="numb"
              autoComplete="current-phone-number"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="add"
              label="Address"
              type="text"
              id="add"
              autoComplete="current-address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="dob"
              label="Date of Birth"
              type="date"
              id="dob"
              autoComplete="bday"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}