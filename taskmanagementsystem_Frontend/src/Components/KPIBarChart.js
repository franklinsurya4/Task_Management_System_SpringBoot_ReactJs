import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import "../Styles/KPIBarChart.css";

export default function KPIBarChart({ data, darkMode }) {
  if (!data) return null;

  const chartData = [
    { name: "Total", value: data.totalTasks ?? 0, color: "#6366f1" },     // Indigo
    { name: "Completed", value: data.completedTasks ?? 0, color: "#22c55e" }, // Green
    { name: "Overdue", value: data.overdueTasks ?? 0, color: "#ef4444" }, // Red
    { name: "At Risk", value: data.atRiskTasks ?? 0, color: "#f59e0b" }   // Amber
  ];

  return (
    <div className={`kpi-bar-container ${darkMode ? "dark-mode" : ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />

          <XAxis
            dataKey="name"
            stroke={darkMode ? "#e5e7eb" : "#374151"}
            tick={{ fontSize: 13 }}
          />

          <YAxis
            stroke={darkMode ? "#e5e7eb" : "#374151"}
            tick={{ fontSize: 13 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
            }}
            labelStyle={{
              color: darkMode ? "#f9fafb" : "#111827"
            }}
          />

          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}