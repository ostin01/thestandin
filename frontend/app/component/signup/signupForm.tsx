"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import styles from "@/app/styles/inputstyles.module.css";
import { useSignup } from "@/app/api/hooks/authenticaiton";

export const userDetailsFormValidator = z
  .object({
    firstName: z.string().min(1, "Enter first name"),
    lastName: z.string().min(1, "Enter last name"),
    email: z.string().email("Enter valid email"),
    password: z
      .string()
      .min(8, "Password should contain at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password should contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type UserDetailsFormValidator = Omit<
  z.infer<typeof userDetailsFormValidator>,
  "confirmPassword"
>;
export default function SignupForm() {
  const { mutate: signup } = useSignup();
  const userDetailsForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(userDetailsFormValidator),
  });

  function handleSubmit(values: z.infer<typeof userDetailsFormValidator>) {
    signup(values);
  }

  return (
    <form onSubmit={userDetailsForm.onSubmit(handleSubmit)}>
      <div className="grid md:grid-cols-2 gap-6 mt-[32px]">
        <TextInput
          label="First name"
          placeholder="First name"
          size="lg"
          withAsterisk
          className="mt-4"
          classNames={styles}
          {...userDetailsForm.getInputProps("firstName")}
        />
        <TextInput
          label="Last name"
          placeholder="Last name"
          size="lg"
          withAsterisk
          className="mt-4"
          classNames={styles}
          {...userDetailsForm.getInputProps("lastName")}
        />
      </div>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        withAsterisk
        className="mt-4"
        classNames={styles}
        {...userDetailsForm.getInputProps("email")}
      />
      <PasswordInput
        label="Enter your password"
        withAsterisk
        className="mt-4"
        placeholder="Password"
        classNames={styles}
        {...userDetailsForm.getInputProps("password")}
      />

      <PasswordInput
        label="Confirm password"
        withAsterisk
        className="my-4"
        placeholder="Password"
        classNames={styles}
        {...userDetailsForm.getInputProps("confirmPassword")}
      />

      <Button type="submit" className={styles.button}>
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
