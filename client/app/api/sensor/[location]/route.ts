import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(
  req: Request,
  context: { params: Promise<{ location: string }> }
) {
  try {
    const { location } = await context.params;

    if (!location) {
      return Response.json(
        { message: "Invalid location" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      "SELECT * FROM sensor_data WHERE location = $1 ORDER BY time",
      [location]
    );

    if (result.rows.length === 0) {
      return Response.json([]);
    }

    return Response.json(result.rows);
  } catch (error) {
    console.error("Sensor Data Error:", error);
    return Response.json(
      { message: "Failed to fetch sensor data" },
      { status: 500 }
    );
  }
}