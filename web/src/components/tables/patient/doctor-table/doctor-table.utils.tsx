import { tableHead } from "./doctor-table.string";
import { toast } from "sonner";
import { GetDoctorType } from "./doctor-table.types";
import { doctorType } from "@/types/user.type";

export const getDoctors: GetDoctorType = async (setTableData) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/doctor`;

    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return undefined;
    }

    const data: doctorType[] = await response.json();

    const tableBody = data.map(
      ({ name, email, specialties, mobileNumber }) => ({
        values: [
          name,
          email,
          specialties,
          mobileNumber,
        ],
      })
    );

    setTableData({ head: tableHead, body: tableBody });
  } catch (error) {
    toast.error("Internal Server Error!");
    console.log(error);

    return undefined;
  }
};
