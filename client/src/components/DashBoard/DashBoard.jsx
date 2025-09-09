import StatsCard from "./StatsCard";
import customersIcon from "../../assets/img_navbar/group.png";
import foodIcon from "../../assets/img_navbar/dish.png";
import orderIcon from "../../assets/img_navbar/order-delivery.png";
import MonthlySalesChart from "./MonthlySalesChart";
import RecentOrder from "./RecentOrder";

const values = [
  { icon: customersIcon, value: "1234", title: "CUSTOMER" },
  { icon: foodIcon, value: "1234", title: "MENU" },
  { icon: orderIcon, value: "1234", title: "ORDER" },
  { icon: customersIcon, value: "1234", title: "Customer" },
];

export default function DashBoard() {
  return (
    <section className="bg-gray-100  space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {values.map((v, index) => (
          <StatsCard
            key={index}
            icon={v.icon}
            value={v.value}
            title={v.title}
          />
        ))}
      </div>
      <MonthlySalesChart />
      <RecentOrder />
    </section>
  );
}
