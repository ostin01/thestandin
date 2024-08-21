"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function SignupForm() {
  //   const { data } = useQuery<any>({
  //     queryKey: ["todos"],
  //     queryFn: () =>
  //       fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
  //         res.json()
  //       ),
  //   });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Hello world");
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="First Name"
        placeholder="Enter First Name"
        withAsterisk
        className="mt-[20px]"
        classNames={{
          input:
            "outline-none border border-grey w-full h-[44px] rounded-lg px-4",
        }}
      />
      <TextInput
        label="Last Name"
        placeholder="Enter Last Name"
        withAsterisk
        className="mt-[20px]"
        classNames={{
          input:
            "outline-none border border-grey w-full h-[44px] rounded-lg px-4 ",
        }}
      />
      <TextInput
        label="Email"
        placeholder="Enter your email"
        withAsterisk
        className="mt-[20px]"
        classNames={{
          input:
            "outline-none border border-grey w-full h-[44px] rounded-lg px-4",
        }}
      />
      <PasswordInput
        label="Enter your password"
        withAsterisk
        className="mt-[20px]"
        classNames={{
          input:
            "outline-none border border-grey w-full h-[44px] rounded-lg px-4",
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
