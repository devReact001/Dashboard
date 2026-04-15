"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import type { Column } from "./PaginationTable";
import { fetchWithAuthClient } from "@/lib/api.client";

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
    width: 100%;
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid #1e293b;
    padding: 8px;
  }

  .pagination {
    margin-top: 10px;
    text-align: center;
  }

  button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

interface Props {
  columns: Column[];
}

export default function PaginationTableClient({ columns }: Props) {
  const [data, setData] = useState<RowData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ApiResponse = await fetchWithAuthClient(
          `/candidates?page=${page}&limit=3`
        );
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Table API Error:", error);
      }
    };

    fetchData();
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
      {data.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
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
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </Styles>
  );
}