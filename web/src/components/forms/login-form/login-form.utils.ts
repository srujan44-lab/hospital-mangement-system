import { toast } from "sonner";

export const handleLogin = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email) || password.trim().length < 8) {
    return {
      name: "password",
      error: "invalid email or password",
      status: false,
    };
  }

  const data = {
    email,
    password,
  };

  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`;

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 404)
        return {
          name: "password",
          error: "invalid username or password",
          status: false,
        };
      else {
        toast.error(`Error: ${response.statusText}`);
        return undefined;
      }
    }

    const user = await response.json();

    user.userType === "admin"
      ? (window.location.href = "http://localhost:3000/admin")
      : user.userType === "doctor"
      ? (window.location.href = "http://localhost:3000/doctor")
      : (window.location.href = "http://localhost:3000/patient");
  } catch (error) {
    toast.error("Internal Server Error!");
    return undefined;
  }

  toast.success("Login successfull!");
  return { status: true };
};
