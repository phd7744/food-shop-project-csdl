const API_URL = "http://localhost:3000/orders"

export async function fetchOrder() {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data
}