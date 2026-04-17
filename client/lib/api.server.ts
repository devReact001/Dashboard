import { cookies } from "next/headers";

export async function fetchWithAuthServer(path: string) {
  const cookieStore = await cookies();

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api${path}`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "API failed");
  }

  return json;
};