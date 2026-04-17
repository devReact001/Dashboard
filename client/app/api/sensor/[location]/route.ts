// app/api/sensor/[location]/route.ts

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(
  req: Request,
  context: { params: Promise<{ location: string }> }
) {
  try {
    // 🔥 THIS IS THE FIX
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

    jwt.verify(token, process.env.JWT_SECRET!);

    const result = await db.query(
      "SELECT * FROM sensor_data WHERE location = $1 ORDER BY time",
      [location]
    );

    return Response.json(result.rows);
  } catch (error) {
    console.error("Sensor Data Error:", error);
    return Response.json(
      { message: "Failed to fetch sensor data" },
      { status: 500 }
    );
  }
}