import Image from "next/image";
import doctorBanner from "@/assets/images/doctor-banner.jpg";
import Link from "next/link";

const Page = (): JSX.Element => {
  return (
    <div>
      <div className="relative p-8 rounded-md space-y-4 bg-gradient-to-r from-black text-white flex flex-col gap-4">
        <Image
          alt="doctor-banner"
          className="-z-10"
          src={doctorBanner}
          objectFit="cover"
          layout="fill"
        />
        <h1 className="z-10 text-3xl font-bold">Welcome !</h1>
        <p className="z-10 text-lg w-1/2">
        Thanks for joinnig with us. We are always trying to get you a complete service
You can view your dailly schedule, Reach Patients Appointment at home!
        </p>
        <Link className="z-10 px-4 py-2 rounded-md bg-primary font-semibold text-white w-fit" href="/doctor/my-appointments">View my appointments</Link>
      </div>
    </div>
  );
};

export default Page;
