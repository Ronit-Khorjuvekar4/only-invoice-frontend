import ClientListing from "@/components/common/ClientListing";
import axiosInstance from "@/utils/axiosInstance";
import { ClientInterface } from "@/utils/types";
import Register from "./auth/register/page";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default async function Home() {



  return (
    <>
      <Register />

    </>
  );
}
