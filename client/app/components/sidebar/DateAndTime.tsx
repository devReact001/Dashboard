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
      Date : {date.toLocaleDateString()}
      <div className="item2-sidebar-in">
        Time : {date.toLocaleTimeString()}
      </div>
    </>
  );
}