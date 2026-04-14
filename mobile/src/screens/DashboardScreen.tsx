import { Text, ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import Header from "../components/Header";
import { fetchWithAuth } from "@/src/services/api";

export default function DashboardScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchWithAuth("/api/charts/bar")
      .then((res) => res.json())
      .then((json) => setChartData(json))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchWithAuth("/api/dashboard/stats")
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Header />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Dashboard
      </Text>

      <StatCard title="Active Users" value={data.active_users} />
      <StatCard title="Total Users" value={data.total_users} />
      <StatCard title="Applications" value={data.applications} />
    </ScrollView>
  );
}
