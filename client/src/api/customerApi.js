const API_URL = `http://localhost:3000/customers`

export async function fetchCustomer() {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data;
}