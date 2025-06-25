import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import { useAuth } from '../contexts/AuthContext';
import { IconType } from 'react-icons';
import { FaLandmark, FaFileAlt, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features: Feature[] = [
    {
      icon: FaShieldAlt,
      title: 'Secure Records',
      description: 'All land records are secured using blockchain technology, ensuring immutability and transparency.',
    },
    {
      icon: FaShieldAlt,
      title: 'Digital Signatures',
      description: 'Advanced digital signatures verify the authenticity of all transactions and documents.',
    },
    {
      icon: FaShieldAlt,
      title: 'Smart Contracts',
      description: 'Automated contract execution ensures compliance and reduces processing time.',
    },
    {
      icon: FaShieldAlt,
      title: 'Real-time Updates',
      description: 'Track all changes and updates to land records in real-time with our advanced dashboard.',
    },
  ];

  const stats = [
    { label: 'Records Processed', value: 1000, suffix: '+' },
    { label: 'Active Users', value: 500, suffix: '+' },
    { label: 'Success Rate', value: 99, suffix: '%' },
    { label: 'Processing Time', value: 5, suffix: ' min' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #FF9800 30%, #F57C00 90%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  Land Registry on Blockchain
                </Typography>
                <Typography variant="h5" paragraph sx={{ opacity: 0.9 }}>
                  Secure, Transparent, and Immutable Land Record Management
                </Typography>
                <motion.div variants={itemVariants}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                    sx={{
                      mt: 2,
                      backgroundColor: '#1976d2',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                  >
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box component="span">
                      {React.createElement(FaLandmark, { size: 80, color: "white" })}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box component="span">
                          {React.createElement(FaFileAlt, { size: 40, color: "white" })}
                        </Box>
                        <Typography variant="body2" color="white" align="center">
                          Document
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box component="span">
                          {React.createElement(FaShieldAlt, { size: 40, color: "white" })}
                        </Box>
                        <Typography variant="body2" color="white" align="center">
                          Security
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box component="span">
                          {React.createElement(FaCheckCircle, { size: 40, color: "white" })}
                        </Box>
                        <Typography variant="body2" color="white" align="center">
                          Verification
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Key Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2 }} component="span">
                      {React.createElement(feature.icon, { size: 40 })}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: '#F5F7FA', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 3, md: 4 },
                        mb: { xs: 4, md: 6 },
                        textAlign: 'center',
                        background: 'linear-gradient(45deg, #FF9800 30%, #F57C00 90%)',
                        color: 'white',
                      }}
                    >
                      <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                      >
                        <CountUp
                          end={stat.value}
                          suffix={stat.suffix}
                          duration={2.5}
                        />
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          opacity: 0.9,
                          maxWidth: '800px',
                          mx: 'auto',
                          fontSize: { xs: '1rem', md: '1.25rem' }
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center', bgcolor: '#FFFFFF' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Join our platform today and experience the future of land record management.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            sx={{ mt: 2 }}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Sign Up Now'}
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home; 