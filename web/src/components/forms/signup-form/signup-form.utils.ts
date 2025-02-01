import { toast } from "sonner";

export const handleSignup = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const mobileNumber = (formData.get("mobileNumber") as string)
    .split("+91")
    .pop() as string;
  const password = formData.get("password") as string;

  const normalizedMobileNumber = mobileNumber.replace(/\D/g, "").slice(-10);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.trim().length < 4)
    return {
      name: "name",
      error: "name length must be minimum of 3",
      status: false,
    };

  if (email.trim().length === 0) {
    return {
      name: "email",
      error: "invalid email id",
      status: false,
    };
  }

  if (normalizedMobileNumber.trim().length !== 10)
    return {
      name: "mobileNumber",
      error: "invalid Mobile number",
      status: false,
    };

  if (password.trim().length < 8)
    return {
      name: "password",
      error: "password length must be minimum of 8",
      status: false,
    };

  const data = {
    name,
    email,
    mobileNumber: normalizedMobileNumber.trim(),
    password,
  };

  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`;

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401)
        return {
          name: "email",
          error: "patient with this email id already signup",
          status: false,
        };
      else {
        toast.error(`Error: ${response.statusText}`);
        return undefined;
      }
    }
  } catch (error) {
    toast.error("Internal Server Error!");
    return undefined;
  }

  toast.success("Signup successfull!");
  return { status: true };
};
