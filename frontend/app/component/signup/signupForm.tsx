"use client";
import { Button, Notification, PasswordInput, TextInput } from "@mantine/core";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import styles from "@/app/styles/inputstyles.module.css";
import { useSignup } from "@/api/hooks/authentication";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  function handleError(message: string) {
    setErrorMessage(message);
  }

  function handleSuccess() {
    setSuccess(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 2000);
  }
  const { mutate: signup, isPending: signupLoading } = useSignup({
    successCallbBack: handleSuccess,
    errorCallback: handleError,
  });
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
      <div className="grid md:grid-cols-2 gap-6 mt-4">
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
        size="lg"
        className="mt-4"
        classNames={styles}
        {...userDetailsForm.getInputProps("email")}
      />
      <PasswordInput
        label="Enter your password"
        withAsterisk
        size="lg"
        className="mt-4"
        placeholder="Password"
        classNames={styles}
        {...userDetailsForm.getInputProps("password")}
      />

      <PasswordInput
        label="Confirm password"
        withAsterisk
        size="lg"
        className="my-4"
        placeholder="Password"
        classNames={styles}
        {...userDetailsForm.getInputProps("confirmPassword")}
      />

      <Button type="submit" className={styles.button} loading={signupLoading}>
        Submit
      </Button>

      {success && (
        <Notification color="green" mt="xl">
          Account created successfully
        </Notification>
      )}
      {errorMessage && (
        <Notification color="red" mt="xl" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Notification>
      )}
    </form>
  );
}
