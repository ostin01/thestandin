import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-[40px] font-semibold">TheStandin</Text>

      <Link
        href="/details"
        className="bg-black rounded-lg py-2 px-4 text-white mt-4"
      >
        Got to details page
      </Link>

      <Link
        href="/signup"
        className="bg-black rounded-lg py-2 px-4 text-white mt-4"
      >
        Got to details page
      </Link>

      <Link
        href="/signin"
        className="bg-black rounded-lg py-2 px-4 text-white mt-4"
      >
        Got to details page
      </Link>
    </View>
  );
}
