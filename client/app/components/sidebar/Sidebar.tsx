import SidebarClient from "./SidebarClient";
import "./Sidebar.scss";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

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
      fetch(`${API_BASE}/sidebar`, { cache: "no-store" }),
      fetch(`${API_BASE}/sidebar/notifications`, {
        cache: "no-store",
      }),
    ]);

    const users: User[] = await userRes.json();
    const notifications: Notification[] = await notifRes.json();

    const user = users[0] || null;

    return (
      <SidebarClient user={user} notifications={notifications} />
    );
  } catch (error) {
    console.error("Sidebar error:", error);
    return <div>Error loading sidebar</div>;
  }
}