'use client'
import Link from "next/link";
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip, // Using Chip for the clean status badge
    Grid,
    Divider
} from '@mui/material';
import { Add as AddIcon, Receipt as ReceiptIcon, CalendarToday as CalendarTodayIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import { useEffect, useState } from "react";

// --- Type Definition (Define this in your utils/types.ts) ---
interface InvoiceInterface {
    id: string;
    invoiceNumber: string;
    issueDate: string; // e.g., '2025-10-07'
    totalAmount: number;
    status: 'Paid' | 'Pending' | 'Draft';
    clientName: string; // Added for context/better UX
}

// --- Mock Data for demonstration ---
const mockInvoices: InvoiceInterface[] = [
    { id: '1', invoiceNumber: 'INV-00123', issueDate: '2025-10-01', totalAmount: 1250.50, status: 'Paid', clientName: 'Acme Corp' },
    { id: '2', invoiceNumber: 'INV-00124', issueDate: '2025-10-05', totalAmount: 890.00, status: 'Pending', clientName: 'Beta Solutions' },
    { id: '3', invoiceNumber: 'INV-00125', issueDate: '2025-10-06', totalAmount: 350.75, status: 'Draft', clientName: 'Gamma Industries' },
    { id: '4', invoiceNumber: 'INV-00126', issueDate: '2025-10-07', totalAmount: 2500.00, status: 'Pending', clientName: 'Delta Solutions' },
];

// --- Helper: Formats currency and date ---
const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// --- Helper Component for Status Badge ---
const getStatusColor = (status: InvoiceInterface['status']): 'success' | 'warning' | 'default' => {
    switch (status) {
        case 'Paid':
            return 'success';
        case 'Pending':
            return 'warning';
        case 'Draft':
        default:
            return 'default';
    }
};




const InvoiceListing = ({client_id} : {client_id:string}) => {


    const invoices = mockInvoices;

    return (
        <Box>
            <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                        <ReceiptIcon fontSize="large" color="primary" sx={{ mr: 1 }} />
                        Invoices
                    </Typography>
                    <Link href={`/add-invoice?client_id=${client_id}`} passHref style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            size="medium"
                        >
                            Add Invoice
                        </Button>
                    </Link>
                </Box>

                <Box >
                    <Paper elevation={3}>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'grey.100' }}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Invoice #</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Client</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Amount</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoices.map((invoice) => (
                                        <TableRow
                                            key={invoice.id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                '&:hover': { backgroundColor: 'action.hover', cursor: 'pointer' }
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link href={`/invoices/${invoice.id}`} passHref style={{ textDecoration: 'none' }}>
                                                    <Typography color="primary" sx={{ fontWeight: 500 }}>
                                                        {invoice.invoiceNumber}
                                                    </Typography>
                                                </Link>
                                            </TableCell>
                                            <TableCell>{invoice.clientName}</TableCell>
                                            <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                                                {formatCurrency(invoice.totalAmount)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={invoice.status}
                                                    color={getStatusColor(invoice.status)}
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

export default InvoiceListing;