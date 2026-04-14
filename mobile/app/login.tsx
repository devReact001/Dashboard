import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "http://192.168.0.101:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const json = await res.json();

      if (json.token) {
        // ✅ Save token
        await AsyncStorage.setItem("token", json.token);

        // ✅ Go to app
        router.replace("/(tabs)");
      } else {
        Alert.alert("Login failed", json.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#020617",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "white",
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Admin Login
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      {/* Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#2563eb",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}