const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProperties() {
  const res = await fetch(`${API_URL}/api/properties`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}