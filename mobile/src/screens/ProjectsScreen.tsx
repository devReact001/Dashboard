import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { fetchWithAuth } from "@/src/services/api";

type Project = {
  id: number;
  name?: string;
  description?: string;
  status?: string;
  owner?: string;
};

export default function ProjectsScreen() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchWithAuth("/api/projects")
      .then((res) => res.json())
      .then((json) => {
        console.log("PROJECT API:", json);

        // ✅ handle both formats
        if (Array.isArray(json)) {
          setData(json);
        } else if (json.data) {
          setData(json.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error("Projects API Error:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 20 }}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/project/[id]",
              params: { id: item.id.toString() },
            })
          }
        >
          <View
            style={{
              backgroundColor: "#1e293b",
              padding: 15,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            {/* Name */}
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              {item?.name || "No Name"}
            </Text>

            {/* Description */}
            <Text style={{ color: "#94a3b8", marginTop: 5 }}>
              {item?.description || "No description"}
            </Text>

            {/* Status */}
            <Text
              style={{
                marginTop: 8,
                color:
                  item?.status === "Active"
                    ? "#22c55e"
                    : item?.status === "Completed"
                    ? "#3b82f6"
                    : "#f59e0b",
              }}
            >
              {item?.status || "Unknown"}
            </Text>

            {/* Owner */}
            {item?.owner && (
              <Text style={{ color: "#94a3b8", marginTop: 5 }}>
                Owner: {item.owner}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={{ color: "#94a3b8", textAlign: "center" }}>
          No projects found
        </Text>
      }
    />
  );
}