import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Lock,
  Key,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import web3Service from '../services/web3Service';
import { ethers } from 'ethers';

const Login: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<'account' | 'privateKey'>('account');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const accountsList = await provider.listAccounts();
        setAccounts(accountsList.map(account => account.toString()));
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setError('Failed to fetch accounts. Please make sure MetaMask is installed and connected.');
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountSelect = async (account: string) => {
    setSelectedAccount(account);
    setError(null);
    try {
      setLoading(true);
      // In a real application, you would need to get the private key for the selected account
      // This is just a placeholder - you should implement proper account access
      await login(account);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to login with selected account');
    } finally {
      setLoading(false);
    }
  };

  const handlePrivateKeyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateKey) {
      setError('Please enter your private key');
      return;
    }

    setError(null);
    try {
      setLoading(true);
      await login(privateKey);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid private key');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(45deg, #1B365D 30%, #2C4B7A 90%)',
            color: 'white',
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Welcome to Land Registry
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ opacity: 0.9, mb: 4 }}
          >
            Secure, Transparent, and Immutable Land Record Management
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <AccountCircle sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2">
                      Login with Account
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Select one of your available accounts to login. Make sure you have MetaMask installed and connected.
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {accounts.map((account) => (
                      <Card
                        key={account}
                        sx={{
                          mb: 2,
                          cursor: 'pointer',
                          border: selectedAccount === account ? 2 : 1,
                          borderColor: selectedAccount === account ? 'primary.main' : 'divider',
                          '&:hover': {
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleAccountSelect(account)}
                          disabled={loading}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  bgcolor: 'primary.main',
                                  mr: 2,
                                }}
                              >
                                {account.slice(2, 4)}
                              </Avatar>
                              <Typography variant="body1">
                                {account.slice(0, 6)}...{account.slice(-4)}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Key sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2">
                      Login with Private Key
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Enter your private key to login. Make sure you're in a secure environment and never share your private key.
                  </Typography>
                  <form onSubmit={handlePrivateKeyLogin}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Private Key"
                      type={showPrivateKey ? 'text' : 'password'}
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                      disabled={loading}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPrivateKey(!showPrivateKey)}
                              edge="end"
                            >
                              {showPrivateKey ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={loading}
                      endIcon={loading ? <CircularProgress size={20} /> : <ArrowForward />}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                severity="error"
                sx={{ mt: 3 }}
                action={
                  <Button color="inherit" size="small" onClick={() => setError(null)}>
                    Dismiss
                  </Button>
                }
              >
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Tooltip title="Contact your administrator to get access">
              <Button
                color="primary"
                onClick={() => window.open('mailto:meharkulkarni.cy22@rvce.edu.in', '_blank')}
              >
                Request Access
              </Button>
            </Tooltip>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Login; 