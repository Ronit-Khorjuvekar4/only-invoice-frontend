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
    Divider,
    Tooltip
} from '@mui/material';
import { Add as AddIcon, Receipt as ReceiptIcon, CalendarToday as CalendarTodayIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { InvoiceListings } from '../../utils/types'



const InvoiceListing = ({ allInvoices }: { allInvoices: InvoiceListings[] }) => {

    console.log(allInvoices)

    return (
        <>
            <Box >
                <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Invoice List
                    </Typography>

                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Invoice Number</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Final Total</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {allInvoices.map((invoice) => (
                                    <TableRow key={invoice._id} hover>
                                        <TableCell>{invoice.invoiceNumber.invoiceNumber}</TableCell>
                                        <TableCell>{invoice.invoiceNumber.status}</TableCell>
                                        <TableCell>{new Date(invoice.invoiceNumber.dueDate).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            <Tooltip
                                                title={
                                                    <Box sx={{
                                                        p: 2,
                                                        bgcolor: 'background.paper',
                                                        borderRadius: 1,
                                                        boxShadow: 2,
                                                        width: 250,
                                                        fontSize: '0.875rem', // Smaller font for better reading in tooltips
                                                    }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            Advance Amount:
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                            ₹ {invoice.advanceAmount}
                                                        </Typography>

                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            Discount:
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                            {invoice.discount}%
                                                        </Typography>

                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            Remaining Balance:
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                            ₹ {invoice.remainingBalance.toFixed(2)}
                                                        </Typography>

                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            Sub Total:
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            ₹ {invoice.subTotal.toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            Final Total:
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            ₹ {invoice.finalTotal.toFixed(2)}
                                                        </Typography>
                                                    </Box>
                                                }
                                                placement="top"
                                            >
                                                <Typography sx={{
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    fontSize: '1.125rem', // Larger font size for final total to make it prominent
                                                    color: 'primary.main',
                                                    '&:hover': {
                                                        color: 'primary.dark', // Change color on hover to indicate interactivity
                                                    }
                                                }}>
                                                    ₹ {invoice.finalTotal.toFixed(2)}
                                                </Typography>
                                            </Tooltip>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>

    );
}

export default InvoiceListing;