import { LoginForm } from "@/components/forms/login-form";
import Image from "next/image";
import Link from "next/link";
import loginBg from "@/assets/images/login-bg.jpeg";

const Page = (): JSX.Element => {
  return (
    <div className="space-y-8">
      <Image
        alt="login-bg"
        className="-z-10"
        src={loginBg}
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
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </header>
        <LoginForm />
      </div>

      <p className="text-center text-sm text-white">
        Don't have an account?{" "}
        <Link className="text-primary font-semibold" href="/signup">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Page;
