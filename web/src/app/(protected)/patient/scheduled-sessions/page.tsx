"use client";
import { ScheduleCard } from "@/components/cards/schedule-card";
import { ScheduleType } from "@/types/schedule.type";
import { doctorType } from "@/types/user.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = (): JSX.Element => {
  const [schedules, setSchedules] = useState<Array<ScheduleType & doctorType>>(
    []
  );

  const fetchSchedule = async () => {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/schedule`;

    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return undefined;
    }

    const data = await response.json();
    
    setSchedules(data);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {schedules.length ? schedules.map(
        ({ title, name, scheduledate, scheduletime, scheduleid, email, appointment_count }) => (
          <ScheduleCard
            key={scheduleid}
            title={title}
            name={name}
            date={scheduledate}
            time={scheduletime}
            email={email}
            id={scheduleid}
            appointmentCount={appointment_count}
          />
        )
      ) : <h3 className="text-center text-xl col-span-3">No schedules are there to display</h3>}
    </div>
  );
};

export default Page;
