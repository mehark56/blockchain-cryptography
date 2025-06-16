import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Security as SecurityIcon,
  VerifiedUser as VerifiedUserIcon,
  Lock as LockIcon,
  Fingerprint as FingerprintIcon,
  Storage as StorageIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Key as KeyIcon,
  VpnKey as VpnKeyIcon,
  Https as HttpsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const steps = [
    {
      label: 'Document Hash Generation',
      icon: <FingerprintIcon />,
      description: 'Each land record document is cryptographically hashed using SHA-256',
      details: [
        'Document content is converted to a unique hash value',
        'Hash serves as a digital fingerprint of the document',
        'Any change to the document would result in a different hash',
        'Hash is stored on the blockchain for immutability',
      ],
    },
    {
      label: 'Digital Signature Creation',
      icon: <VpnKeyIcon />,
      description: 'Land owners digitally sign their documents using their private key',
      details: [
        'Owner uses their private key to create a digital signature',
        'Signature is generated using ECDSA (Elliptic Curve Digital Signature Algorithm)',
        'Signature proves ownership and authenticity of the document',
        'Signature is unique to both the document and the owner',
      ],
    },
    {
      label: 'Signature Verification',
      icon: <VerifiedUserIcon />,
      description: 'Digital signatures are verified using public key cryptography',
      details: [
        'System verifies signature using owner\'s public key',
        'Verification confirms document authenticity and ownership',
        'Prevents forgery and unauthorized modifications',
        'Provides non-repudiation (owner cannot deny signing)',
      ],
    },
    {
      label: 'Record Verification Process',
      icon: <CheckCircleIcon />,
      description: 'Administrators verify records through a multi-step process',
      details: [
        'Admin verifies document hash matches the original',
        'Digital signature is validated using owner\'s public key',
        'Record status is updated after successful verification',
        'Verification history is maintained for audit purposes',
      ],
    },
  ];

  const securityFeatures = [
    {
      title: 'Public Key Infrastructure (PKI)',
      icon: <KeyIcon />,
      description: 'Secure key management system for digital signatures',
      details: [
        'Each user has a unique public-private key pair',
        'Private keys are securely stored and never shared',
        'Public keys are used for signature verification',
        'Keys are generated using industry-standard algorithms',
      ],
    },
    {
      title: 'Cryptographic Hash Functions',
      icon: <HttpsIcon />,
      description: 'SHA-256 for document integrity verification',
      details: [
        'One-way hash function for document fingerprinting',
        'Collision-resistant for security',
        'Fixed-length output regardless of input size',
        'Used to detect any document modifications',
      ],
    },
    {
      title: 'Digital Signature Algorithm',
      icon: <LockIcon />,
      description: 'ECDSA for secure digital signatures',
      details: [
        'Elliptic Curve cryptography for efficient signatures',
        'Provides strong security with smaller key sizes',
        'Used for signing and verifying documents',
        'Ensures document authenticity and integrity',
      ],
    },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              mb: { xs: 4, md: 6 },
              textAlign: 'center',
              background: 'linear-gradient(45deg, #008080 30%, #00695C 90%)',
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
              How It Works
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
              Understanding the cryptographic security behind our land record management system
            </Typography>
          </Paper>
        </motion.div>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Process Steps */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper 
                sx={{ 
                  p: { xs: 2, md: 4 },
                  mb: { xs: 3, md: 4 },
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: 'primary.main', 
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  Document Processing Flow
                </Typography>
                <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                  <Stepper 
                    orientation={isMobile ? 'vertical' : 'horizontal'} 
                    alternativeLabel={!isMobile}
                    sx={{ 
                      minWidth: isMobile ? 'auto' : '800px',
                      pb: isMobile ? 2 : 0
                    }}
                  >
                    {steps.map((step, index) => (
                      <Step key={index} active={true}>
                        <StepLabel
                          StepIconComponent={() => (
                            <Box
                              sx={{
                                backgroundColor: 'primary.main',
                                borderRadius: '50%',
                                width: { xs: 32, md: 40 },
                                height: { xs: 32, md: 40 },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                              }}
                            >
                              {step.icon}
                            </Box>
                          )}
                        >
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: { xs: '0.875rem', md: '1rem' },
                              fontWeight: 500
                            }}
                          >
                            {step.label}
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography 
                            variant="body1" 
                            paragraph
                            sx={{ 
                              fontSize: { xs: '0.875rem', md: '1rem' },
                              mt: 2
                            }}
                          >
                            {step.description}
                          </Typography>
                          <List dense>
                            {step.details.map((detail, idx) => (
                              <ListItem key={idx} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <CheckCircleIcon color="primary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={detail} 
                                  primaryTypographyProps={{
                                    fontSize: { xs: '0.875rem', md: '1rem' }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Security Features */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Paper 
                sx={{ 
                  p: { xs: 2, md: 4 },
                  height: '100%',
                  position: 'sticky',
                  top: { md: 24 }
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: 'primary.main', 
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  Security Features
                </Typography>
                <List sx={{ py: 0 }}>
                  {securityFeatures.map((feature, index) => (
                    <React.Fragment key={index}>
                      <ListItem 
                        alignItems="flex-start" 
                        sx={{ 
                          flexDirection: 'column',
                          py: 2
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box
                            sx={{
                              backgroundColor: 'primary.main',
                              borderRadius: '50%',
                              width: { xs: 32, md: 40 },
                              height: { xs: 32, md: 40 },
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              mr: 2,
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography 
                            variant="h6" 
                            component="div"
                            sx={{ 
                              fontSize: { xs: '1rem', md: '1.25rem' },
                              fontWeight: 600
                            }}
                          >
                            {feature.title}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          paragraph
                          sx={{ 
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            mt: 1
                          }}
                        >
                          {feature.description}
                        </Typography>
                        <List dense sx={{ width: '100%' }}>
                          {feature.details.map((detail, idx) => (
                            <ListItem key={idx} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckCircleIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={detail}
                                primaryTypographyProps={{
                                  fontSize: { xs: '0.875rem', md: '1rem' }
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </ListItem>
                      {index < securityFeatures.length - 1 && (
                        <Divider sx={{ my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Paper 
            sx={{ 
              p: { xs: 2, md: 4 }, 
              mt: { xs: 3, md: 4 }
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                color: 'primary.main', 
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Why Cryptography Matters
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ 
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        fontWeight: 600
                      }}
                    >
                      Document Integrity
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      }}
                    >
                      Cryptographic hashing ensures that land records cannot be altered without detection.
                      Any modification to the document would result in a different hash value,
                      immediately alerting the system to potential tampering.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ 
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        fontWeight: 600
                      }}
                    >
                      Identity Verification
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      }}
                    >
                      Digital signatures provide a secure way to verify the identity of document owners.
                      Using public key cryptography, we can ensure that only authorized individuals
                      can sign and modify land records.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HowItWorks; 