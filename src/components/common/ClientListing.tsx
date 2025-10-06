'use client'
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Link from "next/link";
import { Container, Typography, Button, Box, Paper, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ClientInterface } from "@/utils/types";
import { Add as AddIcon, Phone as PhoneIcon, Email as EmailIcon, Business as BusinessIcon } from '@mui/icons-material';

const ClientListing = ({ clients }: { clients: ClientInterface[] }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null; 
    }
    
    return (
        <Container maxWidth="lg" sx={{ pt: 3, pb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                    Client List
                </Typography>
                <Link href="/add-client" passHref style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<AddIcon />}
                        size="medium" 
                    >
                        New Client
                    </Button>
                </Link>
            </Box>
            <Box>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Organization</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clients.map((client) => (
                                    <TableRow 
                                        key={client._id.toString()} 
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: 'action.hover' } }}
                                    >
                                        <TableCell component="th" scope="row">{client.clientName}</TableCell>
                                        <TableCell>{client.orgName}</TableCell>
                                        <TableCell>{client.clientEmail}</TableCell>
                                        <TableCell>{client.clientPhone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Container>
    );
}

export default ClientListing;