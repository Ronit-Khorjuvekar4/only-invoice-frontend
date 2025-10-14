import SingleInvoice from "@/components/common/SingleInvoice";
import axiosInstance from "@/utils/axiosInstance";
import { AllInvoicesProps } from "@/utils/types"

const ViewInvoice = async({ searchParams }: AllInvoicesProps) => {

    const params = await searchParams

    const invoiceId = params.invoice_id

    const response = await axiosInstance.get(
                '/single-invoice',
                {
                    params: {
                        invoiceId: invoiceId,
                    }
                }
            );

    return(
        <>
            <SingleInvoice data={response.data.data} />
        </>
    )
}

export default ViewInvoice