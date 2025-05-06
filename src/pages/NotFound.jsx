import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Paper } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Paper sx={{
      p: { xs: 2, sm: 4 },
      mt: { xs: 4, sm: 8 },
      mx: 'auto',
      maxWidth: 600,
      textAlign: 'center',
    }}>
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you're looking for doesn't exist.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Box>
    </Paper>
  );
};

export default NotFound;
