import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "@/authentication/authentication";

const registerUserSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password should contain at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password should contain at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const router = useRouter();
  const navigation = useNavigation();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function handleError(message: string) {
    setErrorMessage(message);
  }

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerUserSchema>>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerUserSchema),
  });

  const { mutate: signup, isPending: signupLoading } = useSignup({
    successCallbBack: handleSuccess,
    errorCallback: handleError,
  });
  function handleSuccess() {
    setSuccess(true);
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  }
  const onSubmit = (data: z.infer<typeof registerUserSchema>) => {
    signup(data);
  };

  // console.log(success);
  // console.log(errorMessage);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center">
        <Text className="text-[60px] font-extrabold text-center">
          The Standin
        </Text>

        <Text className="text-center text-[20px] font-semibold mt-2">
          Create your account
        </Text>

        <View className="mx-4">
          <Text className="mt-8">Email</Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mt-2 h-[56px]"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}

          <Text className="mt-4">Password</Text>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mt-2 h-[56px]"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {errors.password && (
            <Text className="text-red-500">{errors.password.message}</Text>
          )}

          <Text className="mt-4">Confirm Password</Text>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mt-2 h-[56px]"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500">
              {errors.confirmPassword.message}
            </Text>
          )}

          <TouchableOpacity
            className="max-w-[342px] bg-black mx-auto rounded-lg py-5 px-8 mt-5"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center">
              {signupLoading ? "Loading..." : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center mt-4 text-lg">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            sign in
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
