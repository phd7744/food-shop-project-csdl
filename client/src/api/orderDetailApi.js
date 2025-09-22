const API_URL = 'http://localhost:3000/orderdetail';

export async function addOrderDetails(orderId, details) {
  console.log("Sending order details:", orderId, details); // debug
  const res = await fetch(`${API_URL}/addorderdetail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_id: orderId, order_details: details }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Response error:", text); // xem chi tiết lỗi từ server
    throw new Error("Lỗi khi thêm order details");
  }

  return await res.json();
}

