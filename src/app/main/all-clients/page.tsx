import { AuthGuard } from "@/components/auth/AuthGuard"
import ClientListing from "@/components/common/ClientListing"
import axiosInstance from "@/utils/axiosInstance"

const AllClients = async () => {
    const clientData = await axiosInstance.get("clients")

    return (
        <>

            <ClientListing clients={clientData.data.data} />
        </>
    )
}

export default AllClients