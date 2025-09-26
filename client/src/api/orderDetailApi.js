const API_URL = "http://localhost:3000/orderdetail";

export async function addOrderDetails(orderId, details) {
  const res = await fetch(`${API_URL}/addorderdetail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_id: orderId, order_details: details }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Response error:", text);
    throw new Error("Lỗi khi thêm order details");
  }

  return await res.json();
}

export async function getOrderDetailById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
}


