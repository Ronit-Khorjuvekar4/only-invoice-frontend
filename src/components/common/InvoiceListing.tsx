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
    Chip,
    Grid,
    Divider,
    Tooltip,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Add as AddIcon, Receipt as ReceiptIcon, CalendarToday as CalendarTodayIcon, AttachMoney as AttachMoneyIcon, Edit } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { InvoiceListings } from '../../utils/types'
import { useRouter } from 'next/navigation'


const STATUS_COLORS: Record<string, string> = {
    Paid: '#4caf50',
    Pending: '#ffb300',
    Overdue: '#f44336',
    'Advanced Paid': '#2196f3',
};

const InvoiceListing = ({ clientId, allInvoices }: { clientId: string, allInvoices: InvoiceListings[] }) => {
    const router = useRouter()
    console.log(allInvoices)

    return (
        <>
            <Box >
                <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 2 }}>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>


                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                            Invoice List
                        </Typography>

                        <Link href={`/add-invoice?client_id=${clientId}`} passHref style={{ textDecoration: 'none' }}>
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

                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Invoice Number</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                                    <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Final Total</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Edit</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Delete</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {allInvoices.map((invoice) => (
                                    <TableRow
                                        key={invoice._id}
                                        hover
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell
                                            onClick={() => router.push(`/view-invoice/${invoice.clientId.orgName.replace(" ", "-")}?invoice_id=${invoice.invoice_id._id}`)}
                                        >
                                            {invoice.invoice_id.invoiceNumber}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 600,
                                                color: STATUS_COLORS[invoice.invoice_id.status] || 'text.primary',
                                            }}
                                        >{invoice.invoice_id.status}</TableCell>
                                        <TableCell>
                                            {new Date(invoice.invoice_id.dueDate).toLocaleDateString('en-GB')}
                                        </TableCell>
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
                                                            Sub Total:
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            ₹ {invoice.subTotal.toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            Discount:
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                            {invoice.discount}%
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            Advance Amount:
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                            ₹ {invoice.advanceAmount}
                                                        </Typography>
                                                        {invoice.invoice_id.status === "Advanced Paid" &&
                                                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                                Remaining Balance:
                                                            </Typography>
                                                        }


                                                        {invoice.invoice_id.status === "Advanced Paid" &&

                                                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                                ₹ {invoice.remainingBalance.toFixed(2)}
                                                            </Typography>

                                                        }

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
                                                    fontSize: '1.125rem',
                                                    color: 'primary.main',
                                                    '&:hover': {
                                                        color: 'primary.dark',
                                                    }
                                                }}>
                                                    ₹ {invoice.finalTotal.toFixed(2)}
                                                </Typography>
                                            </Tooltip>

                                        </TableCell>
                                        <TableCell >
                                            <IconButton aria-label="edit" >
                                                <EditIcon color="primary" fontSize="small" onClick={() => { router.push("/") }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>

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