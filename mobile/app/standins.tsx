import { useGetAllUsers } from "@/api/authentication/authentication";
import { Link, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function standins() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { data, isLoading } = useGetAllUsers();

  const renderItem = ({ item }: { item: any }) => (
    <Link
      href={{
        pathname: "/standin/[id]",
        params: { id: item._id },
      }}
      className="px-4 mt-6"
    >
      <View className="mx-4 flex-row justify-between items-center mt-[30px]">
        {!item.profilePhoto ? (
          <View className="w-[60px] h-[60px] rounded-full bg-green-500"></View>
        ) : (
          <Image
            source={{ uri: item?.profilePhoto }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
            }}
          />
        )}

        <View className="flex-1 ml-4">
          <Text className="font-bold text-lg">{`${item.firstName} ${item.lastName}`}</Text>
          <Text className="text-ellipsis" style={{ width: 300 }}>
            {item.bio}
          </Text>
        </View>
      </View>
    </Link>
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-[30px] font-bold text-center">
        Connect with a standin
      </Text>
      <Text className="text-lg mt-2 text-center mx-[30px]">
        Click on a standin to see their profile
      </Text>
      {isLoading ? (
        <ActivityIndicator color="black" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}
