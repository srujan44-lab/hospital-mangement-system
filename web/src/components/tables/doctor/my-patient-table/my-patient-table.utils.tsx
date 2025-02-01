import { tableHead } from "./my-patient-table.string";
import { toast } from "sonner";
import { GetPatientType } from "./my-patient-table.types";
import { patientType } from "@/types/user.type";

export const getPatients: GetPatientType = async (setTableData, patientId) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/patient/${patientId}`;
    
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
