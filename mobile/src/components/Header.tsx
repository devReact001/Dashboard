import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type User = {
  id?: number;
  name: string;
};

type Notification = {
  id: number;
  message: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dateTime, setDateTime] = useState("");

  const router = useRouter(); // 👈 added

  // 🔥 Logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/login" as any);
  };

  // 🔥 Fetch API
  useEffect(() => {
    fetchWithAuth("/api/sidebar")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));

    fetchWithAuth("/api/sidebar/notifications")
      .then((res) => res.json())
      .then(setNotifications);
  }, []);

  // 🔥 Date + Time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(
        `${now.toLocaleDateString()} • ${now.toLocaleTimeString()}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ marginBottom: 20 }}>
      
      {/* Top Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Username */}
        <View>
          <Text style={{ color: "blue", fontSize: 12 }}>
            Welcome back
          </Text>

          <Text style={{ color: "orange", fontSize: 18, fontWeight: "bold" }}>
            {user?.name || "User"}
          </Text>
        </View>

        {/* Right Side (Notification + Logout) */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          
          {/* Notification */}
          <View style={{ position: "relative" }}>
            <Text style={{ fontSize: 20 }}>🔔</Text>

            {notifications.length > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  backgroundColor: "#ef4444",
                  borderRadius: 10,
                  paddingHorizontal: 5,
                }}
              >
                <Text style={{ color: "white", fontSize: 10 }}>
                  {notifications.length}
                </Text>
              </View>
            )}
          </View>

          {/* 🔥 Logout */}
          <TouchableOpacity onPress={handleLogout}>
            <Text style={{ color: "#ef4444", fontWeight: "bold" }}>
              Logout
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* Date + Time */}
      <Text style={{ color: "#94a3b8", marginTop: 5 }}>
        {dateTime}
      </Text>
    </View>
  );
}