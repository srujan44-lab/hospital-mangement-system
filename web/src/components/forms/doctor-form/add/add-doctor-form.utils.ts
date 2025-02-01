import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const handleAddDoctor = async (
  formData: FormData,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  const name = formData.get("name") as string;
  const mobileNumber = (formData.get("mobileNumber") as string)
    .split("+91")
    .pop() as string;
  const specialties = formData.get("specialties") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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

  if (password.trim().length < 4)
    return {
      name: "password",
      error: "password must be atlease of 8 letter",
      status: false,
    };

  const data = {
    name,
    email,
    mobileNumber,
    specialties,
    password
  };  

  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/doctor`;

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

  toast.success("Doctor added successfully!");
  setOpen(false);
};
