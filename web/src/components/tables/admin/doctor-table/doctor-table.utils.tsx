import { tableHead } from "./doctor-table.string";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DeleteIcon, UpdateIcon } from "@/assets/icons";
import { GetDoctorType } from "./doctor-table.types";
import { doctorType } from "@/types/user.type";

export const getDoctors: GetDoctorType = async (
  setTableData,
  setOpenupdateForm,
  setDefaultValues
) => {
  
  const handleDeleteDoctor = async (email: string) => {
    try {
      const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/${email}`;

      const response = await fetch(URL, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        toast.error(`Error: ${response.statusText}`);
        return undefined;
      }

      toast.success("Doctor deleted");
      getDoctors(setTableData, setOpenupdateForm, setDefaultValues);
    } catch (error) {
      toast.error("Internal Server Error!");
      return undefined;
    }
  };
  
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
          <div className="space-x-4 flex" key={email}>
            <Button
              className="p-0"
              onClick={() => {
                setOpenupdateForm(true);
                setDefaultValues({ name, email, specialties, mobileNumber });
              }}
              variant="ghost"
            >
              <UpdateIcon className="text-blue-500" height={20} width={20} />
            </Button>
            <Button
              className="p-0"
              onClick={() => handleDeleteDoctor(email)}
              variant="ghost"
            >
              <DeleteIcon className="text-red-500" height={20} width={20} />
            </Button>
          </div>
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
