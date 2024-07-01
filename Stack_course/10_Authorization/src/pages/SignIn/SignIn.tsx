import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post(`http://142.93.134.108:1111/login?email=${email}&password=${password}`);
        localStorage.setItem('accessToken', response.data.body.access_token);
        localStorage.setItem('refreshToken', response.data.body.refresh_token);
        navigate('/me');
      } catch (error) {
        setError("Try with other data or create new account")
      }
    };

    const redirectToSignUp = () => {
        navigate('/sign-up');
    }
  
    return (
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="text"
              color="primary"
              onClick={redirectToSignUp}
            >
              Click here if you don't have an account
            </Button>
          </Box>
        </Box>
        <p>{error}</p>
      </Container>
    );
};

export default SignIn;
