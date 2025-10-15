import InvoiceListing from "@/components/common/InvoiceListing";
import axiosInstance from "@/utils/axiosInstance";
import { AllInvoicesProps } from "@/utils/types";

const AllInvoices = async ({ searchParams }: AllInvoicesProps) => {
    const params = await searchParams

    const clientId = params.client_id

    const response = await axiosInstance.get(
                '/get-invoice',
                {
                    params: {
                        clientId: clientId
                    }
                }
            );


    return (
            <InvoiceListing clientId={clientId as string} allInvoices={response.data.data} />
    );
}

export default AllInvoices;