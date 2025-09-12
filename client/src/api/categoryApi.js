const API_URL = "http://localhost:3000";

export async function fetchCategory() {
    const reponse = await fetch(`${API_URL}/category`);
    const data = await reponse.json();
    return data;
}