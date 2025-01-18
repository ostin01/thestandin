import { Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "react-native";

interface FilePickerProps {
  setFile: (file: { name: string; type: string; uri: string }) => void;
  file?: { name: string; type: string; uri: string };
}

export default function FilePicker({ setFile, file }: FilePickerProps) {
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: false,
      });

      if (result) {
        result.assets?.map((res) =>
          setFile({
            name: res.name,
            type: res.mimeType as string,
            uri: res.uri,
          })
        );
      } else {
        console.log("Document picking canceled");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <TouchableOpacity onPress={pickDocument}>
      {file?.uri ? (
        <Image
          source={{ uri: file?.uri }}
          style={{
            width: 100,
            height: 100,
            marginTop: 20,
            borderRadius: 100,
          }}
        />
      ) : (
        <View className="w-[100] h-[100] rounded-full bg-gray-500 mt-4 relative">
          <Text className="text-white text-[50px] font-bold absolute right-0 mt-2">
            +
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
