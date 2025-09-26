import { useEffect, useState } from "react";
import { fetchCustomer } from "../../api/customerApi";
import Pagination from "../Pagination/Pagination";
import searchIcon from "../../assets/img_navbar/loupe.png";
import downloadIcon from "../../assets/img_menu/download.png";

export default function Customers() {
  const [customerList, setCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 7;

  async function fetchData() {
    try {
      setLoading(true);
      const data = await fetchCustomer();
      setCustomerList(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Lỗi khi tải danh sách khách hàng!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredCustomers = customerList.filter((customer) =>
    customer.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone?.includes(search)
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);

  if (loading) return <p>Loading customers...</p>;

  return (
    <section>
      <div className="flex">
        <h2 className="font-bold text-xl">Customer List</h2>
        <span className="ml-auto">Home &gt; Customer List</span>
      </div>
      
      <div className="bg-white w-full min-h-screen mt-6 rounded-xl">
        <div className="py-6 px-6 flex items-center justify-between border-b-2 border-gray-100">
          <div>
            <h2 className="text-xl font-bold">Customers</h2>
            <p className="text-gray-400 text-sm">
              Manage your customer database and view customer information.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center border rounded-xl w-60 h-12 px-3">
              <img
                src={searchIcon}
                alt="Search Icon"
                className="w-5 h-5 text-gray-500"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search customers..."
                className="ml-2 flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <button className="w-32 h-12 border rounded-xl border-gray-400 bg-white hover:bg-gray-100 flex items-center justify-center space-x-2">
              <img src={downloadIcon} alt="Download Icon" className="w-6 h-6" />
              <span className="text-gray-700 font-medium">Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="text-left border-b border-gray-300">
              <tr>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Customer ID
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Full Name
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Phone Number
                </th>
                <th className="px-10 py-3 text-sm font-semibold text-gray-600">
                  Registration Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr
                  key={customer.customer_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-10 py-6">{customer.customer_id}</td>
                  <td className="px-10 py-6 font-medium">{customer.full_name}</td>
                  <td className="px-10 py-6">{customer.phone}</td>
                  <td className="px-10 py-6">
                    {customer.created_at 
                      ? new Date(customer.created_at).toLocaleDateString()
                      : "N/A"
                    }
                  </td>
                </tr>
              ))}
              {currentCustomers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-10 py-6 text-center text-gray-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <Pagination
            totalItems={filteredCustomers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}