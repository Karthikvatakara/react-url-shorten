import React, { useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/validation';
import axios from 'axios';
import { API } from '../../constants';


import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { setIsAuthenticated } = useAuth()
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const result = await axios.post(`${API}/auth/login`, values, { withCredentials: true});

        console.log(result,"adfanfalk");
        setIsAuthenticated(true);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" mb={3}>
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
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
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;