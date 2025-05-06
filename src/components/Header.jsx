import { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ children }) => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar 
          sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 0 },
          px: 2,
          py: { xs: 1, sm: 0.5 },
        }}>
        <Typography variant="h6" component="div">
          Loan Calculator
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {children}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Typography variant="body2">
            {mode === 'dark' ? 'Dark' : 'Light'}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
