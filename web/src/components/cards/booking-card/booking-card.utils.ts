import { toast } from "sonner";

export const deleteAppointment = async (
  id: number,
) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/appointment/${id}`;

    const response = await fetch(URL, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      toast.error(`Error: ${response.statusText}`);
      return
    }

    console.log(await response.json());

    toast.success(`Booking canceled`);
    window.location.href = "http://localhost:3000/patient/my-bookings"
  } catch (error) {
    toast.error("Internal Server Error!");
    console.log(error);

    return;
  }
};
