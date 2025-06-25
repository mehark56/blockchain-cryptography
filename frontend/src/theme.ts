import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008080', // Teal
      light: '#4DB6AC',
      dark: '#00695C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF9800', // Orange
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#263238',
      secondary: '#546E7A',
    },
    error: {
      // Deep red for errors
      main: '#C53030',
    },
    warning: {
      // Amber for warnings
      main: '#C05621',
    },
    success: {
      // Forest green for success
      main: '#2E5A27',
    },
    info: {
      // Navy blue for info
      main: '#1B365D',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700, // Increased font weight
      color: '#0A1F3D', // Darker shade for better contrast
      letterSpacing: '-0.02em', // Slightly tighter letter spacing
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700, // Increased font weight
      color: '#0A1F3D', // Darker shade for better contrast
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#0A1F3D', // Darker shade for better contrast
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600, // Increased font weight
      color: '#0A1F3D', // Darker shade for better contrast
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600, // Increased font weight
      color: '#0A1F3D', // Darker shade for better contrast
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600, // Increased font weight
      color: '#0A1F3D', // Darker shade for better contrast
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500, // Increased font weight
      color: '#2D3748', // Darker secondary text
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      color: '#1A2027', // Darker primary text
      lineHeight: 1.6, // Improved line height for readability
    },
    button: {
      textTransform: 'none',
      fontWeight: 600, // Increased font weight
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 4, // Reduced border radius for more formal look
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #008080 30%, #00695C 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00695C 30%, #004D40 90%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #FF9800 30%, #F57C00 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #F57C00 30%, #EF6C00 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
          '& .MuiInputLabel-root': {
            color: '#2D3748', // Darker label color
          },
          '& .MuiOutlinedInput-input': {
            color: '#1A2027', // Darker input text
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#008080',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
        },
        label: {
          color: '#1A2027', // Darker text for better contrast
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-colorTextSecondary': {
            color: '#2D3748', // Darker secondary text
          },
        },
      },
    },
  },
});

export default theme; 