import React, { Suspense, ReactNode } from "react";
import "./Layout.scss";

// Lazy imports
const Barchart = React.lazy(() => import("./Barchart"));
const Doughnut = React.lazy(() => import("./Doughnut"));
const Piechart = React.lazy(() => import("./Piechart"));
const Linechart = React.lazy(() => import("./Linechart"));
const Areachart = React.lazy(() => import("./Areachart"));
const Information = React.lazy(() => import("./Information"));
const PaginationTable = React.lazy(() => import("./PaginationTable"));
const Sidebar = React.lazy(() => import("./Sidebar"));

// Skeleton Loader Component
interface SkeletonProps {
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ height = "100%" }) => {
  return (
    <div
      style={{
        height,
        width: "100%",
        borderRadius: "20px",
        background: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
        backgroundSize: "200% 100%",
        animation: "loading 1.5s infinite",
      }}
    />
  );
};

// Wrapper to avoid repeating Suspense
const LazyWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Skeleton />}>{children}</Suspense>
);

export default function Layout(): JSX.Element {
  return (
    <div className="grid-container">
      <div className="item1">
        <LazyWrapper>
          <Sidebar />
        </LazyWrapper>
      </div>

      <div className="item2">
        <LazyWrapper>
          <Information />
        </LazyWrapper>
      </div>

      <div className="item4">
        <LazyWrapper>
          <Areachart />
        </LazyWrapper>
      </div>

      <div className="item3">
        <LazyWrapper>
          <PaginationTable />
        </LazyWrapper>
      </div>

      <div className="item6">
        <LazyWrapper>
          <Linechart />
        </LazyWrapper>
      </div>

      <div className="item7">
        <LazyWrapper>
          <Barchart />
        </LazyWrapper>
      </div>

      <div className="item8">
        <LazyWrapper>
          <Doughnut />
        </LazyWrapper>
      </div>

      <div className="item9">
        <LazyWrapper>
          <Piechart />
        </LazyWrapper>
      </div>
    </div>
  );
}