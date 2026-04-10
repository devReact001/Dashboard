import { useState, useEffect } from "react";
import styled from "styled-components";
import API_BASE from "../config/api";

type Column = {
  Header: string;
  accessor: string;
};

type RowData = {
  [key: string]: string | number;
};

type ApiResponse = {
  data: RowData[];
  totalPages: number;
};

const Styles = styled.div`
  padding: 1rem;

  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  table td,
  table th {
    border: 1px solid #1e293b;
    padding: 8px;
    color: #1e293b;
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
  }

  .pagination {
    padding: 1rem;
    text-align: center;
  }

  button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

export default function PaginationTable(): JSX.Element {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<RowData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const [headerRes, dataRes] = await Promise.all([
          fetch(`${API_BASE}/candidates/headers`),
          fetch(`${API_BASE}/candidates?page=${page}&limit=3`),
        ]);

        const headers: { header: string; accessor: string }[] =
          await headerRes.json();

        const result: ApiResponse = await dataRes.json();

        const formattedColumns: Column[] = headers.map((col) => ({
          Header: col.header,
          accessor: col.accessor,
        }));

        setColumns(formattedColumns);
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Table API Error:", error);
      }
    };

    fetchTableData();
  }, [page]);

  return (
    <Styles>
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.Header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j}>{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {data?.length > 0 && <div className="pagination">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          style={{ background: "#1e293b", color: "#fff", border: "none" }}
        >
          {"<"}
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              background: page === i + 1 ? "#1e293b" : "#fff",
              color: page === i + 1 ? "#fff" : "#1e293b",
              border: "1px solid #1e293b",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          style={{ background: "#1e293b", color: "#fff", border: "none" }}
        >
          {">"}
        </button>
      </div>}
    </Styles>
  );
}