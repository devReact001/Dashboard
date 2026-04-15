import InformationClient from "./InformationClient";
import "./Information.scss";
import { fetchWithAuthServer } from "@/lib/api.server";

export type Stats = {
  active_users: number;
  total_users: number;
  applications: number;
};

export default async function Information() {
  try {
    const stats: Stats = await fetchWithAuthServer(`/dashboard/stats`);

    return <InformationClient stats={stats} />;
  } catch (error) {
    console.error("Stats API error:", error);
    return <div>Error loading stats</div>;
  }
}