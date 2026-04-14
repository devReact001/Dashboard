import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/src/services/api";

export default function ProjectDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter(); // 👈 added

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = Array.isArray(id) ? id[0] : id;

    fetchWithAuth(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  if (!data) return <Text style={{ color: "white" }}>No data</Text>;

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      
      {/* 🔙 Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 15 }}>
        <Text style={{ color: "#3b82f6", fontSize: 16 }}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={{ color: "black", fontSize: 22, fontWeight: "bold" }}>
        {data.name}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        {data.description}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Status: {data.status}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Owner: {data.owner}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Team Size: {data.team_size}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Tech: {data.tech_stack}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Deadline: {data.deadline}
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10 }}>
        Budget: ${data.budget}
      </Text>
    </View>
  );
}