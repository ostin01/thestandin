"use client";
import { Button, Notification, PasswordInput, TextInput } from "@mantine/core";
import styles from "@/app/styles/inputstyles.module.css";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useLogin } from "@/api/hooks/authentication";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const loginFormValidator = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(3, "Password should contain at least 8 characters"),
});

export default function SigninForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();
  const { mutate: login, isPending: signin } = useLogin({
    successCallbBack: handleSuccess,
    errorCallback: handleError,
  });
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginFormValidator),
  });

  function handleSuccess(message: string) {
    setSuccessMessage(message);
    setTimeout(() => {
      router.push("/onboarding");
    }, 2000);
  }

  function handleError(message: string) {
    setResponseMessage(message);
    setTimeout(() => setResponseMessage(""), 3000);
  }

  function handleSubmit(values: z.infer<typeof loginFormValidator>) {
    login(values);
  }

  return (
    <form onSubmit={loginForm.onSubmit(handleSubmit)}>
      <TextInput
        label="Email"
        placeholder="Enter your email"
        withAsterisk
        size="lg"
        className="mt-4"
        classNames={styles}
        {...loginForm.getInputProps("email")}
      />
      <PasswordInput
        label="Enter your password"
        withAsterisk
        size="lg"
        className="mt-4"
        placeholder="Password"
        classNames={styles}
        {...loginForm.getInputProps("password")}
      />

      <Button type="submit" className={styles.button} mt={20} loading={signin}>
        Submit
      </Button>

      {successMessage && (
        <Notification color="green" withCloseButton={false}>
          {responseMessage}
        </Notification>
      )}

      {responseMessage && (
        <Notification color="red" withCloseButton={false}>
          {responseMessage}
        </Notification>
      )}
    </form>
  );
}
