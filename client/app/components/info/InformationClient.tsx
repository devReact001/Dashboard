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