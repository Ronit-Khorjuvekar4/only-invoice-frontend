import AddInvoiceForm from "@/components/common/AddInvoiceForm"
import { AllInvoicesProps } from "@/utils/types";


const AddInvoice = async({ searchParams }: AllInvoicesProps) => {
    const params  =  await searchParams; 

    const clientId = params.client_id
    const invoiceId = params.invoice_id


    return(
            <AddInvoiceForm client_id={clientId as string} invoice_id={invoiceId as string}/>
    )
}

export default AddInvoice