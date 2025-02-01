import Image from "next/image";
import patientBanner from "@/assets/images/patient-banner.webp";
import Link from "next/link";

const Page = (): JSX.Element => {
  return (
    <div>
      <div className="relative p-8 rounded-md flex flex-col gap-4 bg-gradient-to-r from-black text-white">
        <Image
          alt="patient-banner"
          className="-z-10"
          src={patientBanner}
          objectFit="cover"
          layout="fill"
        />
        <h1 className="z-10 text-3xl font-bold">Welcome !</h1>
        <p className="z-10 text-lg w-1/2">
          Haven't any idea about doctors? no problem let's jumping to <b>All
          Doctors</b> section or <b>Sessions</b> Track your past and future appointments
          history. Also find out the expected arrival time of your doctor or
          medical consultant.
        </p>
        <Link className="z-10 px-4 py-2 rounded-md bg-primary font-semibold text-white w-fit" href="/patient/scheduled-sessions">Book a session</Link>
      </div>
    </div>
  );
};

export default Page;
