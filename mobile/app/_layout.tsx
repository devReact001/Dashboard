import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem("token");

      // wait a tick to ensure navigation is mounted
      setTimeout(() => {
        if (!token) {
          router.replace("/login" as any);
        } else {
          router.replace("/(tabs)" as any);
        }
      }, 0);

      setReady(true);
    };

    init();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}