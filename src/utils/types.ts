export interface ClientInterface{
    _id:String,
    clientName:String,
    clientEmail:String,
    orgName:String,
    clientPhone:number
}[]

export interface AllInvoicesProps {
  searchParams: {
    client_id?: string;
    search?: string;
    [key: string]: string | string[] | undefined;
  };
}