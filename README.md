# Land Records Management System

A blockchain-based land records management system that uses applied cryptography for secure document management and verification.

## Features

- Document hashing using SHA-3 (keccak256)
- Digital signatures for document authentication
- Smart contract-based record management
- Web3 integration for blockchain interactions
- Modern React frontend with Material-UI
- Express.js backend with MongoDB
- Applied cryptography for document security

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI, ethers.js
- **Backend**: Node.js, Express.js, TypeScript, MongoDB
- **Blockchain**: Ethereum, Solidity, Truffle, Ganache
- **Cryptography**: SHA-3, ECDSA, Public Key Infrastructure

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Ganache (for local blockchain)
- Frame (for blockchain wallet interactions)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd land-records-management
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:

Create `.env` files in both frontend and backend directories:

Backend (.env):
```
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/land-records
BLOCKCHAIN_RPC_URL=http://localhost:8545
CONTRACT_ADDRESS=<your-contract-address>
JWT_SECRET=<your-secret-key>
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_CONTRACT_ADDRESS=<your-contract-address>
REACT_APP_RPC_URL=http://localhost:8545
```

4. Start local blockchain (Ganache):
```bash
ganache --port 8545
```

5. Deploy smart contracts:
```bash
npx truffle migrate --reset
```

6. Start the application:

Terminal 1 (Backend):
```bash
cd backend
npm run start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

## Project Structure

```
land-records-management/
├── contracts/              # Smart contracts
│   └── LandRecord.sol     # Main contract
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API and Web3 services
│   │   └── config/       # Configuration files
├── backend/               # Express backend
│   ├── src/
│   │   └── server.ts     # Main server file
├── migrations/            # Truffle migrations
└── test/                 # Test files
```

## Smart Contract

The `LandRecord` contract implements:
- Document hash storage
- Digital signature verification
- Record management
- Ownership tracking
- Record invalidation

## API Endpoints

Backend API endpoints (http://localhost:3001):
- `GET /`: API information
- `POST /api/records`: Create new record
- `GET /api/records`: Get all records
- `GET /api/records/:id`: Get specific record
- `PUT /api/records/:id`: Update record
- `DELETE /api/records/:id`: Invalidate record

## Security Features

1. **Document Integrity**
   - SHA-3 hashing for document fingerprinting
   - Immutable storage on blockchain
   - Hash verification for document authenticity

2. **Authentication**
   - Digital signatures using ECDSA
   - Public key verification
   - Non-repudiation of documents

3. **Access Control**
   - Role-based access control
   - Smart contract ownership management
   - Record invalidation capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Mehar Kulkarni
R.V. College of Engineering, Bangalore

## Acknowledgments

- Ethereum Foundation
- OpenZeppelin
- Material-UI
- Truffle Suite

## Wallet Setup: Using Frame

This project uses [Frame](https://frame.sh/) as the Ethereum wallet provider. Frame is a desktop wallet that injects the `window.ethereum` API, similar to MetaMask, and works seamlessly with local blockchains like Ganache.

### Steps to Set Up Frame with Ganache

1. **Download and Install Frame:**
   - Visit [https://frame.sh/](https://frame.sh/) and download the Frame wallet for your operating system.
   - Install and launch Frame.

2. **Connect Frame to Ganache:**
   - In Frame, click the network dropdown and select **"Custom"** or **"Add Network"**.
   - Set the RPC URL to your local Ganache instance (default: `http://127.0.0.1:8545`).
   - Set the Chain ID to `1337` (Ganache default).
   - Save and switch to this network.

3. **Import Ganache Accounts into Frame:**
   - In Ganache, copy one of the private keys from the list of available accounts.
   - In Frame, go to **Accounts > Add Account > Import Private Key**.
   - Paste the private key and complete the import.

4. **Unlock the Account in Frame:**
   - Make sure the imported account is unlocked and selected as the active account in Frame.

5. **Start the App:**
   - Run the backend and frontend as described below.
   - When prompted to connect a wallet, Frame will handle the request.

> **Note:** You do not need MetaMask. Frame provides the same `window.ethereum` API and works with this app out of the box. 