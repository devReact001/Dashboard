// app/api/charts/bar/route.ts
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

    const result = await db.query("SELECT * FROM bar_chart");

    return Response.json(result.rows);
  } catch (error) {
    console.error("Bar Chart Error:", error);
    return Response.json(
      { message: "Failed to fetch bar chart data" },
      { status: 500 }
    );
  }
}