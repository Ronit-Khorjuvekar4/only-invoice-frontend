'use client'
import React, { useRef } from "react";
import {
    Box,
    Grid,
    Typography,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Stack,
    Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { green, red, amber, blueGrey, grey } from "@mui/material/colors";
import type { InvoiceListings } from "@/utils/types";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const BRAND_PRIMARY = "#4F86F7"; // Rankkit blue

const STATUS_TO_CHIP: Record<string, { label: string; color: "default" | "success" | "warning" | "error" | "info" | "primary" | "secondary" }> = {
    Paid: { label: "Paid", color: "success" },
    Pending: { label: "Pending", color: "warning" },
    Overdue: { label: "Overdue", color: "error" },
    "Advance Paid": { label: "Advance Paid", color: "info" },
};

const currencyFormatter = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0);

const LabelValue: React.FC<{
    label: string;
    value?: React.ReactNode;
    align?: "left" | "right";
}> = ({ label, value, align = "left" }) => (
    <Grid container alignItems="baseline" justifyContent="space-between" sx={{ py: 0.25 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, textAlign: align, color: grey[800] }}>
            {value}
        </Typography>
    </Grid>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Typography
        variant="subtitle2"
        sx={{
            fontWeight: 800,
            letterSpacing: 0.3,
            color: grey[800],
            mb: 1.5,
            textTransform: "uppercase",
        }}
    >
        {children}
    </Typography>
);

const MoneyRow: React.FC<{
    label: string;
    value: number;
    strong?: boolean;
    tone?: "default" | "danger" | "success";
}> = ({ label, value, strong, tone = "default" }) => (
    <Grid container justifyContent="space-between" sx={{ py: 0.5 }}>
        <Typography variant={strong ? "subtitle1" : "body2"} sx={{ fontWeight: strong ? 800 : 600 }}>
            {label}
        </Typography>
        <Typography
            variant={strong ? "subtitle1" : "body2"}
            sx={{
                fontWeight: strong ? 800 : 700,
                color: tone === "danger" ? red[700] : tone === "success" ? green[700] : grey[900],
            }}
        >
            {currencyFormatter(value)}
        </Typography>
    </Grid>
);

const MutedPaper: React.FC<{ children: React.ReactNode; sx?: any }> = ({ children, sx }) => (
    <Paper
        elevation={0}
        sx={{
            p: 2.5,
            borderRadius: 2,
            border: `1px solid ${alpha(grey[400], 0.4)}`,
            background: alpha(grey[50], 0.7),
            ...sx,
        }}
    >
        {children}
    </Paper>
);

const SingleInvoice: React.FC<{ data: InvoiceListings }> = ({ data }) => {
    const status = data?.invoice_id?.status || "";
    const chip = STATUS_TO_CHIP[status] || { label: status, color: "default" as const };
    const invoiceRef = useRef<HTMLDivElement>(null);

    const formattedDue = data?.invoice_id?.dueDate
        ? new Date(data.invoice_id.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "—";

    const downloadPDF = async () => {
        console.log(invoiceRef.current)
        if (!invoiceRef.current) return;

        const element = invoiceRef.current;

        // Capture the invoice as a canvas
        const canvas = await html2canvas(element, { scale: 2 }); // scale 2 for high-res
        const imgData = canvas.toDataURL('image/png');

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4'); // portrait, millimeters, A4
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice-${data.invoice_id.invoiceNumber}.pdf`);
    };

    return (
        <Box>

            <Box sx={{ textAlign: 'right', mb: 2 }} >
                <Button variant="contained" color="primary" onClick={downloadPDF}>
                    Download PDF
                </Button>
            </Box>
            <Box
                sx={{
                    "@media print": {
                        boxShadow: "none",
                        m: 0,
                        borderRadius: 0,
                    },
                    py: { xs: 4, md: 6 },
                    px: { xs: 2, md: 4 },
                    maxWidth: 980,
                    mx: "auto",
                }}
                ref={invoiceRef}
            >



                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        border: `1px solid ${alpha(grey[400], 0.4)}`,
                        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                        backgroundColor: "#fff",
                    }}
                >
                    <Box sx={{ height: 6, background: BRAND_PRIMARY }} />

                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                        <Grid container spacing={3} alignItems="flex-start">
                            <Grid>
                                <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 0.2 }}>
                                    Rankkit Media
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                                    Ambience Court, Vashi, Navi Mumbai
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    rankkitmedia@gmail.com • +91 9090434376
                                </Typography>
                            </Grid>

                            <Grid>
                                <MutedPaper>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                        <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 1, color: grey[700] }}>
                                            Invoice
                                        </Typography>
                                        <Chip size="small" label={chip.label} color={chip.color} sx={{ fontWeight: 700 }} />
                                    </Stack>
                                    <LabelValue label="Invoice #" value={data?.invoice_id?.invoiceNumber || "—"} />
                                    <LabelValue label="Due Date" value={formattedDue} />
                                    {data?.remainingBalance > 0 && (
                                        <LabelValue
                                            label="Balance Due"
                                            value={<span style={{ color: red[700], fontWeight: 800 }}>{currencyFormatter(data.remainingBalance)}</span>}
                                        />
                                    )}
                                </MutedPaper>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ borderColor: alpha(grey[400], 0.3) }} />

                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                        <Grid container spacing={3}>
                            <Grid>
                                <SectionTitle>Bill To</SectionTitle>
                                <MutedPaper>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                        {data?.clientId?.clientName || "—"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {data?.clientId?.orgName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {[data?.clientId?.clientAddress1, data?.clientId?.clientAddress2].filter(Boolean).join(", ")}
                                    </Typography>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
                                        <LabelValue label="Org ID" value={data?.clientId?.orgId || "—"} />
                                        <LabelValue label="Email" value={data?.clientId?.clientEmail || "—"} />
                                    </Stack>
                                </MutedPaper>
                            </Grid>

                            <Grid>
                                <SectionTitle>Summary</SectionTitle>
                                <MutedPaper
                                    sx={{
                                        p: 3.2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1.25,
                                    }}
                                >
                                    <MoneyRow label="Subtotal" value={Number(data?.subTotal) || 0} />

                                    {Number(data?.discount) > 0 && (
                                        <MoneyRow label="Discount (%)" value={Number(data?.discount)} />
                                    )}

                                    {Number(data?.advanceAmount) > 0 && (
                                        <MoneyRow label="Advance Paid" value={Number(data?.advanceAmount)} />
                                    )}

                                    <Divider sx={{ my: 1.5, borderColor: 'rgba(0,0,0,0.1)' }} />

                                    <MoneyRow
                                        label="Final Total"
                                        value={Number(data?.finalTotal) || 0}
                                        strong
                                    />

                                    {data?.invoice_id.status === "Advanced Paid" ? <MoneyRow
                                        label="Balance Due"
                                        value={Number(data?.remainingBalance) || 0}
                                        strong
                                        tone={Number(data?.remainingBalance) > 0 ? 'danger' : 'success'}
                                    /> : null}
                                </MutedPaper>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Line Items */}
                    <Box sx={{ p: { xs: 3, md: 4 }, pt: 0 }}>
                        <SectionTitle>Services</SectionTitle>
                        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: `1px solid ${alpha(grey[400], 0.4)}` }}>
                            <Table size="small" sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow sx={{ background: alpha(BRAND_PRIMARY, 0.06) }}>
                                        <TableCell sx={{ fontWeight: 800, color: grey[800] }}>#</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: grey[800] }}>Service</TableCell>
                                        <TableCell sx={{ fontWeight: 800, color: grey[800] }}>Description</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 800, color: grey[800] }}>
                                            Amount
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(data?.items || []).map((item: any, index: number) => (
                                        <TableRow key={`${item?.serviceId || "svc"}-${index}`} hover sx={{ "&:last-child td": { border: 0 } }}>
                                            <TableCell sx={{ color: grey[800] }}>{index + 1}</TableCell>
                                            <TableCell sx={{ color: grey[900], fontWeight: 600 }}>{item?.serviceId || "—"}</TableCell>
                                            <TableCell sx={{ color: grey[700] }}>{item?.details || "—"}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 700, color: grey[900] }}>
                                                {currencyFormatter(Number(item?.amount) || 0)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box sx={{ p: { xs: 3, md: 4 }, pt: 1.5 }}>
                        <Divider sx={{ mb: 2, borderColor: alpha(grey[400], 0.3) }} />
                        <Typography variant="body2" align="center" color="text.secondary" sx={{ fontStyle: "italic" }}>
                            Thank you for your business. Payment is due within 30 days of the invoice date.
                        </Typography>
                        <Box sx={{ height: 16 }} />
                    </Box>
                </Paper>

            </Box>

        </Box>
    );
};

export default SingleInvoice;
