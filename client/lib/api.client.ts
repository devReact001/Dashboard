export const fetchWithAuthClient = async (endpoint: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}${endpoint}`,
    {
      credentials: "include", // ✅ REQUIRED
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "API failed");
  }

  return json;
};