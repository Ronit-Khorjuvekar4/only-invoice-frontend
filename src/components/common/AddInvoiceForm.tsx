'use client'
import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Grid,
    TextField,
    Typography,
    MenuItem,
    Button,
    Divider,
    Paper,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import axiosInstance from '@/utils/axiosInstance';
import { LineItem, InvoiceFormData } from '@/utils/types';
import {hyphenatedDate} from '@/utils/utils'

const MOCK_SERVICES = [
    { id: 'seo', name: 'SEO Optimization' },
    { id: 'ppc', name: 'PPC Campaign Management' },
    { id: 'content', name: 'Content Strategy' },
    { id: 'social', name: 'Social Media Management' },
];

const initialLineItem: LineItem = {
    id: '',
    serviceId: '',
    amount: 0,
    details: '',
};

const initialFormData: InvoiceFormData = {
    startDate: '',
    dueDate: '',
    status: 'Pending',
    discount: 0,
    advanceAmount: 0,
    items: [{ ...initialLineItem, id: Date.now().toString() }],
    isEdit:false
};

const AddInvoiceForm = ({ client_id, invoice_id }: { client_id: string, invoice_id: string }) => {
    const [formData, setFormData] = useState<InvoiceFormData>(initialFormData);

    useEffect(() => {
        if (invoice_id) {
            axiosInstance.get(`/single-invoice`, {
                params: {
                    invoiceId: invoice_id
                }
            })
                .then(res => {
                    const f = res.data.data

                    setFormData(prev => ({
                        ...prev,
                        startDate: hyphenatedDate(f.invoice_id.startDate),
                        dueDate: hyphenatedDate(f.invoice_id.dueDate),
                        status: f.invoice_id.status,
                        discount: f.discount,
                        advanceAmount: f.advanceAmount,
                        items:f.items,
                        isEdit:true
                    }))

                })
                .catch(err => console.error(err));
        }
    }, [invoice_id]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };


    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { ...initialLineItem, id: Date.now().toString() }],
        }));
    };

    const removeItem = (id: string) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id),
        }));
    };

    const handleAdvanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const total = finalTotal;
        const validatedValue = Math.max(0, Math.min(value, total));
        setFormData(prev => ({ ...prev, advanceAmount: validatedValue }));
    };

    const subTotal = formData.items.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
    );

    const discountAmount = (subTotal * (Number(formData.discount) || 0)) / 100;

    const finalTotal = subTotal - discountAmount;

    const remainingBalance =
        formData.status === 'Advanced Paid'
            ? Math.max(0, finalTotal - (Number(formData.advanceAmount) || 0))
            : 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Number(formData.advanceAmount) > finalTotal) {
            alert('Advance amount cannot exceed final total');
            return;
        }


        let ok = {
            ...formData,
            subTotal,
            finalTotal,
            remainingBalance,
        }

        console.log(ok.isEdit)

        try {

            let route
            let params = {}
            let requ 

            if(ok.isEdit){
                route = "/edit-invoice"
                params = {
                    clientId : client_id,
                    invoiceId : invoice_id
                }
                requ = axiosInstance.put
            }else{

                route = "/create-invoice"
                params = {
                    clientId : client_id,
                    invoiceId : invoice_id
                }
                requ = axiosInstance.post


            }
            const response = await requ(
                route,
                ok,
                {
                    params
                }
            );

            console.log(response);

        } catch (err) {
            console.error(err)
        }


    };

    return (
        <Box >
            <Paper sx={{ p: { xs: 2, md: 4 }, maxWidth: 'lg', mx: 'auto', }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Create New Invoice
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Invoice Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid sx={{ flex: 1 }}>
                            <TextField
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid sx={{ flex: 1 }}>
                            <TextField
                                label="Due Date"
                                name="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid sx={{ flex: 1 }}>
                            <TextField
                                label="Status"
                                name="status"
                                select
                                value={formData.status}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            >
                                {['Paid', 'Pending', 'Advanced Paid', 'Overdue'].map(s => (
                                    <MenuItem key={s} value={s}>
                                        {s}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Line Items
                    </Typography>

                    {formData.items.map((item, index) => (
                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            sx={{ mb: 2, gap: 2 }}
                            key={item.id}
                        >
                            <TextField
                                label={`Service ${index + 1}`}
                                select
                                value={item.serviceId}
                                onChange={(e) => handleItemChange(item.id, 'serviceId', e.target.value)}
                                fullWidth
                                required
                                sx={{ flex: 2 }}
                            >
                                {MOCK_SERVICES.map(service => (
                                    <MenuItem key={service.id} value={service.id}>
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Amount"
                                type="number"
                                value={item.amount === 0 ? '' : item.amount}
                                onChange={(e) => handleItemChange(item.id, 'amount', Number(e.target.value))}
                                InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                                required
                                sx={{ flex: 1 }}
                            />

                            <TextField
                                label="Details"
                                value={item.details}
                                onChange={(e) => handleItemChange(item.id, 'details', e.target.value)}
                                multiline
                                rows={2}
                                fullWidth
                                sx={{ flex: 3 }}
                            />

                            {formData.items.length > 1 && (
                                <IconButton color="error" onClick={() => removeItem(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Grid>
                    ))}

                    <Button
                        startIcon={<AddIcon />}
                        onClick={addItem}
                        variant="outlined"
                        sx={{ mb: 4 }}
                    >
                        Add Item
                    </Button>

                    <Divider sx={{ my: 4 }} />

                    <Grid container spacing={2} sx={{ gap: 2, justifyContent: 'flex-end' }}>
                        <TextField
                            label="Sub Total"
                            value={subTotal}
                            fullWidth
                            InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                            sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f8' }}
                            disabled
                        />

                        {formData.status === 'Advanced Paid' && (
                            <TextField
                                label="Advance Paid"
                                type="number"
                                value={formData.advanceAmount === 0 ? '' : formData.advanceAmount}
                                onChange={handleAdvanceChange}
                                error={Number(formData.advanceAmount) > finalTotal}
                                helperText={
                                    Number(formData.advanceAmount) > finalTotal
                                        ? 'Cannot exceed final total'
                                        : ''
                                }
                                fullWidth
                                InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                            />
                        )}

                        <TextField
                            label="Discount (%)"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            fullWidth
                        />

                        {formData.status === 'Advanced Paid' && (
                            <TextField
                                label="Remaining Balance"
                                value={remainingBalance.toFixed(2)}
                                fullWidth
                                InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                                sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f8' }}
                                disabled
                            />
                        )}

                        <TextField
                            label="Final Price"
                            value={finalTotal.toFixed(2)}
                            fullWidth
                            InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                            sx={{ fontWeight: 'bold', backgroundColor: '#f0f4f8' }}
                            disabled
                        />
                    </Grid>

                    <Box sx={{ mt: 5, pt: 2, borderTop: '1px solid #eee' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            fullWidth
                            sx={{ py: 1 }}
                        >
                            Save Invoice
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddInvoiceForm;
