export const fetchWithAuthClient = async (endpoint: string) => {
  const res = await fetch(`/api${endpoint}`, {
    method: "GET",
    credentials: "include", // 🔥 VERY IMPORTANT (sends cookie)
    headers: {
      "Content-Type": "application/json",
    },
  });

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    console.error("Invalid JSON:", text);
    throw new Error("Invalid response from server");
  }

  if (!res.ok) {
    throw new Error(json.message || "API failed");
  }

  return json;
};