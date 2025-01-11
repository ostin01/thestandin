import { Link, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
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
        <TextInput className="border border-gray-300 rounded-lg p-2 mt-2 h-[56px]" />
        <Text className="mt-4">Password</Text>
        <TextInput className="border border-gray-300 rounded-lg p-2 mt-2 h-[56px]" />
        <TouchableOpacity className="max-w-[342px] bg-black mx-auto rounded-lg py-5 px-8 mt-5">
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
