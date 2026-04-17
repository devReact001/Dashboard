// app/api/dashboard/stats/route.ts
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET!);

    const result = await db.query("SELECT * FROM dashboard_stats");

    // ✅ same empty handling
    if (result.rows.length === 0) {
      return Response.json(
        { message: "No stats found" },
        { status: 404 }
      );
    }

    // 🔥 unchanged response (first row only)
    return Response.json(result.rows[0]);

  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return Response.json(
      { message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}