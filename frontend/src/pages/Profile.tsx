import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth, User } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photo, setPhoto] = useState(user?.photo || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await updateProfile({
        name,
        email,
        photo,
      });
      // Show success message or redirect
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile Settings
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Avatar
                  src={photo}
                  alt={name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Wallet Address"
                  value={user.address}
                  disabled
                  sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Role"
                  value={user.role}
                  disabled
                  sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Profile Photo URL"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  helperText="Enter a URL for your profile photo"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                  >
                    Logout
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Profile; 