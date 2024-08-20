import { Image } from "@mantine/core";
import SignupForm from "../component/signup/signupForm";
import Link from "next/link";

export default function Page() {
  function handleSubmit() {
    console.log("Hello world");
  }
  return (
    <div className="flex flex-col md:flex-row p-4 md:p-0">
      <div className="hidden md:block w-1/2 h-screen">
        <Image
          src="https://plus.unsplash.com/premium_photo-1679434137926-7ecea70d3127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-1/2">
        <div className="p-4">
          <h6 className=" text-xl font-semibold">Welcome,</h6>
          <span>{`let's sign you up`}</span>
        </div>
        <div className="max-w-[400px] mx-auto mt-[120px]">
          <h1 className="text-center text-[40px] font-extrabold">
            The Standin
          </h1>
          <h2>
            Already have an account ? <Link href="/sign-in">Sign in</Link>
          </h2>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
