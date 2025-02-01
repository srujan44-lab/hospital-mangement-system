"use client";
import { BookingCard } from "@/components/cards/booking-card";
import { useAuth } from "@/contexts/auth-user.context";
import { AppointmentType } from "@/types/appointment.type";
import { ScheduleType } from "@/types/schedule.type";
import { doctorType } from "@/types/user.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = (): JSX.Element => {
  const [schedules, setSchedules] = useState<
    Array<ScheduleType & doctorType & AppointmentType>
  >([]);
  const authUser = useAuth();

  const fetchSchedule = async () => {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment/patient/${authUser?.email}`;

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
  }, [authUser]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {schedules.length ? schedules.map(
        ({ title, name, scheduledate, scheduletime, apponum, appoid }) => (
          <BookingCard
            key={appoid}
            appointmentNumber={apponum}
            title={title}
            name={name}
            date={scheduledate}
            time={scheduletime}
            id={appoid}
          />
        )
      ) : <h3 className="text-center text-xl col-span-3">No bookings are there to display</h3>}
    </div>
  );
};

export default Page;
