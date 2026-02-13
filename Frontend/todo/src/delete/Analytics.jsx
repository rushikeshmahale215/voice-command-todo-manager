import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Sidebar from "../pages/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Analytics.css";

const Analytics = () => {
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    total: 0,
  });

  const COLORS = ["#22c55e", "#ef4444"]; // green, red

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const res = await fetch(
          `https://voice-command-todo-manager.onrender.com/api/todos?user_id=${user.uid}`
        );

        const data = await res.json();

        const completed = data.filter(
          (t) =>
            typeof t.status === "string" &&
            t.status.toLowerCase() === "completed"
        ).length;

        const pending = data.filter(
          (t) =>
            typeof t.status === "string" &&
            t.status.toLowerCase() === "pending"
        ).length;

        setStats({
          completed,
          pending,
          total: data.length,
        });
      } catch (error) {
        console.error("Analytics error:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h2>Analytics Dashboard</h2>

        <div className="analytics-wrapper">
          {/* Pie Chart */}
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Cards */}
          <div className="stats-panel">
            <div className="stat-card">
              <h3>Total Todos</h3>
              <p>{stats.total}</p>
            </div>

            <div className="stat-card completed">
              <h3>Completed</h3>
              <p>{stats.completed}</p>
            </div>

            <div className="stat-card pending">
              <h3>Pending</h3>
              <p>{stats.pending}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
