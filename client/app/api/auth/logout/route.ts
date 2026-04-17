import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // 🔥 delete cookie
    path: "/",
  });

  return Response.json({ success: true });
}