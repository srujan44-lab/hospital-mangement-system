import { tableHead } from "./schedule-table.string";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DeleteIcon, UpdateIcon } from "@/assets/icons";
import { GetDoctorType } from "./schedule-table.types";
import { ViewIcon } from "@/assets/icons/view";
import { doctorType } from "@/types/user.type";
import { ScheduleType } from "@/types/schedule.type";

export const getDoctors: GetDoctorType = async (
  setTableData,
  setOpenupdateForm,
) => {
  
  const handleDeleteDoctor = async (id: number) => {
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

      toast.success("Schedule deleted");
      getDoctors(setTableData, setOpenupdateForm);
    } catch (error) {
      toast.error("Internal Server Error!");
      return undefined;
    }
  };
  
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/schedule`;
    
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });
    
    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return undefined;
    }
        
    const data: Array<ScheduleType & doctorType> = await response.json();        

    const tableBody = data.map(
      ({ scheduleid, title, name, scheduledate, scheduletime, nop }) => ({
        values: [
          title,
          name,
          scheduledate.split("T")[0],
          scheduletime.slice(0,5),
          nop,
          <div className="space-x-4 flex" key={scheduleid}>
            <Button
              className="p-0"
              onClick={() => handleDeleteDoctor(scheduleid)}
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
