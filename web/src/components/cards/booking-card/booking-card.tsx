"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookingCardProps } from "./booking-card.types";
import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-user.context";
import { deleteAppointment } from "./booking-card.utils";

export function BookingCard({
  title,
  appointmentNumber,
  name,
  date,
  time,
  id,
}: BookingCardProps): JSX.Element {
  const authUser = useAuth();

  useEffect(() => {}, [authUser]);

  return (
    <Card className="flex justify-between">
      <CardHeader className="space-y-4">
        <div>
          <CardTitle className="text-primary">{title}</CardTitle>
          <CardDescription>
            by <span className="text-black">{name}</span>
          </CardDescription>
        </div>
        <div>
          <p className="font-semibold">Appointment Number</p>
          <h1 className="text-3xl font-bold">
            {appointmentNumber < 10
              ? `0${appointmentNumber}`
              : appointmentNumber}
          </h1>
        </div>
        <CardFooter className="p-0 gap-2">
          <p>{date.split("T")[0]}</p>
          <p>• {time.slice(0, 5)} (24h)</p>
        </CardFooter>
      </CardHeader>
      <CardContent className="p-6">
        <Button
          variant="destructive"
          className="font-bold"
          onClick={() => deleteAppointment(id)}
        >
          Cancel Booking
        </Button>
      </CardContent>
    </Card>
  );
}
