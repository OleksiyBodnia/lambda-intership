import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

const Account: React.FC = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.get('http://142.93.134.108:1111/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.data.statusCode === 401) {
          const refreshResponse = await axios.post(
            'http://142.93.134.108:1111/refresh',
            null,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          localStorage.setItem('accessToken', refreshResponse.data.body.access_token);
          localStorage.setItem('refreshToken', refreshResponse.data.body.refresh_token);
          setMessage('Token is valid');
          return;
        }
        setMessage('Token is valid');
      } catch (error) {
        console.error('Fetch account error:', error);
        navigate('/sign-in');
      }
    };

    fetchAccount();
  }, []);

  const logout = () => {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    navigate('/sign-in');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Account
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button
          onClick={logout}
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Account;
