import { cookies } from "next/headers";

export const fetchWithAuthServer = async (endpoint: string) => {
  const cookieStore = await cookies();

  const res = await fetch(
    `http://localhost:3000/api${endpoint}`, // 👉 backend URL
    {
      headers: {
        Cookie: cookieStore.toString(), // 🔥 THIS IS KEY
      },
      cache: "no-store",
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "API failed");
  }

  return json;
};