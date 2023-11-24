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
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { useState, useEffect } from 'react'

export default function Page() {
    const [data, setData] = useState(null);
    const [weather, setWeatherData] = useState(null);
  
    useEffect(() => {
      // Fetch product data
      fetch('api/getProducts')
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
  
      // Fetch weather data
      fetch('api/getWeather')
        .then((res) => res.json())
        .then((weatherData) => {
          setWeatherData(weatherData);
        });
    }, []);
  
    if (!weather) return <p>No weather</p>;
  
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
          <div style={{ fontSize: '40px' }}> Dashboard</div>
          <div>
            Today's temperature: {JSON.stringify(weather.temp)}
            <br />
  
            {/* Your existing product display */}
            {data &&
              data.map((item, i) => (
                <div style={{ padding: '20px' }} key={i}>
                  Unique ID: {item._id}
                  <br />
                  {item.pname} - {item.price}
                  <br />
                  <Button onClick={() => putInCart(item.pname)} variant="outlined">
                    Add to cart
                  </Button>
                </div>
              ))}
          </div>
        </Container>
      </ThemeProvider>
    );
  }