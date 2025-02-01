import { tableHead } from "./appointment-table.string";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GetAppointmentType } from "./appointment-table.types";
import { doctorType, patientType } from "@/types/user.type";
import { ScheduleType } from "@/types/schedule.type";
import { AppointmentType } from "@/types/appointment.type";

export const getAppointments: GetAppointmentType = async (
  setTableData,
  setOpenupdateForm,
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
      getAppointments(setTableData, setOpenupdateForm);
    } catch (error) {
      toast.error("Internal Server Error!");
      return undefined;
    }
  };
  
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment`;
    
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
      ({ title, pname, scheduledate, scheduletime, apponum, appoid, dname }) => ({
        values: [
          pname,
          apponum,
          dname, 
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
