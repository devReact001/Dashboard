"use client";

import { useEffect, useState } from "react";
import "./Sidebar.scss";

export default function DateAndTime(): JSX.Element {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setDate(new Date());

    updateTime(); // set immediately on client

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!date) return <div></div>; // prevent hydration mismatch

  return (
    <>
      <span className="date-label">
        {date.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
      </span>
      <div className="item2-sidebar-in">
        {date.toLocaleTimeString()}
      </div>
    </>
  );
}