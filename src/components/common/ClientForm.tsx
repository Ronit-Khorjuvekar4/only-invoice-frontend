'use client'
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axiosInstance from '../../utils/axiosInstance'

const ClientForm = () => {
    const [formData, setFormData] = useState({
        orgName: '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress1: '',
        clientAddress2: '',
    });

    // Handle form data change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axiosInstance.post('clients', formData);
            if(response.data.msg === "Client Added"){
                console.log(response.data.msg)
            }
        } catch (err: any) {
            if (err.response) {
                console.error('Error Response:', err.response.data);
                console.error('Error Status:', err.response.status); 
            } else if (err.request) {
                console.error('Error Request:', err.request);
            } else {
                console.error('General Error:', err.message);
            }
        }
    };


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Add New Client
            </Typography>

            <TextField
                label="Organization Name"
                name="orgName"
                value={formData.orgName}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            />

            <TextField
                label="Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{ mb: 2 }}
            />

            <TextField
                label="Client Email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                fullWidth
                required
                type="email"
                sx={{ mb: 2 }}
            />

            <TextField
                label="Client Phone"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleInputChange}
                fullWidth
                required
                type="tel"
                sx={{ mb: 2 }}
            />

            <TextField
                label="Flat / House No / Locality"
                name="clientAddress"
                value={formData.clientAddress1}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
                multiline
                maxRows={4}

            />

            <TextField
                label="Area / Sector / Locality"
                name="clientAddress2"
                value={formData.clientAddress2}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
                multiline
                maxRows={4}

            />


            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </Box>
    );
};

export default ClientForm;
