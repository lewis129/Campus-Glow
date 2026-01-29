import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function AdminOrderChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      const orders = snapshot.docs.map(doc => doc.data());

      if (!orders || orders.length === 0) {
        setChartData([]);
        setLoading(false);
        return;
      }

      // Group orders by day
      const dailyTotals = {};

      orders.forEach(order => {
        const date = new Date(order.createdAt).toLocaleDateString();
        dailyTotals[date] = (dailyTotals[date] || 0) + 1;
      });

      const formattedData = Object.keys(dailyTotals).map(date => ({
        date,
        orders: dailyTotals[date]
      }));

      setChartData(formattedData);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <div className="spinner"></div>;
  if (chartData.length === 0) return <p>No order data yet</p>;

  return (
    <div style={{ width: "90%", height: 300, marginLeft: "-20px" }} className="admin-charts">
      <h3>Orders Per Day</h3>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="orders" fill="#4caf50"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
