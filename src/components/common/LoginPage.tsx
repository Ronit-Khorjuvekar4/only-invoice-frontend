'use client';

import React, { useContext, useState } from 'react';
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
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import { AuthContext } from '@/context/AuthContext';

interface User {
    email: string;
    password: string
}

const LoginPage = () => {

    const { login } = useContext(AuthContext)

    const router = useRouter();
    const [formData, setFormData] = useState<User>({
        email: '',
        password: ''
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

        if (!formData.email || !formData.password) {
            setError('Please fill in both fields');
            return;
        }

        console.log(formData)


        try {
            const response = await axiosInstance.post('auth/login', formData);
            const { token } = response.data.data;
            setSuccess('Login successful! Redirecting...');

            login(token);

            



        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Box >
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5', p: 2 }}>

                <Paper sx={{ maxWidth: 400, width: '100%', p: 4, borderRadius: 3, boxShadow: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                        Login
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ py: 1.5, mt: 1 }}
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

export default LoginPage;
