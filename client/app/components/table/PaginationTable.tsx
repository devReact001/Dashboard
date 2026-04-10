import PaginationTableClient from "./PaginationTableClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export type Column = {
  Header: string;
  accessor: string;
};

export default async function PaginationTable() {
  try {
    const res = await fetch(`${API_BASE}/candidates/headers`, {
      cache: "no-store",
    });

    const headers: { header: string; accessor: string }[] =
      await res.json();

    const columns: Column[] = headers.map((col) => ({
      Header: col.header,
      accessor: col.accessor,
    }));

    return <PaginationTableClient columns={columns} />;
  } catch (error) {
    console.error("Table Header Error:", error);
    return <div>Error loading table</div>;
  }
}