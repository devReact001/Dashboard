import { useEffect, useState } from "react";
import API_BASE from "../config/api";
import DateAndTime from "./DateAndTime";
import "./Sidebar.css";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const res = await fetch(`${API_BASE}/sidebar`);
        const data = await res.json();
        console.log(data);
        setUser(data[0]); // assuming one user

        const notifRes = await fetch(`${API_BASE}/sidebar/notifications`);
        const notifData = await notifRes.json();
        console.log(notifData);
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
              <li key={obj?.id}>{obj?.message}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
