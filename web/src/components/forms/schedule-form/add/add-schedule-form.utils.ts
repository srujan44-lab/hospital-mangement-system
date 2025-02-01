import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const handleAddDoctor = async (
  formData: FormData,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const title = formData.get("title") as string;
  const doctor = formData.get("doctor") as string;
  const scheduleDate = formData.get("scheduleDate") as unknown;
  const scheduleTime = formData.get("scheduleTime") as unknown;
  const nop = formData.get("nop") as string;  

  if (title.trim().length < 4)
    return {
      name: "title",
      error: "Title must be atlease of 3 letter",
      status: false,
    };

  if (!doctor.trim().length)
    return {
      name: "doctor",
      error: "please select any one doctor",
      status: false,
    };

  if (!scheduleDate)
    return {
      name: "scheduleDate",
      error: "please enter the schedule date",
      status: false,
    };

  if (!scheduleTime)
    return {
      name: "scheduleTime",
      error: "please enter the schedule time",
      status: false,
    };
  
  if (parseInt(nop) < 1)
    return {
      name: "nop",
      error: "please enter a valid number",
      status: false,
    };

  const data = {
    title,
    docid: doctor,
    scheduleDate,
    scheduleTime,
    nop,
  };

  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/schedule`;

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return undefined;
    }
  } catch (error) {
    toast.error("Internal Server Error!");
    return undefined;
  }

  toast.success("Schedule added successfully!");
  setOpen(false);
};

export const fetchAllDoctors = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/doctor`;

    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    toast.error("Internal Server Error!");
    return null;
  }
}
