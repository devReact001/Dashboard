"use client";

import type { Stats } from "./Information";
import "./Information.scss";

interface Props {
  stats: Stats;
}

export default function InformationClient({ stats }: Props) {
  return (
    <div className="grid-container-in">
      <div className="item1-in">
        <p className="stat-label">Active Users</p>
        <span className="stat-value">
          {stats?.active_users?.toLocaleString() ?? "-"}
        </span>
      </div>

      <div className="item2-in">
        <p className="stat-label">Total Users</p>
        <span className="stat-value">
          {stats?.total_users ?? "-"}
        </span>
      </div>

      <div className="item3-in">
        <p className="stat-label">Applications</p>
        <span className="stat-value">
          {stats?.applications?.toLocaleString() ?? "-"}
        </span>
      </div>
    </div>
  );
}