// app/api/candidates/route.ts
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET!);

    const { searchParams } = new URL(req.url);

    let page = parseInt(searchParams.get("page") || "1");
    let limit = parseInt(searchParams.get("limit") || "5");

    // ✅ same safety logic
    if (page < 1) page = 1;
    if (limit < 1 || limit > 50) limit = 5;

    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT * FROM candidates
      ORDER BY id
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM candidates`;

    const [dataResult, countResult] = await Promise.all([
      db.query(dataQuery, [limit, offset]),
      db.query(countQuery),
    ]);

    const total = parseInt(countResult.rows[0].count);

    return Response.json({
      data: dataResult.rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Pagination API Error:", error);
    return Response.json(
      { message: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}