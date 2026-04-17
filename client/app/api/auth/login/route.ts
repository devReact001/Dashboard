import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // ✅ FIXED: users → admins
    const result = await db.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ compare password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ create JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // ✅ FIX: await cookies()
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true, // ⚠️ required for production (Vercel)
      sameSite: "lax",
      path: "/",
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}