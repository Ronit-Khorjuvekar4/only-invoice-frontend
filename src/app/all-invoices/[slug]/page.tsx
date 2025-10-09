import InvoiceListing from "@/components/common/InvoiceListing";
import { AllInvoicesProps } from "@/utils/types";

const AllInvoices = async ({ searchParams }: AllInvoicesProps) => {
    const params = await searchParams

    const clientId = params.client_id

    return (
            <InvoiceListing client_id={clientId as string} />
    );
}

export default AllInvoices;