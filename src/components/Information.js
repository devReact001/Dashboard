import { useEffect, useState } from "react";
import API_BASE from "../config/api";
import "./Information.css";

export default function Information() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/dashboard/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);
  return (
    <div className="grid-container-in">
      <div className="item1-in">
        Active Users
        <div className="item1-in-numbers">{stats?.active_users}</div>
      </div>
      <div className="item2-in">
        Total Users<div className="item2-in-numbers">{stats?.total_users}</div>
      </div>
      <div className="item3-in">
        Applications
        <div className="item3-in-numbers">{stats?.applications}</div>
      </div>
    </div>
  );
}
