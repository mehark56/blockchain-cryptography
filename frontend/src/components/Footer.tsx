import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
          }}
        >
          Made with ❤️ for India in RVCE Campus
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 