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
  /* Fill the grid cell; let table scroll, pin pagination at bottom */
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;          /* critical: lets flex child shrink below content size */
  padding: 0;

  .table-scroll {
    flex: 1 1 0;
    overflow: hidden;   /* no scrollbar — rows are compact enough to fit */
    min-height: 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  thead tr {
    /* Royal blue — same family as the sidebar welcome card */
    background: linear-gradient(90deg, #1e40af 0%, #1d4ed8 100%);
  }

  th {
    padding: 7px 14px;
    text-align: left;
    color: rgba(255, 255, 255, 0.82);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: none;
  }

  td {
    padding: 7px 14px;   /* tighter data rows */
    color: #334155;
    border-bottom: 1px solid #e2e8f0;
    font-size: 13px;
  }

  tbody tr {
    transition: background-color 0.15s ease;

    &:hover {
      background-color: #f1f5f9;
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  /* Pagination — always visible at the bottom of the card */
  .pagination {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 10px 16px;
    border-top: 1px solid #e2e8f0;
    background: #ffffff;
    border-radius: 0 0 20px 20px;
  }

  .page-btn {
    min-width: 30px;
    height: 30px;
    padding: 0 8px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    color: #475569;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      background: #1d4ed8;
      color: #fff;
      border-color: #1d4ed8;
    }

    &:disabled {
      opacity: 0.35;
      cursor: default;
    }

    &.active {
      background: #1e40af;
      color: #fff;
      border-color: #1e40af;
    }
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
      <div className="table-scroll">
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
      </div>

      {data.length > 0 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-btn${page === i + 1 ? " active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      )}
    </Styles>
  );
}
