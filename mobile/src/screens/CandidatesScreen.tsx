import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { fetchWithAuth } from "@/src/services/api";

const router = useRouter();

type Candidate = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export default function CandidatesScreen() {
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = async (pageNumber: number) => {
    try {
      const res = await fetchWithAuth(
        `/api/candidates?page=${pageNumber}&limit=5`,
      );

      const json = await res.json();

      setData((prev) => {
        if (pageNumber === 1) return json.data;

        // 🔥 Merge without duplicates using ID
        const existingIds = new Set(prev.map((item) => item.id));

        const newUnique = json.data.filter(
          (item: Candidate) => !existingIds.has(item.id),
        );

        return [...prev, ...newUnique];
      });

      setTotalPages(json.totalPages);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 🔥 Safe search
  const filteredData = data.filter((item) => {
    const fullName = `${item.first_name || ""} ${
      item.last_name || ""
    }`.toLowerCase();

    return fullName.includes(search.toLowerCase());
  });

  if (loading && page === 1) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 20 }}
      data={filteredData}
      // ✅ USE BACKEND ID (clean)
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <TextInput
          placeholder="Search candidates..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/candidate/[id]",
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
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {item.first_name} {item.last_name}
            </Text>

            <Text style={{ color: "#94a3b8" }}>{item.email}</Text>
          </View>
        </TouchableOpacity>
      )}
      ListFooterComponent={
        page < totalPages ? (
          <TouchableOpacity
            onPress={() => setPage((prev) => prev + 1)}
            style={{
              backgroundColor: "#2563eb",
              padding: 12,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              {loading ? "Loading..." : "Load More"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "#94a3b8",
              marginTop: 10,
            }}
          >
            No more candidates
          </Text>
        )
      }
    />
  );
}
