import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="h6" color="textSecondary">
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;