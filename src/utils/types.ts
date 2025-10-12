export interface ClientInterface {
  _id: String,
  orgId: String,
  clientName: String,
  clientEmail: String,
  orgName: String,
  clientPhone: number
}[]

export interface AllInvoicesProps {
  searchParams: {
    client_id?: string;
    search?: string;
    [key: string]: string | string[] | undefined;
  };
}

export interface LineItem {
  id: string;
  serviceId: string;
  amount: number | string;
  details: string;
}

export interface InvoiceFormData {
  startDate: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Advanced Paid' | 'Overdue' | string;
  discount: number | string;
  advanceAmount: number | string;
  items: LineItem[];
}

interface invoice_id {
  dueDate: string;
  invoiceNumber: string;
  status: string;
  _id: string
}

interface clientId{
  _id:string;
  orgName:string
  clientName?:string;
  clientEmail?:string;
  clientPhone?:number;
  clientAddress1?:string;
  clientAddress2?:string;
  orgId?:string
}

export interface InvoiceListings {
  discount: number | string;
  advanceAmount: number | string;
  finalTotal: number;
  remainingBalance: number;
  subTotal: number;
  _id: string;
  items: LineItem[];
  invoice_id:invoice_id;
  clientId:clientId
}[]