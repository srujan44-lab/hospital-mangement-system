import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const handleUpdateDoctor = async (
  formData: FormData,
  setOpen: Dispatch<SetStateAction<boolean>>,
  email: string
) => {
  const name = formData.get("name") as string;
  const mobileNumber = (formData.get("mobileNumber") as string)
    .split("+91")
    .pop() as string;
  const specialties = formData.get("specialties") as string;

  if (name.trim().length < 4)
    return {
      name: "name",
      error: "Doctor name must be atlease of 3 letter",
      status: false,
    };

  if (!specialties.trim().length)
    return {
      name: "specialties",
      error: "please select any one specialties",
      status: false,
    };

  const normalizedMobileNumber = mobileNumber.replace(/\D/g, "").slice(-10);

  if (normalizedMobileNumber.trim().length !== 10)
    return {
      name: "mobileNumber",
      error: "invalid Mobile number",
      status: false,
    };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      name: "email",
      error: "invalid email id",
      status: false,
    };
  }

  const data = {
    name,
    mobileNumber,
    specialties
  };

  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/doctor/${email}`;

    const response = await fetch(URL, {
      method: "PUT",
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

  toast.success("Doctor updated successfully!");
  setOpen(false);
};
