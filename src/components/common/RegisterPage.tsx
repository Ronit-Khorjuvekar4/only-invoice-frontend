'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Grid,
    Typography,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';


const RegisterPage = () => {

    const {user} = useContext(AuthContext)
    const router = useRouter();


  useEffect(() => {
    if (user) {
      router.replace('/all-clients');
    }
  }, [user]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axiosInstance.post('auth/register', formData);
            console.log(response)
            setSuccess('Registered successfully! Please login.');
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            setTimeout(() => {
                router.push('/auth/login');
            }, 1000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Box >
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5', p: 2 }}>

                <Paper sx={{ maxWidth: 450, width: '100%', p: 4, borderRadius: 3, boxShadow: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                        Register
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid >
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid >
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid >
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid >
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ py: 1.5, mt: 1 }}
                                >
                                    Register
                                </Button>
                            </Grid>
                            <Grid >
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ py: 1.5, mt: 1 }}
                                    onClick={() => router.push("/auth/login")}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>

        </Box>
    );
};

export default RegisterPage;
