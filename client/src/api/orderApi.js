const API_URL = "http://localhost:3000/orders"

export async function fetchOrder() {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data
}

export async function delOrderById(id) {
    const response = await fetch(`${API_URL}/delorders/${id}`, {
        method : 'DELETE',
        headers : {'Content-Type' : 'application/json'}
    })
    return await response.json();
}

export async function addOrder(data) {
  const res = await fetch(`${API_URL}/addorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi khi thêm order");
  return await res.json();
}

export async function updateOrderStatus(orderId, status) {
  const res = await fetch(`${API_URL}/updatestatus/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Lỗi khi cập nhật trạng thái order");
  }

  return await res.json();
}

export async function fetchDashboardStats() {
  const response = await fetch(`${API_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy thống kê dashboard");
  }
  const data = await response.json();
  return data;
}

export async function fetchRecentOrders(limit = 10) {
  const response = await fetch(`${API_URL}/dashboard/recent?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh sách orders gần đây");
  }
  const data = await response.json();
  return data;
}