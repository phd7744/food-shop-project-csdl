const API_URL = "http://localhost:3000/foods";

export async function fetchFoods() {
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  return data;
}

export async function toBase64(file) {
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  return base64;
}

export async function addFood(data) {
  const response = await fetch(`${API_URL}/addfood`, {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(data)
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.log("ERROR Add Food");
    throw new Error("Add Food Failed");
  }
}
