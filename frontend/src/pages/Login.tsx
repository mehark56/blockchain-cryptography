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
import { GANACHE_MNEMONIC } from '../config/ganacheMnemonic';

const deriveGanachePrivateKeys = (mnemonic: string, numAccounts = 10): string[] => {
  const keys: string[] = [];
  for (let i = 0; i < numAccounts; i++) {
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, `m/44'/60'/0'/0/${i}`);
    keys.push(wallet.privateKey);
  }
  return keys;
};

const Login: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handlePrivateKeyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateKey) {
      setError('Please enter your private key');
      return;
    }
    const validKeys = deriveGanachePrivateKeys(GANACHE_MNEMONIC);
    console.log('Derived Ganache keys:', validKeys);
    console.log('Entered private key:', privateKey);
    if (!validKeys.includes(privateKey)) {
      setError('This private key is not recognized. Please use a Ganache account private key.');
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
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
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
            endIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>
        )}
      </Paper>
    </Container>
  );
};

export default Login; 