const API_URL = "http://localhost:3000/orders"

export async function fetchOrder() {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data
}

export async function delOrderById(id) {
    const response = await fetch(`${API_URL}/delorders/${id}`, {
        method : 'DELETE',
        headers : {'CONTENT-TYPE' : 'application/json'}
    })
    return await response.json();
}