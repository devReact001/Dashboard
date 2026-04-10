import { useEffect, useState } from "react";
import API_BASE from "../config/api";
import DateAndTime from "./DateAndTime";
import "./Sidebar.scss";

type User = {
  id?: number;
  name: string;
};

type Notification = {
  id: number;
  message: string;
};

export default function Sidebar(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const res = await fetch(`${API_BASE}/sidebar`);
        const data: User[] = await res.json();

        setUser(data[0]); // assuming one user

        const notifRes = await fetch(
          `${API_BASE}/sidebar/notifications`
        );
        const notifData: Notification[] = await notifRes.json();

        setNotifications(notifData);
      } catch (err) {
        console.error("Sidebar error:", err);
      }
    };

    fetchSidebar();
  }, []);

  return (
    <div className="grid-container-sidebar">
      <div className="item1-sidebar">
        Welcome User
        <div className="item1-sidebar-in">{user?.name}</div>
      </div>

      <div className="item2-sidebar">
        <DateAndTime />
      </div>

      <div className="item3-sidebar">
        Notifications
        <div className="item3-sidebar-in">
          <ol>
            {notifications.map((obj) => (
              <li key={obj.id}>{obj.message}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}