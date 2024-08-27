import { useMutation } from "@tanstack/react-query";
import { UserDetailsFormValidator } from "@/app/component/signup/signupForm";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, Login } from "@/app/schema";
import { axiosInstance } from "..";
import Cookies from "js-cookie";
import { APP_TOKENS } from "@/app/schema/constants";

export function useSignup({
  successCallbBack,
  errorCallback,
}: {
  successCallbBack: () => void;
  errorCallback: (message: string) => void;
}) {
  return useMutation({
    mutationFn: function (payload: UserDetailsFormValidator) {
      return axiosInstance.post("/api/auth/signup", payload);
    },
    onSuccess: function (data: AxiosResponse<ApiResponse<unknown>>) {
      const accessToken = data.data.token;
      Cookies.set(APP_TOKENS.AUTH_TOKEN, accessToken);
      successCallbBack();
    },
    onError: function ({ response }: AxiosError<ApiResponse<unknown>>) {
      errorCallback(response?.data.error as string);
    },
  });
}

export function useLogin({
  successCallbBack,
  errorCallback,
}: {
  successCallbBack: (message: string) => void;
  errorCallback: (message: string) => void;
}) {
  return useMutation({
    mutationFn: function (payload: Login) {
      return axiosInstance.post("/api/auth/login", payload);
    },
    onSuccess: function (data: AxiosResponse<ApiResponse<unknown>>) {
      const accessToken = data.data.token;
      Cookies.set(APP_TOKENS.AUTH_TOKEN, accessToken);
      successCallbBack(data.data.message);
    },
    onError: function ({ response }: AxiosError<ApiResponse<unknown>>) {
      errorCallback(response?.data.message as string);
    },
  });
}
