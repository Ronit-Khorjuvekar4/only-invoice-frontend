import AddInvoiceForm from "@/components/common/AddInvoiceForm"
import { AllInvoicesProps } from "@/utils/types";


const AddInvoice = async({ searchParams }: AllInvoicesProps) => {
    const clientId =  await searchParams.client_id; 

    return(
            <AddInvoiceForm client_id={clientId as string}/>
    )
}

export default AddInvoice