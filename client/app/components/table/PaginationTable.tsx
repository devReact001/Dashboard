import { fetchWithAuthServer } from "@/lib/api.server";
import PaginationTableClient from "./PaginationTableClient";

export type Column = {
  Header: string;
  accessor: string;
};

export default async function PaginationTable() {
  try {
    const headers: { header: string; accessor: string }[] =
      await fetchWithAuthServer(`/candidates/headers`);

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