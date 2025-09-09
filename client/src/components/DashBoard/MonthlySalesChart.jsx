import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlySalesChart() {
  const data = [
    { name: "Jan", sales: 150 },
    { name: "Feb", sales: 370 },
    { name: "Mar", sales: 190 },
    { name: "Apr", sales: 280 },
    { name: "May", sales: 170 },
    { name: "Jun", sales: 180 },
    { name: "Jul", sales: 270 },
    { name: "Aug", sales: 100 },
    { name: "Sep", sales: 200 },
    { name: "Oct", sales: 350 },
    { name: "Nov", sales: 260 },
    { name: "Dec", sales: 110 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
