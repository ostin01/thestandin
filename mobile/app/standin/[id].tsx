import { useGetAllUsers } from "@/api/authentication/authentication";
import { User } from "@/schema";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View, Text, StatusBar, ActivityIndicator, Image } from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { data: standins, isLoading } = useGetAllUsers();
  const standinDetails = standins?.find((standin: User) => standin?._id === id);

  return (
    <View className="bg-white flex-1">
      <StatusBar barStyle="light-content" />
      <View className="w-full h-[400px] bg-slate-500"></View>

      {/* <Image
        source={{ uri: standinDetails?.profilePhoto }}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
        }}
      /> */}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text className="text-[20px] mt-7">
            {`${standinDetails?.firstName} ${standinDetails?.lastName}`}
          </Text>
          <Text className="">{standinDetails?.bio}</Text>
        </View>
      )}
    </View>
  );
}
