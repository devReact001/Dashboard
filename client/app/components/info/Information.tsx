import InformationClient from "./InformationClient";
import "./Information.scss";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export type Stats = {
  active_users: number;
  total_users: number;
  applications: number;
};

export default async function Information() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`, {
      cache: "no-store",
    });

    const stats: Stats = await res.json();

    return <InformationClient stats={stats} />;
  } catch (error) {
    console.error("Stats API error:", error);
    return <div>Error loading stats</div>;
  }
}