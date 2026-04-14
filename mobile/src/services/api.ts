import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export const fetchWithAuth = async (endpoint: string) => {
  const token = await AsyncStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.log("API ERROR:", text);
    throw new Error("API failed");
  }

  return res; // ✅ return parsed JSON
};