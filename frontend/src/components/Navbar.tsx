import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  AccountCircle,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { FaLandmark } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Create Record', path: '/create-record' },
  ];

  const buttonStyle = {
    color: theme.palette.primary.main,
    mx: 1,
    '&:hover': {
      backgroundColor: 'rgba(0, 128, 128, 0.04)',
    },
    '&.active': {
      backgroundColor: 'rgba(0, 128, 128, 0.08)',
      color: 'primary.main',
    },
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            selected={isActive(item.path)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <Button
              variant="text"
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: 'rgba(27, 54, 93, 0.04)',
                },
              }}
            >
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                {React.createElement(FaLandmark, {
                  size: 28,
                  color: theme.palette.primary.main,
                  style: { marginRight: '8px' }
                })}
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: theme.palette.primary.main,
                  }}
                >
                  Land Registry
                </Typography>
              </Box>
            </Button>
          </Box>

          {isAuthenticated ? (
            <>
              {isMobile ? (
                <>
                  <IconButton
                    edge="end"
                    color="primary"
                    aria-label="menu"
                    onClick={handleMobileMenu}
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={mobileMenuAnchorEl}
                    open={Boolean(mobileMenuAnchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    {navItems.map((item) => (
                      <MenuItem
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          handleClose();
                        }}
                        selected={isActive(item.path)}
                        sx={{
                          color: theme.palette.primary.main,
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 128, 128, 0.08)',
                          },
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleProfile} sx={{ color: theme.palette.primary.main }}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {navItems.map((item) => (
                      <Button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        sx={{
                          ...buttonStyle,
                          ...(isActive(item.path) && { className: 'active' }),
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                    <IconButton
                      onClick={handleMenu}
                      sx={{
                        ml: 2,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 128, 128, 0.04)',
                        },
                      }}
                    >
                      {user?.profilePhoto ? (
                        <Avatar
                          src={user.profilePhoto}
                          alt={user.name}
                          sx={{ width: 32, height: 32 }}
                        />
                      ) : (
                        <AccountCircle />
                      )}
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      PaperProps={{
                        sx: {
                          mt: 1.5,
                          borderRadius: 2,
                          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <MenuItem onClick={handleProfile} sx={{ color: theme.palette.primary.main }}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              )}
            </>
          ) : (
            <>
              <Button
                variant="text"
                onClick={() => navigate('/how-it-works')}
                sx={{
                  ...buttonStyle,
                  ...(isActive('/how-it-works') && { className: 'active' }),
                }}
              >
                How It Works
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{
                  ml: 2,
                  px: 3,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 