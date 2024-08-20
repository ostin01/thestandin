"use client";
import { PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";

export default function SignupForm() {
  return (
    <form>
      <TextInput label="First Name" placeholder="Enter First Name" />
      <TextInput label="Last Name" placeholder="Enter Last Name" />
      <TextInput label="Email" placeholder="Enter your email" />
      <PasswordInput label="Enter your password" />
      {/* <div className="flex justify-center items-center">
            <Button className="!bg-black !mt-4 !py-1">Sign up</Button>
          </div> */}
      <Link
        href="/homepage"
        className=" w-[50px] h-[20px] bg-blue-500 text-white text-center rounded-lg py-4 px-8"
      >
        sign up
      </Link>
    </form>
  );
}
