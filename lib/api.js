async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Check your connection and try again.");
    }
    throw new Error("Network error. Check your connection and try again.");
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchProducts() {
  const res = await fetchWithTimeout("/api/marketplace/products");
  if (!res.ok) throw new Error("Could not load marketplace products");
  const data = await res.json();
  return data.products;
}

export async function fetchProduct(productId) {
  const res = await fetchWithTimeout(`/api/marketplace/products/${productId}`);
  if (res.status === 404) throw new Error("This product doesn't exist or is no longer available.");
  if (!res.ok) throw new Error("Could not load product details");
  const data = await res.json();
  return data;
}
