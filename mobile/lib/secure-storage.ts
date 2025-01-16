import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "api_access_token";

export const saveApiAccessToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
    console.log("Token saved securely");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getApiAccessToken = async (): Promise<string | null> => {
  try {
    // Retrieve the token from SecureStore
    const token = await SecureStore.getItemAsync("ACCESS_TOKEN");
    if (token) {
      console.log("Token retrieved securely");
      return token; // Return the token
    } else {
      console.log("No token found");
      return null; // No token found in SecureStore
    }
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};

export const deleteApiAccessToken = async (): Promise<void> => {
  try {
    // Remove the token from SecureStore
    await SecureStore.deleteItemAsync("ACCESS_TOKEN");
    console.log("Token deleted securely");
  } catch (error) {
    console.error("Error deleting token", error);
  }
};

/**
 * Example usage of saving, retrieving, and deleting the token
 */
// const exampleUsage = async () => {
//   // Save a token
//   await saveToken('your-access-token-here');

//   // Retrieve the token
//   const token = await getToken();
//   console.log('Retrieved Token:', token);

//   // Delete the token
//   await deleteToken();
// };

// exampleUsage();
