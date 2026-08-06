const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PropertyParams {
  searchTerm?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  bedrooms?: string;
  isAvailable?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export async function getProperties(params?: PropertyParams) {
  const searchParams = new URLSearchParams();

  if (params?.location)
    searchParams.append("location", params.location);

  if (params?.minPrice)
    searchParams.append("minPrice", params.minPrice);

  if (params?.maxPrice)
    searchParams.append("maxPrice", params.maxPrice);

  if (params?.categoryId)
    searchParams.append("categoryId", params.categoryId);

  if (params?.searchTerm)
  searchParams.append("searchTerm", params.searchTerm);

  if (params?.bedrooms)
  searchParams.append("bedrooms", params.bedrooms);

if (params?.isAvailable)
  searchParams.append("isAvailable", params.isAvailable);

if (params?.page)
  searchParams.append("page", params.page);

if (params?.limit)
  searchParams.append("limit", params.limit);

if (params?.sortBy)
  searchParams.append("sortBy", params.sortBy);

if (params?.sortOrder)
  searchParams.append("sortOrder", params.sortOrder);

  const res = await fetch(
    `${API_URL}/api/properties?${searchParams.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  return res.json();
}


// export async function getCategories() {
//   const res = await fetch(`${API_URL}/categories`, {
//     cache: "no-store",
//   });

//   return res.json();
// }

export async function getCategories() {
  const res = await fetch(
    `${API_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getProperty(id: string) {
  const res = await fetch(
    `${API_URL}/api/properties/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }

  return res.json();
}

export async function loginUser(data: any) {
  const res = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}


export async function registerUser(data: any) {
  const res = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}