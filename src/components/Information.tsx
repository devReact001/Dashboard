import { useEffect, useState } from "react";
import API_BASE from "../config/api";
import "./Information.scss";

type Stats = {
  active_users: number;
  total_users: number;
  applications: number;
};

export default function Information(): JSX.Element {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/dashboard/stats`);
        const data: Stats = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Stats API error:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid-container-in">
      <div className="item1-in">
        Active Users
        <div className="item1-in-numbers">
          {stats?.active_users ?? "-"}
        </div>
      </div>

      <div className="item2-in">
        Total Users
        <div className="item2-in-numbers">
          {stats?.total_users ?? "-"}
        </div>
      </div>

      <div className="item3-in">
        Applications
        <div className="item3-in-numbers">
          {stats?.applications ?? "-"}
        </div>
      </div>
    </div>
  );
}