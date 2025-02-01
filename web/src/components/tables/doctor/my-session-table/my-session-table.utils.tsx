import { tableHead } from "./my-session-table.string";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GetAppointmentType } from "./my-session-table.types";

export const getSessions: GetAppointmentType = async (
  setTableData,
  setOpenupdateForm,
  doctorId,
) => {
  
  const handleDeleteAppointment = async (id: number) => {
    try {
      const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/schedule/${id}`;

      const response = await fetch(URL, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        toast.error(`Error: ${response.statusText}`);
        return undefined;
      }

      toast.success("Session canceled");
      getSessions(setTableData, setOpenupdateForm, doctorId);
    } catch (error) {
      toast.error("Internal Server Error!");
      return undefined;
    }
  };
  
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/schedule/${doctorId}`;
    
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
      ({ title, scheduledate, scheduletime, nop, scheduleid}) => ({
        values: [
          title,
          scheduledate.split("T")[0],
          scheduletime.slice(0,5),
          nop,
          <div className="space-x-4 flex" key={scheduleid}>
            <Button
              className="font-semibold"
              onClick={() => handleDeleteAppointment(scheduleid)}
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
