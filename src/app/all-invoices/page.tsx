import InvoiceListing from "@/components/common/InvoiceListing";
import { AllInvoicesProps } from "@/utils/types";

const AllInvoices = async ({ searchParams }: AllInvoicesProps) => {
    const clientId = await searchParams.client_id; 

    return (
            <InvoiceListing client_id={clientId as string} />
    );
}

export default AllInvoices;