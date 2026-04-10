import "./Layout.scss";

// ✅ Normal imports
import Sidebar from "../components/sidebar/Sidebar";
import Information from "../components/info/Information";
import PaginationTable from "../components/table/PaginationTable";

import AreaChart from "../components/charts/area/AreaChart";
import LineChart from "../components/charts/line/LineChart";

import BarChart from "../components/charts/bar/BarChart";

import DoughnutChart from "../components/charts/doughnut/DoughnutChart";
import PieChart from "../components/charts/pie/PieChart";

export default function Layout() {
  return (
    <div className="grid-container">
      <div className="item1">
        <Sidebar />
      </div>

      <div className="item2">
        <Information />
      </div>

      <div className="item4">
        <AreaChart />
      </div>

      <div className="item3">
        <PaginationTable />
      </div>

      <div className="item6">
        <LineChart />
      </div>

      <div className="item7">
        <BarChart />
      </div>

      <div className="item8">
        <DoughnutChart />
      </div>

      <div className="item9">
        <PieChart />
      </div>
    </div>
  );
}