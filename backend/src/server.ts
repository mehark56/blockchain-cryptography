import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ethers } from 'ethers';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/land-records';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Blockchain provider setup
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL || 'http://localhost:8545');
const contractAddress = process.env.CONTRACT_ADDRESS || '';
if (!contractAddress) {
  console.warn('CONTRACT_ADDRESS not set in environment variables');
}

// Load contract ABI (will be available after contract deployment)
let contract: ethers.Contract | null = null;
try {
  const contractABI = require('../artifacts/contracts/LandRecord.sol/LandRecord.json').abi;
  if (contractAddress) {
    contract = new ethers.Contract(contractAddress, contractABI, provider);
  }
} catch (error) {
  console.warn('Contract ABI not found. Make sure to deploy the contract first.');
}

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Land Records Management System API',
    author: 'Mehar Kulkarni',
    institution: 'R.V. College of Engineering, Bangalore',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 