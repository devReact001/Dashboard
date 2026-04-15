import SidebarClient from "./SidebarClient";
import "./Sidebar.scss";
import { fetchWithAuthServer } from "@/lib/api.server";

export type User = {
  id?: number;
  name: string;
};

export type Notification = {
  id: number;
  message: string;
};

export default async function Sidebar() {
  try {
    const [userRes, notifRes] = await Promise.all([
      fetchWithAuthServer(`/sidebar`),
      fetchWithAuthServer(`/sidebar/notifications`),
    ]);
    const user = userRes[0] || null;
    return (
      <SidebarClient user={user} notifications={notifRes} />
    );
  } catch (error) {
    console.error("Sidebar error:", error);
    return <div>Error loading sidebar</div>;
  }
}