"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 REQUIRED
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.message || "Login failed");
        return;
      }

      // ✅ FULL RELOAD FIX (avoids Next.js cookie timing issue)
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#020617",
      }}
    >
      <div
        style={{
          width: 350,
          padding: 30,
          borderRadius: 12,
          background: "#0f172a",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Admin Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
            borderRadius: 8,
            border: "none",
            background: "#1e293b",
            color: "white",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
            borderRadius: 8,
            border: "none",
            background: "#1e293b",
            color: "white",
          }}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
