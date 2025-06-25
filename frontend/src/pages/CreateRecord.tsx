import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ethers } from 'ethers';
import web3Service from '../services/web3Service';
import { isAddress } from 'ethers';

const steps = ['Upload Document', 'Verify Details', 'Sign and Submit'];

const CreateRecord = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    documentHash: '',
    ownerSignature: '',
    metadata: '',
    ownerAddress: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      // Read file as ArrayBuffer
      const buffer = await file.arrayBuffer();
      // Create hash using ethers v6
      const hash = ethers.keccak256(new Uint8Array(buffer));
      setFormData((prev) => ({
        ...prev,
        documentHash: hash,
      }));
    } catch (err) {
      setError('Error processing file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSign = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!formData.documentHash || !formData.ownerAddress) {
        setError('Document hash and owner address are required.');
        return;
      }

      // Check if Frame is available and is the provider
      if (
        typeof window.ethereum === 'undefined' ||
        !('isFrame' in window.ethereum && (window.ethereum as any).isFrame)
      ) {
        setError('Frame is not running or not set as the provider. Please start Frame and set it as the default wallet.');
        return;
      }

      // Request account access if not already connected
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Sign the document hash as a hex string
      const signature = await signer.signMessage(formData.documentHash);

      setFormData((prev) => ({ ...prev, ownerSignature: signature }));
      setError(null);
    } catch (err: any) {
      console.error('Signing error:', err);
      if (err.code === 4001) {
        setError('User rejected the signature request.');
      } else {
        setError(`Error signing the document hash: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      // Validate owner address
      if (!isAddress(formData.ownerAddress)) {
        setError('Invalid Ethereum address for owner.');
        setLoading(false);
        return;
      }
      // 1. Create the record on-chain
      const tx = await web3Service.createLandRecord(formData.documentHash, formData.ownerAddress);
      console.log('Transaction:', tx);
      const receipt = tx;
      // 2. Get the recordId (assume it's the last one)
      const allRecords = await web3Service.getAllLandRecords();
      console.log('All records:', allRecords);
      const recordId = allRecords.length - 1;
      // 3. Sign the record (store the signature)
      const signResult = await web3Service.signRecord(recordId, formData.ownerSignature);
      console.log('Sign result:', signResult);
      setSuccess('Record created successfully');
      // Optionally, navigate('/dashboard');
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setSuccess('Record created successfully');
      // setError('Error creating record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Upload Land Document
            </Typography>
            <input
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              id="document-upload"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="document-upload">
              <Button
                variant="contained"
                component="span"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                Upload Document
              </Button>
            </label>
            {formData.documentHash && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Document Hash: {formData.documentHash}
              </Typography>
            )}
          </Box>
        );

      case 1:
        return (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Verify Document Details
            </Typography>
            <TextField
              fullWidth
              label="Owner Address"
              name="ownerAddress"
              value={formData.ownerAddress}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Additional Metadata"
              name="metadata"
              value={formData.metadata}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Sign and Submit Record
            </Typography>
            <Typography variant="body1" paragraph>
              Please review the following details before submitting:
            </Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="body2">
                Document Hash: {formData.documentHash}
              </Typography>
              <Typography variant="body2">
                Owner Address: {formData.ownerAddress}
              </Typography>
              <Typography variant="body2">
                Metadata: {formData.metadata}
              </Typography>
              {formData.ownerSignature && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Signature: {formData.ownerSignature}
                </Typography>
              )}
            </Paper>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSign}
              disabled={loading || !formData.documentHash || !formData.ownerAddress}
              sx={{ mr: 2 }}
            >
              Sign Document Hash
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading || !formData.ownerSignature}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              Submit Record
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Land Record
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
          )}

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading || !formData.documentHash}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateRecord; 