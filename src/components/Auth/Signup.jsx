import React, { useState } from 'react';
import { useFormik } from 'formik';
import { signupSchema } from '../../utils/validation';
import { API } from '../../constants';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const { setIsAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const result = await axios.post(`${API}/auth/signup`,values,{ withCredentials:true });
        setIsAuthenticated(true)
        navigate('/');
      } catch (err) {
        console.log(err,"error happend in signpu")
        setError(err.response?.data?.message || 'Signup failed');
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" mb={3}>
          Sign Up
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;