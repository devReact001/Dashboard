"use client";

import { useRouter } from "next/navigation";
import DateAndTime from "./DateAndTime";
import type { User, Notification } from "./Sidebar";
import "./Sidebar.scss";

interface Props {
  user: User | null;
  notifications: Notification[];
}

export default function SidebarClient({
  user,
  notifications,
}: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <div className="grid-container-sidebar">
      <div className="item1-sidebar">
        <span className="welcome-label">Welcome User</span>
        <div className="item1-sidebar-in">{user?.name}</div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="item2-sidebar">
        <DateAndTime />
      </div>

      <div className="item3-sidebar">
        <span className="notifications-title">Notifications</span>
        <div className="item3-sidebar-in">
          <ul>
            {notifications.map((obj) => (
              <li key={obj.id}>{obj.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}