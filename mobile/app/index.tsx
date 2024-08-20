import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function App() {
  const [text, setText] = useState("");
  return (
    <View>
      <Text className="mt-4">The Standin</Text>
      <View className="items-center justify-center mt-8 mb-4">
        <Text className="text-[30px] font-medium">Create your account</Text>

        <TextInput
          placeholder="Name"
          value={text}
          onChangeText={setText}
          className="placeholder:text-green-500 text-4xl bg-black"
        />
      </View>
    </View>
  );
}
