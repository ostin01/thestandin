import { UserDetailsFormValidator } from "@/app/signup";
import { axiosInstance } from "@/lib/api";
import { getApiAccessToken, saveApiAccessToken } from "@/lib/secure-storage";
import { ApiResponse, User } from "@/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useSignup = ({
  successCallbBack,
  errorCallback,
}: {
  successCallbBack: (message: string) => void;
  errorCallback: (message: string) => void;
}) => {
  return useMutation({
    mutationFn: function (payload: UserDetailsFormValidator) {
      return axiosInstance.post("/api/auth/signup", payload);
    },

    onSuccess: async function (data: AxiosResponse<ApiResponse<unknown>>) {
      const accessToken = data.data.token;
      await saveApiAccessToken(accessToken);
      successCallbBack(data?.data?.message);
    },
    onError: function ({ response }: AxiosError<ApiResponse<unknown>>) {
      errorCallback(response?.data.error as string);
    },
  });
};

export const useLogin = ({
  successCallbBack,
  errorCallback,
}: {
  successCallbBack: (message: string) => void;
  errorCallback: (message: string) => void;
}) => {
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
};

export const useGetLoggedInUser = () => {
  return useQuery({
    queryKey: ["loggedInUser"],
    queryFn: async (): Promise<User> => {
      const authToken = await getApiAccessToken();
      const response = await axiosInstance.get("/api/auth/getme", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response?.data;
    },
  });
};

export const useUpdateUserDetails = (
  id: string,
  successHandler: (message: string) => void
) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const authToken = await getApiAccessToken();
      return axiosInstance.put(`/api/auth/update-profile/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data: AxiosResponse<ApiResponse<unknown>>) => {
      successHandler(data.data.message);
    },
    onError: ({ response }: AxiosError<ApiResponse<unknown>>) => {
      console.log(response?.data.message);
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => {
      const authToken = await getApiAccessToken();
      const response = await axiosInstance.get("/api/users", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response?.data;
    },
  });
};
