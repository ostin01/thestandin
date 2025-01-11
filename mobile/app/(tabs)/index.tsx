import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-blue-800 text-[40px] text-center">The standin</Text>
      <Link href="/signup" className=" text-center">
        Signup page
      </Link>
      <Link href="/login" className=" text-center">
        Login page
      </Link>
    </View>
  );
}
