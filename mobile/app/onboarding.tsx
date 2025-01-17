import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const userDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  bio: z.string().min(10, "Your bio must be at least 10 words"),
  role: z.string().min(3, "choose a role"),
  gender: z.string().min(3, "select your gender"),
});

export default function onboarding() {
  const router = useRouter();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const roles = ["client", "standin"];
  const gender = ["male", "female"];

  const { control } = useForm({
    defaultValues: {
      firsName: "",
      lastName: "",
      bio: "",
      role: roles[0],
      gender: [0],
    },
    resolver: zodResolver(userDetailsSchema),
  });

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView>
        <View className="items-center mt-5 ">
          <Text className="text-[30px] font-bold">Complete your profile</Text>
          <Text className="text-lg mt-2 text-center mx-[30px]">
            Add a profile photo, name and bio to let people know who you are
          </Text>
          <View className="w-[100] h-[100] rounded-full bg-gray-500 mt-4 relative">
            <Text className="text-white text-[50px] font-bold absolute right-0 mt-2">
              +
            </Text>
          </View>
        </View>
        <View className="mx-4 mt-4">
          <Text>First Name</Text>

          <Controller
            name="firsName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="rounded-lg bg-[#F6F8F6] border border-[#E9EDE9] mt-2 h-[56px]"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text className="mt-8">Last Name</Text>

          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="rounded-lg bg-[#F6F8F6] border border-[#E9EDE9] mt-2 h-[56px]"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text className="mt-8">Bio</Text>
          <Controller
            name="bio"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="rounded-lg bg-[#F6F8F6] border border-[#E9EDE9] h-[191px] py-5 px-[22px] align-top placeholder:text-lg"
                placeholder="Tell us about you"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text className="mt-8">Gender</Text>

          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View className="bg-[#F6F8F6] mb-3 rounded-lg h-[56px]">
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                >
                  {gender.map((gen) => (
                    <Picker.Item key={gen} label={gen} value={gen} />
                  ))}
                </Picker>
              </View>
            )}
          />
          <View>
            <Text className="mt-8 text-lg font-bold">Role</Text>
            <Text>Sign up as a client or a standin</Text>
          </View>

          <Controller
            name="role"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View className="bg-[#F6F8F6] mb-3 rounded-lg h-[56px]">
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                >
                  {roles.map((role) => (
                    <Picker.Item key={role} label={role} value={role} />
                  ))}
                </Picker>
              </View>
            )}
          />

          <TouchableOpacity className="w-full bg-black mx-auto rounded-lg py-5 px-8 my-5">
            <Text className="text-white text-center">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
