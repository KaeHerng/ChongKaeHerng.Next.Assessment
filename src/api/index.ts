// const base = "https://fakestoreapi.com/";
const base2 = process.env.NEXT_PUBLIC_BASE;

async function handleResponse(res: Response) {
  let data: any = null;

  try {
    data = await res.json();
  } catch (e) {
    throw new Error("Invalid JSON response from server");
  }

  if (!res.ok) {
    return {
      success: false,
      message: data?.message || `Request failed: ${res.status}`,
      data,
    };
  }

  if (data?.error_code) {
    return {
      success: false,
      message: data?.message || "Unknown error",
      data,
    };
  }

  return {
    success: true,
    message: data?.message || "success",
    data,
  };
}


export function Login(Auth: any) {
  return fetch(`${base2}auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Auth),
    // credentials: 'include',
  }).then(handleResponse);
}

export async function fetchProducts() {
  const res = await fetch(`${base2}products`);
  return handleResponse(res)
}

export function addProduct(product: any) {
  return fetch(`${base2}products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  }).then(handleResponse);
}

export function updateProduct(id: number, product: any) {
  return fetch(`${base2}products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  }).then(handleResponse);
}

export function deleteProduct(id: number) {
  return fetch(`${base2}products/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
}