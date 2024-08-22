"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";

export default function SignupForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Hello world");
  }
  return (
    <form onSubmit={handleSubmit}>
      {/* <TextInput
        label="First Name"
        placeholder="Enter First Name"
        withAsterisk
        className="mt-4"
        classNames={{
          input:
            "outline-none border border-grey w-full h-[44px] rounded-lg px-4",
        }}
      />
      <TextInput
        label="Last Name"
        placeholder="Enter Last Name"
        withAsterisk
        className="mt-4"
        classNames={{
          input:
            "outline-none border border-grey w-full h-[44px] rounded-lg px-4 ",
        }}
      /> */}
      <div className="grid md:grid-cols-2 gap-6 mt-[32px]">
        <TextInput
          labelProps={{ className: "" }}
          label="First name"
          placeholder="First name"
          size="lg"
          withAsterisk
          className="mt-4"
          classNames={{
            input:
              "outline-none border border-grey w-full h-[44px] rounded-lg px-4 ",
          }}
        />
        <TextInput
          labelProps={{ className: "text-shade-01 font-light" }}
          label="Last name"
          placeholder="Last name"
          size="lg"
          withAsterisk
          className="mt-4"
          classNames={{
            input:
              "outline-none border border-grey w-full h-[44px] rounded-lg px-4 ",
          }}
        />
      </div>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        withAsterisk
        className="mt-4"
        classNames={{
          input:
            "outline-none border border-grey w-full h-[44px] rounded-lg px-4",
        }}
      />
      <PasswordInput
        label="Enter your password"
        withAsterisk
        className="mt-4"
        placeholder="Password"
        classNames={{
          input: "outline-none border border-grey rounded-lg px-4",
          innerInput: "outline-none w-full h-[44px]",
        }}
      />

      <PasswordInput
        label="Confirm password"
        withAsterisk
        placeholder="Password"
        classNames={{
          input: "outline-none border border-grey rounded-lg px-4",
          innerInput: "outline-none w-full h-[44px]",
        }}
      />

      <Button
        type="submit"
        className="bg-black text-white w-full rounded-lg py-4 mb-4"
      >
        Submit
      </Button>

      <h2>
        Already have an account ?{" "}
        <Link href="/sign-in" className="text-blue-600">
          Log in
        </Link>
      </h2>
    </form>
  );
}
