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

const steps = ['Upload Document', 'Verify Details', 'Sign and Submit'];

const CreateRecord = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      // Ask the user to sign the document hash
      const signer = new ethers.BrowserProvider(window.ethereum as any).getSigner();
      const signature = await (await signer).signMessage(ethers.getBytes(formData.documentHash));
      setFormData((prev) => ({ ...prev, ownerSignature: signature }));
    } catch (err) {
      setError('Error signing the document hash.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      // 1. Create the record on-chain
      const tx = await web3Service.createLandRecord(formData.documentHash, formData.ownerAddress);
      const receipt = tx;
      // 2. Get the recordId (assume it's the last one)
      const allRecords = await web3Service.getAllLandRecords();
      const recordId = allRecords.length - 1;
      // 3. Sign the record (store the signature)
      await web3Service.signRecord(recordId, formData.ownerSignature);
      navigate('/dashboard');
    } catch (err) {
      setError('Error creating record. Please try again.');
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