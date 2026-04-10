import { useEffect, useState } from "react";
import "./Sidebar.scss";

export default function DateAndTime(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      Date : {date.toLocaleDateString()}
      <div className="item2-sidebar-in">
        Time : {date.toLocaleTimeString()}
      </div>
    </>
  );
}