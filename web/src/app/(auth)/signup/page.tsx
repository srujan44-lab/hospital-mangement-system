import { SignupForm } from "@/components/forms/signup-form";
import Image from "next/image";
import Link from "next/link";
import signupBg from "@/assets/images/signup-bg.jpeg";

const Page = (): JSX.Element => {
  return (
    <div className="space-y-8 px-6">
      <Image
        alt="signup-bg"
        className="-z-10"
        src={signupBg}
        layout="fill"
        objectFit="conver"
      />
      <h1 className="mb-20 text-5xl font-extrabold">
        <span className="text-green-500">LEELA</span>{" "}
        <span className="text-blue-500">HOSPITAL</span>
      </h1>
      <div className="bg-white p-8 rounded-xl w-[40rem] space-y-8">
        <header>
          <h1 className="font-semibold tracking-tight text-2xl">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </header>
        <SignupForm />
      </div>
      <p className="text-center text-sm text-white">
        Already have an account?{" "}
        <Link className="text-primary font-semibold" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Page;
