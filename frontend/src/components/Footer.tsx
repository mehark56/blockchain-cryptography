import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="inherit" href="https://rvce.edu.in/">
            R.V. College of Engineering, Bangalore
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Developed by '}
          <Link color="inherit" href="#">
            Mehar Kulkarni
          </Link>
          {' | Blockchain-based Land Records Management System'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 