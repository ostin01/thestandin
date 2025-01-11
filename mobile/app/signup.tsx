import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerUserSchema = z
  .object({
    firstName: z.string().min(1, "Enter first name"),
    lastName: z.string().min(1, "Enter last name"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .min(11, "Phone number should contain at least 11 numbers"),
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
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { register } = useForm<z.infer<typeof registerUserSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerUserSchema),
  });

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
          <TextInput className="border border-gray-300 rounded-lg p-2 mt-2 h-[56px]" />
          <Text className="mt-4">Password</Text>
          <TextInput className="border border-gray-300 rounded-lg p-2 mt-2 h-[56px]" />
          <Text className="mt-4">Confirm Password</Text>
          <TextInput className="border border-gray-300 rounded-lg p-2 mt-2 h-[56px]" />
          <TouchableOpacity className="max-w-[342px] bg-black mx-auto rounded-lg py-5 px-8 mt-5">
            <Text className="text-white text-center">Continue</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center mt-4 text-lg">
          Already have an account ?{" "}
          <Link href="/login" className="text-blue-600">
            Log in
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
