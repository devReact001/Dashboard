import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/src/services/api";

export default function CandidateDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter(); // 👈 added

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth(`/api/candidates/${id}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  if (!data) {
    return <Text style={{ color: "white" }}>No data</Text>;
  }

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      
      {/* 🔙 Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 15 }}>
        <Text style={{ color: "#3b82f6", fontSize: 16 }}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={{ color: "black", fontSize: 22, fontWeight: "bold" }}>
        {data.first_name} {data.last_name}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Email: {data.email}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Status: {data.status || "Active"}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Phone: {data.phone}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Experience: {data.experience} years
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Skills: {data.skills}
      </Text>
    </View>
  );
}