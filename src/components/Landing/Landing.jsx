import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../constants';
import { useAuth } from '../../context/AuthContext';

const Landing = () => {
  const { setIsAuthenticated } = useAuth();
  const [url, setUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [urlError, setUrlError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API}/url/user-urls`, {
        withCredentials: true
      });
      console.log(response,"response fetchurl")
      setShortenedUrls(response.data?.urls);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to fetch URLs');
      }
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUrlError('');
    setError('');
    if (!url.trim()) {
      setUrlError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    try {
        console.log(url,"it is the urljjjjjj")
      const response = await axios.post(
        `${API}/url/shorten`, 
        { originalUrl: url },
        { withCredentials: true }
      );

      setShortenedUrls(prev => [response.data, ...prev]);
      setUrl('');
      setSuccess('URL shortened successfully!');
      
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Error shortening URL. Please try again.');
      }
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setUrlError('');
    setError('');
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      setError('Error logging out');
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setSuccess('URL copied to clipboard!');
  };

  const handleCloseAlert = () => {
    setError('');
    setSuccess('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" mb={3}>
          URL Shortener
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter URL"
            value={url}
            onChange={handleUrlChange}
            margin="normal"
            placeholder="https://example.com"
            error={!!urlError}
            helperText={urlError}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Shorten URL
          </Button>
        </form>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" mb={2}>
            Your Shortened URLs
          </Typography>
          <List>
            {shortenedUrls.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton 
                    onClick={() => copyToClipboard(item.shortUrl)}
                    color="primary"
                    title="Copy to clipboard"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                }
                sx={{
                  backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                  borderRadius: 1,
                  mb: 1
                }}
              >
                <ListItemText
                  primary={item.shortUrl}
                  secondary={item.originalUrl}
                  primaryTypographyProps={{
                    style: { fontWeight: 'bold' }
                  }}
                />
              </ListItem>
            ))}
            {shortenedUrls.length === 0 && (
              <Typography color="text.secondary" align="center">
                No shortened URLs yet
              </Typography>
            )}
          </List>
        </Box>
      </Paper>

      <Snackbar 
        open={!!error || !!success} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={error ? "error" : "success"} 
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Landing;








