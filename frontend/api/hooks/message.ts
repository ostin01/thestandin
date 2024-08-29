import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { AxiosError } from "axios";
import { ApiResponse } from "@/app/schema";
import Cookies from "js-cookie";
import { APP_TOKENS } from "@/app/schema/constants";

export function useSendMessage(id: string) {
  return useMutation({
    mutationFn: function (payload: any) {
      return axiosInstance.post(`/api/messages/send/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get(APP_TOKENS.AUTH_TOKEN)}`,
        },
      });
    },

    onError: function ({ response }: AxiosError<ApiResponse<unknown>>) {
      console.log(response?.data.message);
    },
  });
}
