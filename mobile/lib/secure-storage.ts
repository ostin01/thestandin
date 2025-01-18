import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "api_access_token";

export const saveApiAccessToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    console.log("Token saved securely");
  } catch (error) {
    console.error("Error saving token", error);
  }
};

export const getApiAccessToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (token) {
      console.log("Token retrieved securely");
      return token;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};

export const deleteApiAccessToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    console.log("Token deleted securely");
  } catch (error) {
    console.error("Error deleting token", error);
  }
};
