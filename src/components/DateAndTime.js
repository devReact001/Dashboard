import { useEffect, useState } from "react";
import "./Sidebar.css";

export default function DateAndTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <>
      Date : {date.toLocaleDateString()}
      <div className="item2-sidebar-in">Time : {date.toLocaleTimeString()}</div>
    </>
  );
}
