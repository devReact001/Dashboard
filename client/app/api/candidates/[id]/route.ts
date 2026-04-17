// app/api/candidates/[id]/route.ts
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 🔥 REQUIRED FIX

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET!);

    // ✅ validation (same as Express)
    if (!id || isNaN(Number(id))) {
      return Response.json(
        { message: "Invalid candidate ID" },
        { status: 400 }
      );
    }

    const result = await db.query(
      "SELECT * FROM candidates WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error("Candidate Detail Error:", error);
    return Response.json(
      { message: "Failed to fetch candidate" },
      { status: 500 }
    );
  }
}