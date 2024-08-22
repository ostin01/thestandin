import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "..";
import { UserDetailsFormValidator } from "@/app/component/signup/signupForm";

export function useSignup() {
  return useMutation({
    mutationFn: function (payload: UserDetailsFormValidator) {
      return axiosInstance.post("/api/auth/signup", payload);
    },
    onSuccess: function (data) {
      console.log(data);
    },
    onError: function (data) {
      console.log(data.message);
    },
  });
}
