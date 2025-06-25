import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Verified as VerifiedIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

// Mock data for charts
const chartData = {
  records: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Records Created',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
      },
    ],
  },
  verification: {
    labels: ['Verified', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  },
  activity: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Verifications',
        data: [5, 8, 12, 6, 9, 4, 7],
        backgroundColor: 'rgba(25, 118, 210, 0.8)',
      },
      {
        label: 'Transfers',
        data: [3, 5, 7, 4, 6, 2, 5],
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
      },
    ],
  },
};

// Mock records data
const mockRecords = [
  {
    id: 1,
    title: 'Land Record #1234',
    owner: '0x1234...5678',
    status: 'verified',
    date: '2024-03-15',
    location: 'Bangalore, Karnataka',
    area: '2.5 acres',
  },
  {
    id: 2,
    title: 'Land Record #1235',
    owner: '0x8765...4321',
    status: 'pending',
    date: '2024-03-14',
    location: 'Mysore, Karnataka',
    area: '1.8 acres',
  },
  {
    id: 3,
    title: 'Land Record #1236',
    owner: '0x2468...1357',
    status: 'rejected',
    date: '2024-03-13',
    location: 'Hubli, Karnataka',
    area: '3.2 acres',
  },
];

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.isAdmin || false;

  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSortClick = () => {
    setSortOpen(!sortOpen);
  };

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedRecord(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string): React.ReactElement => {
    switch (status.toLowerCase()) {
      case 'verified':
        return <CheckCircleIcon />;
      case 'pending':
        return <PendingIcon />;
      case 'rejected':
        return <CancelIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const handleStatusChange = (recordId: string, newStatus: 'verified' | 'pending' | 'rejected') => {
    // ... existing code ...
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(45deg, #008080 30%, #00695C 90%)',
                color: 'white',
              }}
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Welcome back, {user?.name || 'User'}!
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {isAdmin ? 'Administrator Dashboard' : 'User Dashboard'}
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/create-record')}
                sx={{
                  mt: { xs: 2, md: 0 },
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Create New Record
              </Button>
            </Paper>
          </motion.div>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Records
                </Typography>
                <Typography variant="h4" component="div">
                  1,234
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Verified Records
                </Typography>
                <Typography variant="h4" component="div">
                  890
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  color="success"
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Pending Verifications
                </Typography>
                <Typography variant="h4" component="div">
                  45
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={30}
                  color="warning"
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="h4" component="div">
                  28
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  color="info"
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Records Overview
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Line
                    data={chartData.records}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Verification Status
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Pie
                    data={chartData.verification}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Records List */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Typography variant="h6">Recent Records</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Search records..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ display: searchOpen ? 'block' : 'none' }}
                    />
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                    <IconButton onClick={handleFilterClick}>
                      <FilterIcon />
                    </IconButton>
                    <IconButton onClick={handleSortClick}>
                      <SortIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  {mockRecords.map((record) => (
                    <Grid item xs={12} md={6} lg={4} key={record.id}>
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
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              mb: 2,
                            }}
                          >
                            <Typography variant="h6" gutterBottom>
                              {record.title}
                            </Typography>
                            <Chip
                              icon={getStatusIcon(record.status) as React.ReactElement}
                              label={record.status}
                              color={getStatusColor(record.status)}
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                          >
                            Owner: {record.owner}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                          >
                            Location: {record.location}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                          >
                            Area: {record.area}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            Date: {record.date}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleViewRecord(record)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton size="small">
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Share">
                            <IconButton size="small">
                              <ShareIcon />
                            </IconButton>
                          </Tooltip>
                          {isAdmin && (
                            <>
                              <Tooltip title="Edit">
                                <IconButton size="small">
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" color="error">
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Record Details Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedRecord && (
          <>
            <DialogTitle>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">{selectedRecord.title}</Typography>
                <Chip
                  icon={getStatusIcon(selectedRecord.status) as React.ReactElement}
                  label={selectedRecord.status}
                  color={getStatusColor(selectedRecord.status)}
                  sx={{ ml: 1 }}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Owner Details
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Address: {selectedRecord.owner}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Location: {selectedRecord.location}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Area: {selectedRecord.area}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Record Details
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Created Date: {selectedRecord.date}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Last Modified: {selectedRecord.date}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Verification Status: {selectedRecord.status}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleCloseDialog}
              >
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Dashboard; 