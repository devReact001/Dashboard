import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const result = await db.query("SELECT id, email FROM users WHERE id = $1", [
      decoded.id,
    ]);

    return Response.json(result.rows[0]);
  } catch {
    return new Response("Invalid token", { status: 401 });
  }
}
