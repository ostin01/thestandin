import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function Notification({
  text,
  type,
}: {
  text: string;
  type: "error" | "success";
}) {
  return (
    <View
      className={`absolute left-0 right-0 ${
        type === "success" ? " top-0" : "bottom-[20px]"
      }`}
    >
      {text &&
        (type === "success" ? (
          <View className="border border-blue-800 bg-blue-100 p-4 mx-4 rounded-lg h-[65px] flex-row gap-4 items-center">
            <View className="bg-blue-800 rounded-full p-2">
              <FontAwesome name="check" size={10} color="#dbeafe" />
            </View>
            <Text className="text-center text-lg">{text}</Text>
          </View>
        ) : (
          <Text
            style={{
              backgroundColor: "#f8d7da",
              color: "red",
              textAlign: "center",
              padding: 10,
              fontSize: 16,
              borderRadius: 8,
              marginHorizontal: "auto",
              width: "90%",
            }}
          >
            {text}
          </Text>
        ))}
    </View>
  );
}
