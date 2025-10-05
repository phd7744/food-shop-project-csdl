const API_URL = "http://localhost:3000/dashboard";

export async function fetchDashboardStats() {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy thống kê dashboard");
  }
  const data = await response.json();
  return data;
}

export async function fetchRecentOrders(limit = 10) {
  const response = await fetch(`${API_URL}/recent?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh sách orders gần đây");
  }
  const data = await response.json();
  return data;
}