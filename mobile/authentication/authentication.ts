import { axiosInstance } from "@/lib/api";
import { saveApiAccessToken } from "@/lib/secure-storage";
import { ApiResponse } from "@/schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export function useSignup({
  successCallbBack,
  errorCallback,
}: {
  successCallbBack: () => void;
  errorCallback: (message: string) => void;
}) {
  return useMutation({
    mutationFn: function (payload: {
      email: string;
      password: string;
      confirmPassword: string;
    }) {
      return axiosInstance.post("/api/auth/signup", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    onSuccess: async function (data: AxiosResponse<ApiResponse<unknown>>) {
      const accessToken = data.data.token;
      await saveApiAccessToken(accessToken);
      successCallbBack();
    },
    onError: function (
      { response }: AxiosError<ApiResponse<unknown>>,
      payload
    ) {
      console.log(response?.data);
      errorCallback(response?.data.message as string);
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
    mutationFn: function (payload: { email: string; password: string }) {
      return axiosInstance.post("/api/auth/login", payload);
    },
    onSuccess: async function (data: AxiosResponse<ApiResponse<unknown>>) {
      const accessToken = data.data.token;
      await saveApiAccessToken(accessToken);
      successCallbBack(data.data.message);
    },
    onError: function ({ response }: AxiosError<ApiResponse<unknown>>) {
      errorCallback(response?.data.message as string);
    },
  });
}
