import { tableHead } from "./patient-table.string";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GetPatientType } from "./patient-table.types";
import { ViewIcon } from "@/assets/icons/view";
import { patientType } from "@/types/user.type";

export const getPatients: GetPatientType = async (setTableData) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/patient`;
    
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });
    console.log(response);
    
    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return undefined;
    }

    const data: Array<patientType> = await response.json();

    const tableBody = data.map(({ name, email, mobileNumber }) => ({
      values: [
        name,
        email,
        mobileNumber,
      ],
    }));

    

    setTableData({ head: tableHead, body: tableBody });
  } catch (error) {
    toast.error("Internal Server Error!");
    console.log(error);

    return undefined;
  }
};
