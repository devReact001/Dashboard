import { Text, ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import StatCard from "../../src/components/StatCard";
import StatsChart from "../../src/components/StatsChart";
import Header from "../../src/components/Header";
import AreaChart from "../../src/components/AreaChart";
import DoughnutChart from "../../src/components/DoughnutChart";
import PieChart from "../../src/components/PieChart";
import LineChartRN from "../../src/components/LineChart";
import { fetchWithAuth } from "@/src/services/api";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [doughnutData, setDoughnutData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [officeData, setOfficeData] = useState([]);
  const [loungeData, setLoungeData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchWithAuth("/api/sensor/office"),
      fetchWithAuth("/api/sensor/lounge"),
    ])
      .then(async ([officeRes, loungeRes]) => {
        const office = await officeRes.json();
        const lounge = await loungeRes.json();

        setOfficeData(office);
        setLoungeData(lounge);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchWithAuth("/api/charts/pie")
      .then((res) => res.json())
      .then((data) => {
        console.log("PIE DATA:", data);
        setPieData(data);
      })
      .catch((err) => console.error("Pie API error:", err));
  }, []);

  useEffect(() => {
    fetchWithAuth("/api/charts/doughnut")
      .then((res) => res.json())
      .then(setDoughnutData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchWithAuth("/api/charts/area")
      .then((res) => res.json())
      .then(setAreaData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchWithAuth("/api/charts/bar")
      .then((res) => res.json())
      .then((json) => setChartData(json))
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log("Dashboard mounted"); // debug
    fetchWithAuth("/api/dashboard/stats")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Header />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Dashboard
      </Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (
        <>
          <StatCard title="Active Users" value={data?.active_users || 0} />
          <StatCard title="Total Users" value={data?.total_users || 0} />
          <StatCard title="Applications" value={data?.applications || 0} />
          <LineChartRN officeData={officeData} loungeData={loungeData} />
          <PieChart data={pieData} />
          <StatsChart data={chartData} />
          <AreaChart data={areaData} />
          <DoughnutChart data={doughnutData} />
          
        </>
      )}
    </ScrollView>
  );
}
