import { Link, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/authentication/authentication";

export const loginFormValidator = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(3, "Password should contain at least 8 characters"),
});

export default function Login() {
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [successMessage, setSuccessMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { mutate: login, isPending: signin } = useLogin({
    successCallbBack: handleSuccess,
    errorCallback: handleError,
  });

  const {
    control,
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
      router.replace("/");
    }, 2000);
  }

  function handleError(message: string) {
    setResponseMessage(message);
    setTimeout(() => setResponseMessage(""), 3000);
  }

  function onSubmit(values: z.infer<typeof loginFormValidator>) {
    login(values);
  }
  console.log(successMessage);
  console.log(responseMessage);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className=" mx-4 flex-1 justify-center">
        <Text className="text-[60px] font-extrabold text-center">
          The Standin
        </Text>

        <Text className="text-center text-[20px] font-semibold mt-2">
          Login to your account
        </Text>

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

        <TouchableOpacity
          className="max-w-[342px] bg-black mx-auto rounded-lg py-5 px-8 mt-5"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center">Continue</Text>
        </TouchableOpacity>

        <Text className="text-center mt-4 text-lg">
          Don't have an account ?{" "}
          <Link href="/signup" className="text-blue-600">
            Signup
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
