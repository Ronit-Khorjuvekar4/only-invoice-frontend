import ClientListing from "@/components/common/ClientListing";
import axiosInstance from "@/utils/axiosInstance";
import { ClientInterface } from "@/utils/types";

export default async function Home() {

  const clientData = await axiosInstance.get("clients")

   
  return (
    <>
      <ClientListing clients={clientData.data}/>
    </>
  );
}
