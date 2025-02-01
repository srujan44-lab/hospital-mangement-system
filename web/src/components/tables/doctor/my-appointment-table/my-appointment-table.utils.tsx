import { tableHead } from "./my-appointment-table.string";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GetAppointmentType } from "./my-appointment-table.types";

export const getAppointments: GetAppointmentType = async (
  setTableData,
  setOpenupdateForm,
  doctorId,
) => {
  
  const handleDeleteAppointment = async (id: number) => {
    try {
      const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment/${id}`;

      const response = await fetch(URL, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        toast.error(`Error: ${response.statusText}`);
        return undefined;
      }

      toast.success("Appointment canceled");
      getAppointments(setTableData, setOpenupdateForm, doctorId);
    } catch (error) {
      toast.error("Internal Server Error!");
      return undefined;
    }
  };
  
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment/${doctorId}`;
    
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });
    
    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return undefined;
    }
        
    const data: Array<any> = await response.json();        

    const tableBody = data.map(
      ({ title, pname, scheduledate, scheduletime, apponum, appoid}) => ({
        values: [
          pname,
          apponum,
          title,
          scheduledate.split("T")[0],
          scheduletime.slice(0,5),
          <div className="space-x-4 flex" key={appoid}>
            <Button
              className="font-semibold"
              onClick={() => handleDeleteAppointment(appoid)}
              variant="destructive"
            >
              cancel
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
