import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';
import HistoryIcon from '@mui/icons-material/History';
import web3Service from '../services/web3Service';
import { ethers } from 'ethers';

const ViewRecord = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [record, setRecord] = useState<any | null>(null);
  const [signature, setSignature] = useState<string>('');
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        setError(null);
        const rec = await web3Service.getLandRecord(Number(id));
        setRecord(rec);
        const sig = await web3Service.getSignature(Number(id));
        setSignature(sig);
      } catch (err) {
        setError('Error loading record. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      setError(null);
      const hash = ethers.keccak256(ethers.getBytes(record.documentHash));
      await web3Service.verifyRecord(Number(id), hash, signature);
      setRecord({ ...record, isVerified: true });
    } catch (err) {
      setError('Verification failed.');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!record) {
    return (
      <Container maxWidth="md">
        <Alert severity="warning" sx={{ mt: 4 }}>
          Record not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard')}
          sx={{ mb: 3 }}
        >
          Back to Dashboard
        </Button>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              Land Record #{record.id}
            </Typography>
            <Chip
              icon={<VerifiedIcon />}
              label={record.isVerified ? 'Verified' : 'Pending Verification'}
              color={record.isVerified ? 'success' : 'warning'}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ flex: 1 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Document Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Document Hash: {record.documentHash}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Owner Signature: {signature}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created: {record.timestamp}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Ownership Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Current Owner: {record.owner}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Metadata: {record.metadata}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Box>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HistoryIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Ownership History
                    </Typography>
                  </Box>
                  {record.previousOwners && record.previousOwners.map((owner: string, index: number) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Previous Owner {index + 1}: {owner}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleVerify}
              disabled={record.isVerified || verifying}
            >
              {verifying ? 'Verifying...' : 'Verify Record'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Implement transfer logic
                console.log('Transfer ownership');
              }}
            >
              Transfer Ownership
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ViewRecord; 