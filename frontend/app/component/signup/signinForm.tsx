"use client";
import styles from "@/app/styles/inputstyles.module.css";
import { z } from "zod";
import { useLogin } from "@/api/hooks/authentication";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginFormValidator = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(3, "Password should contain at least 8 characters"),
});

export default function SigninForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { mutate: login, isPending: signin } = useLogin({
    successCallbBack: handleSuccess,
    errorCallback: handleError,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormValidator),
  });

  function handleSuccess(message: string) {
    setSuccessMessage(message);
    setTimeout(() => {
      location.pathname = "/";
    }, 2000);
  }

  function handleError(message: string) {
    setResponseMessage(message);
    setTimeout(() => setResponseMessage(""), 3000);
  }

  function onSubmit(values: z.infer<typeof loginFormValidator>) {
    login(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <div className="flex justify-center mt-4">
        <button type="submit" className={`${styles.button} text-white`}>
          {signin ? "Signing in..." : "Sign in"}
        </button>
      </div>
      {successMessage && (
        <span className="text-green-600">{successMessage}</span>
      )}

      {responseMessage && (
        <span className="text-red-600">{responseMessage}</span>
      )}
    </form>
  );
}
