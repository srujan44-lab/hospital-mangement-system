import { toast } from "sonner";

export const addAppointment = async (
  pname: string,
  pid: string,
  apponum: number,
  scheduleid: number,
  appodate: string
) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment`;

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        pname,
        pid,
        apponum,
        scheduleid,
        appodate,
      }),
    });

    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return
    }    

    toast.success(`Booking completed`);
    window.location.href = "http://localhost:3000/patient/my-bookings"
  } catch (error) {
    toast.error("Internal Server Error!");
    console.log(error);

    return;
  }
};
