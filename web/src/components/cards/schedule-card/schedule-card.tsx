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
import { ScheduleCardProps } from "./schedule-card.types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { addAppointment } from "./schedule-card.utils";
import { useAuth } from "@/contexts/auth-user.context";
import Image from "next/image";
import qrCode from "@/assets/images/qr-code.png";
import Link from "next/link";

export function ScheduleCard({
  title,
  name,
  date,
  time,
  email,
  id,
  appointmentCount,
}: ScheduleCardProps): JSX.Element {
  const authUser = useAuth();

  useEffect(() => {}, [authUser]);

  return (
    <Card className="flex justify-between">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
        <CardDescription>
          by <span className="text-black">{name}</span>
        </CardDescription>
        <CardFooter className="p-0 gap-2">
          <p>{date.split("T")[0]}</p>
          <p>• {time.slice(0, 5)} (24h)</p>
        </CardFooter>
      </CardHeader>
      <CardContent className="p-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Book Now</Button>
          </DialogTrigger>
          <DialogContent className="p-8 space-y-6 w-[50rem]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-semibold text-primary">
                Session Details
              </DialogTitle>
            </DialogHeader>
            <section className="space-y-8">
              <main className="flex gap-8">
                <section className="grid grid-cols-2">
                  <p className="font-semibold">Doctor Name:</p>
                  <p>{name}</p>

                  <p className="font-semibold">Doctor Email:</p>
                  <p>{email}</p>

                  <p className="font-semibold">Session Title:</p>
                  <p>{title}</p>

                  <p className="font-semibold">Schedule Date:</p>
                  <p>{date.split("T")[0]}</p>

                  <p className="font-semibold">Schedule Time:</p>
                  <p>{time.slice(0, 5)}</p>
                </section>
                <section className="bg-primary rounded-lg p-4 text-center text-white font-semibold space-y-2">
                  <h3>Appointment Number</h3>
                  <h1 className="text-7xl">{appointmentCount + 1}</h1>
                </section>
              </main>
              <main className="flex flex-col items-center gap-4">
                <p>Pay here and fill the details in below google form</p>
                <Image alt="qr-code" src={qrCode} width={200} height={200} />
                <Link className="text-primary underline" href="https://forms.gle/aARRoqjkXF6Y63ia6" target="_blank">https://forms.gle/aARRoqjkXF6Y63ia6</Link>
              </main>
            </section>
            <DialogFooter className="!flex-col w-fit">
              <DialogClose asChild>
                <Button
                  onClick={() =>
                    addAppointment(
                      authUser!.name,
                      authUser!.email,
                      appointmentCount + 1,
                      id,
                      date
                    )
                  }
                >
                  Book Now
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
