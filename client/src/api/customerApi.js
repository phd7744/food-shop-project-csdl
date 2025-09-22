const API_URL = `http://localhost:3000/customers`;

export async function fetchCustomer() {
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  return data;
}

export async function addCustomer(data) {
  const response = await fetch(`${API_URL}/addcustomer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  
  if (response.ok) {
    return await response.json();
  } else {
    console.log("ERROR Add Customer");
    throw new Error("Add Customer Failed");
  }
}

export async function fetchCustomerByPhone(phone) {
  const res = await fetch(`${API_URL}/byphone/${phone}`);
  if (!res.ok) throw new Error("Lỗi khi lấy khách hàng");
  return await res.json();
}
