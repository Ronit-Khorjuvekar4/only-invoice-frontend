'use client';
// import React, { useState, useCallback, useMemo } from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     MenuItem,
//     Paper,
//     IconButton,
//     Grid,
//     Divider,
// } from '@mui/material';
// import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';


// const MOCK_SERVICES = [
//     { id: 'seo', name: 'SEO Optimization' },
//     { id: 'ppc', name: 'PPC Campaign Management' },
//     { id: 'content', name: 'Content Strategy' },
//     { id: 'social', name: 'Social Media Management' },
// ];

// interface LineItem {
//     id: string;
//     serviceId: string;
//     amount: number | string;
//     details: string;
// }

// interface InvoiceFormData {
//     startDate: string;
//     dueDate: string;
//     status: 'Paid' | 'Pending' | 'Partially Paid' | string;
//     finalTotal: number | string;
//     subTotal: number | string;
//     discount: number;
//     advanceAmount: number | string;
//     balanceAmount: number | string;
//     items: LineItem[];
// }

// const initialLineItem: LineItem = {
//     id: '',
//     serviceId: '',
//     amount: 0,
//     details: '',
// };

// const initialFormData: InvoiceFormData = {
//     startDate: '',
//     dueDate: '',
//     status: 'Pending',
//     finalTotal: 0,
//     subTotal: 0,
//     discount: 0,
//     advanceAmount: 0,
//     balanceAmount: 0,
//     items: [{ ...initialLineItem, id: Date.now().toString() }],
// };


// const AddInvoiceForm = ({ client_id }: { client_id: string }) => {
//     const [formData, setFormData] = useState<InvoiceFormData>(initialFormData);

//     const subtotal = formData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
//     const discountAmount = (subtotal * (Number(formData.discount) || 0)) / 100;
//     const finalTotal = subtotal - discountAmount;

//     let remainingBalance = finalTotal - (Number(formData.advanceAmount) || 0);
//     if (remainingBalance < 0) remainingBalance = 0;

//     const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     }, []);

//     const handlePartialChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = Math.max(0, Math.min(Number(e.target.value), finalTotal));
//         setFormData(prev => ({ ...prev, advanceAmount: value }));
//     }, [finalTotal]);

//     const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
//         setFormData(prev => ({
//             ...prev,
//             items: prev.items.map(item =>
//                 item.id === id ? { ...item, [field]: value } : item
//             ),
//         }));
//     };

//     const addItem = () => {
//         setFormData(prev => ({
//             ...prev,
//             items: [...prev.items, { ...initialLineItem, id: Date.now().toString() }],
//         }));
//     };

//     const removeItem = (id: string) => {
//         setFormData(prev => ({
//             ...prev,
//             items: prev.items.filter(item => item.id !== id),
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (Number(formData.advanceAmount) > finalTotal) {
//             alert("Advance amount cannot exceed final total");
//             return;
//         }
//         console.log({
//             ...formData,
//             subTotal: subtotal,
//             finalTotal,
//             remainingBalance
//         });
//     };


//     return (
//         <Box>
//             <Paper>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'lg', mx: 'auto', p: 2 }}>
//                     <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
//                         Create New Invoice
//                     </Typography>

//                     <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
//                         Invoice Details
//                     </Typography>
//                     <Grid container spacing={3}>

//                         {/* Start Date */}
//                         <Grid >
//                             <TextField
//                                 label="Start Date"
//                                 name="startDate"
//                                 type="date"
//                                 value={formData.startDate}
//                                 onChange={handleChange}
//                                 fullWidth
//                                 required
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>

//                         <Grid >
//                             <TextField
//                                 label="Due Date"
//                                 name="dueDate"
//                                 type="date"
//                                 value={formData.dueDate}
//                                 onChange={handleChange}
//                                 fullWidth
//                                 required
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>

//                         <Grid >
//                             <TextField
//                                 label="Status"
//                                 name="status"
//                                 select
//                                 value={formData.status}
//                                 onChange={handleChange}
//                                 fullWidth
//                                 required
//                             >
//                                 {['Paid', 'Pending', 'Partially Paid'].map((status) => (
//                                     <MenuItem key={status} value={status}>
//                                         {status}
//                                     </MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>

//                     </Grid>

//                     <Divider sx={{ my: 4 }} />
//                     <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
//                         Line Items
//                     </Typography>

//                     {formData.items.map((item, index) => (
//                         <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }} key={item.id}>
//                             <Grid >
//                                 <TextField
//                                     label={`Service ${index + 1}`}
//                                     name="serviceId"
//                                     select
//                                     value={item.serviceId}
//                                     onChange={(e) => handleItemChange(item.id, 'serviceId', e.target.value)}
//                                     fullWidth
//                                     required
//                                 >
//                                     {MOCK_SERVICES.map((service) => (
//                                         <MenuItem key={service.id} value={service.id}>
//                                             {service.name}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                             </Grid>
//                             <Grid >
//                                 <TextField
//                                     label="Amount"
//                                     name="amount"
//                                     fullWidth
//                                     value={item.amount === 0 ? "" : item.amount}
//                                     onChange={(e) => handleItemChange(item.id, 'amount', Number(e.target.value))}
//                                     InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid >
//                                 <TextField
//                                     label="Details"
//                                     name="details"
//                                     fullWidth
//                                     value={item.details}
//                                     multiline
//                                     rows={2}
//                                     onChange={(e) => handleItemChange(item.id, 'details', e.target.value)}
//                                 />
//                             </Grid>
//                             <Grid sx={{ textAlign: 'right' }}>
//                                 {formData.items.length > 1 && (
//                                     <IconButton color="error" onClick={() => removeItem(item.id)} aria-label="remove item">
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 )}
//                             </Grid>
//                         </Grid>
//                     ))}

//                     <Button
//                         startIcon={<AddIcon />}
//                         onClick={addItem}
//                         variant="outlined"
//                         sx={{ mb: 4 }}
//                     >
//                         Add Item
//                     </Button>


//                     <Divider sx={{ my: 4 }} />


//                     <Grid container spacing={3} justifyContent="flex-end">

//                         <Grid >
//                             <TextField
//                                 label="Sub Total"
//                                 value={subtotal}
//                                 fullWidth
//                                 InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
//                                 sx={{ fontWeight: 'bold', backgroundColor: '#e8f5e9' }}
//                                 disabled
//                             />
//                         </Grid>

//                         {formData.status === 'Partially Paid' && (
//                             <TextField
//                                 label="Advance Paid"
//                                 type="number"
//                                 value={formData.advanceAmount === 0 ? ""  : formData.advanceAmount}
//                                 onChange={handlePartialChange}
//                                 error={Number(formData.advanceAmount) > finalTotal}
//                                 helperText={Number(formData.advanceAmount) > finalTotal ? "Cannot exceed final total" : ""}
//                                 InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
//                             />
//                         )}

//                         <Grid >
// <TextField
//     label="Discount (%)"
//     name="discount"
//     value={formData.discount}
//     onChange={handleChange}
//     fullWidth
// />
//                         </Grid>

//                         {formData.status === 'Partially Paid' && (

//                             <Grid >

//                                 <TextField
//                                     label="Remaining Balance"
//                                     name="remaining"
//                                     value={remainingBalance}
//                                     fullWidth
//                                     required
//                                     InputProps={{ startAdornment: <Typography sx={{ mr: 1, fontWeight: 'bold' }}>₹</Typography> }}
//                                     sx={{ fontWeight: 'bold', backgroundColor: '#e8f5e9' }}
//                                 />
//                             </Grid>
//                         )}

//                         <Grid >
//                             <TextField
//                                 label="Final Price"
//                                 name="discounted"
//                                 value={finalTotal}
//                                 fullWidth
//                                 required
//                                 InputProps={{ startAdornment: <Typography sx={{ mr: 1, fontWeight: 'bold' }}>₹</Typography> }}
//                                 sx={{ fontWeight: 'bold', backgroundColor: '#e8f5e9' }}

//                             />
//                         </Grid>


//                     </Grid>

//                     <Box sx={{ mt: 5, pt: 2, borderTop: '1px solid #eee' }}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             size="large"
//                             startIcon={<SaveIcon />}
//                             fullWidth
//                             sx={{ py: 1 }}
//                         >
//                             Save Invoice
//                         </Button>
//                     </Box>

//                 </Box>
//             </Paper>
//         </Box>
//     );
// };

// export default AddInvoiceForm;

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
import { LineItem,InvoiceFormData  } from '@/utils/types';

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
};

const AddInvoiceForm = ({ client_id }: { client_id: string }) => {
    const [formData, setFormData] = useState<InvoiceFormData>(initialFormData);

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

        console.log(ok)

        try {

            const response = await axiosInstance.post(
                '/create-invoice',
                ok, 
                {
                    params: {
                        clientId: client_id
                    }
                }
            );

            console.log(response.data);

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
