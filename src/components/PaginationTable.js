import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API_BASE from "../config/api";

const Styles = styled.div`
  padding: 1rem;

  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  table td,
  table th {
    border: 1px solid #ffb347;
    padding: 8px;
    color: #ffb347;
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

export default function PaginationTable() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const [headerRes, dataRes] = await Promise.all([
          fetch(`${API_BASE}/candidates/headers`),
          fetch(`${API_BASE}/candidates?page=${page}&limit=3`),
        ]);

        const headers = await headerRes.json();
        const result = await dataRes.json();

        console.log("API RESULT:", result);

        // format columns
        const formattedColumns = headers.map((col) => ({
          Header: col.header,
          accessor: col.accessor,
        }));

        setColumns(formattedColumns);

        // ✅ FIX: use result.data
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

      {/* 🔥 Backend Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          style={{ background: "#ffb347", color: "#fff", border: "none" }}
        >
          {"<"}
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              background: page === i + 1 ? "#ffb347" : "#fff",
              color: page === i + 1 ? "#fff" : "#ffb347",
              border: "1px solid #ffb347",
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          style={{ background: "#ffb347", color: "#fff", border: "none" }}
        >
          {">"}
        </button>
      </div>
    </Styles>
  );
}