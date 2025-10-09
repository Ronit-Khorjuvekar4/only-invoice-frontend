'use client';
import React, { useState, useCallback, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Paper,
    IconButton,
    Grid,
    Divider,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';


const MOCK_SERVICES = [
    { id: 'seo', name: 'SEO Optimization' },
    { id: 'ppc', name: 'PPC Campaign Management' },
    { id: 'content', name: 'Content Strategy' },
    { id: 'social', name: 'Social Media Management' },
];

interface LineItem {
    id: string;
    serviceId: string;
    amount: number | string;
    details: string;
}

interface InvoiceFormData {
    startDate: string;
    dueDate: string;
    status: 'Paid' | 'Pending' | 'Partially Paid' | string;
    finalTotal: number | string;
    subTotal: number | string;
    discount: number;
    advanceAmount: number | string;
    balanceAmount: number | string;
    items: LineItem[];
}

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
    finalTotal: 0,
    subTotal: 0,
    discount: 0,
    advanceAmount: 0,
    balanceAmount: 0,
    items: [{ ...initialLineItem, id: Date.now().toString() }],
};


const AddInvoiceForm = ({ client_id }: { client_id: string }) => {
    const [formData, setFormData] = useState<InvoiceFormData>(initialFormData);

    const numericTotal = Number(formData.finalTotal) || 0;
    const numericPartial = Number(formData.advanceAmount) || 0;

    const remainingAmount = useMemo(() => {

        if (numericPartial > 0) {
            const remain = Math.max(0, numericTotal - numericPartial);

            setFormData(prev => ({
                ...prev,
                balanceAmount: remain
            }))
        }


    }, [numericTotal, numericPartial]);


    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleStatusChange = useMemo(() => {

            setFormData(prev => ({
                ...prev,
                advanceAmount: 0,
                balanceAmount:0
            }))

    }, [formData.status])

    const handlePartialChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const finalTotal = Number(formData.finalTotal) || 0;

        let validatedValue = value;

        if (value > finalTotal) {
            validatedValue = finalTotal;
        } else if (value < 0) {
            validatedValue = 0;
        }

        setFormData(prev => ({ ...prev, advanceAmount: validatedValue }));
    }, [formData.finalTotal]);


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

    const subtotal = useMemo(() => {
        const ok = formData.items.reduce((sum, item) => {
            const itemAmount = Number(item.amount) || 0;
            return sum + itemAmount;
        }, 0);

        let discount = (formData.discount as any / 100) * ok

        const finalTotal = Number(ok) - Number(Math.round(discount).toFixed(2))


        setFormData(prev => ({
            ...prev,
            finalTotal: finalTotal,
            subTotal: ok
        }))

        return ok

    }, [formData.items, formData.discount]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.advanceAmount > formData.finalTotal) {
            alert("check partial amount and finalTotal amount")
            return 0
        }

        console.log('Final Invoice Data:', formData);

    };


    return (
        <Box>
            <Paper>
                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'lg', mx: 'auto', p: 2 }}>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Create New Invoice
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                        Invoice Details
                    </Typography>
                    <Grid container spacing={3}>

                        {/* Start Date */}
                        <Grid >
                            <TextField
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid >
                            <TextField
                                label="Due Date"
                                name="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid >
                            <TextField
                                label="Status"
                                name="status"
                                select
                                value={formData.status}
                                onChange={handleChange}
                                fullWidth
                                required
                            >
                                {['Paid', 'Pending', 'Partially Paid'].map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
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
                        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }} key={item.id}>
                            <Grid >
                                <TextField
                                    label={`Service ${index + 1}`}
                                    name="serviceId"
                                    select
                                    value={item.serviceId}
                                    onChange={(e) => handleItemChange(item.id, 'serviceId', e.target.value)}
                                    fullWidth
                                    required
                                >
                                    {MOCK_SERVICES.map((service) => (
                                        <MenuItem key={service.id} value={service.id}>
                                            {service.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid >
                                <TextField
                                    label="Amount"
                                    name="amount"
                                    fullWidth
                                    value={item.amount === 0 ? "" : item.amount}
                                    onChange={(e) => handleItemChange(item.id, 'amount', Number(e.target.value))}
                                    InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                                    required
                                />
                            </Grid>
                            <Grid >
                                <TextField
                                    label="Details"
                                    name="details"
                                    fullWidth
                                    value={item.details}
                                    multiline
                                    rows={2}
                                    onChange={(e) => handleItemChange(item.id, 'details', e.target.value)}
                                />
                            </Grid>
                            <Grid sx={{ textAlign: 'right' }}>
                                {formData.items.length > 1 && (
                                    <IconButton color="error" onClick={() => removeItem(item.id)} aria-label="remove item">
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Grid>
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


                    <Grid container spacing={3} justifyContent="flex-end">

                        <Grid >
                            <TextField
                                label="Sub Total"
                                name="Sub Total"
                                value={subtotal}
                                fullWidth
                                required
                                InputProps={{ startAdornment: <Typography sx={{ mr: 1, fontWeight: 'bold' }}>₹</Typography> }}
                                sx={{ fontWeight: 'bold', backgroundColor: '#e8f5e9' }}
                            />
                        </Grid>

                        {formData.status === 'Partially Paid' && (
                            <Grid >
                                <TextField
                                    label="Advance Paid"
                                    name="advanceAmount"
                                    type="number"
                                    fullWidth
                                    value={formData.advanceAmount === 0 ? "" : formData.advanceAmount}
                                    onChange={handlePartialChange}
                                    error={numericPartial > numericTotal}
                                    helperText={numericPartial > numericTotal ? "Amount greater than Final Price. Do not save!!!!" : ""}
                                    required
                                    InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                                />
                            </Grid>
                        )}

                        <Grid >
                            <TextField
                                label="Discount (%)"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        {formData.status === 'Partially Paid' && (

                            <Grid >

                                <TextField
                                    label="Remaining Balance"
                                    name="remaining"
                                    value={formData.balanceAmount}
                                    fullWidth
                                    required
                                    InputProps={{ startAdornment: <Typography sx={{ mr: 1, fontWeight: 'bold' }}>₹</Typography> }}
                                    sx={{ fontWeight: 'bold', backgroundColor: '#e8f5e9' }}
                                />
                            </Grid>
                        )}

                        <Grid >
                            <TextField
                                label="Final Price"
                                name="discounted"
                                value={formData.finalTotal === 0 ? "" : formData.finalTotal}
                                fullWidth
                                required
                                InputProps={{ startAdornment: <Typography sx={{ mr: 1, fontWeight: 'bold' }}>₹</Typography> }}
                                sx={{ fontWeight: 'bold', backgroundColor: '#e8f5e9' }}

                            />
                        </Grid>


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