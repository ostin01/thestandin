"use client";
import { Notification } from "@mantine/core";
import { z } from "zod";
import styles from "@/app/styles/inputstyles.module.css";
import { useSignup } from "@/api/hooks/authentication";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const userDetailsFormValidator = z
  .object({
    firstName: z.string().min(3, "Enter first name"),
    lastName: z.string().min(3, "Enter last name"),
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
  function handleError(message: string) {
    setErrorMessage(message);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userDetailsFormValidator>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(userDetailsFormValidator),
  });

  function handleSuccess() {
    setSuccess(true);
    setTimeout(() => {
      location.pathname = "/";
    }, 2000);
  }
  const { mutate: signup, isPending: signupLoading } = useSignup({
    successCallbBack: handleSuccess,
    errorCallback: handleError,
  });

  function onSubmit(values: z.infer<typeof userDetailsFormValidator>) {
    signup(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="grid md:grid-cols-2 gap-6 mt-4 ">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="border border-gray-300 rounded-lg p-2 mt-2"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm font-semibold">
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              className="border border-gray-300 rounded-lg p-2 mt-2"
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full mt-4">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-lg p-2 mt-2"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-lg p-2 mt-2"
            {...register("password")}
          />
        </div>

        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}

        <div className="flex flex-col w-full mt-4">
          <label htmlFor="confirmPassword" className="text-sm font-semibold">
            Confirm Password
          </label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="border border-gray-300 rounded-lg p-2 mt-2"
          />
        </div>

        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
        <div className="flex justify-center mt-4">
          <button type="submit" className={`${styles.button} text-white`}>
            {signupLoading ? "Loading..." : "Submit"}
          </button>
        </div>

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
      </div>
    </form>
  );
}
