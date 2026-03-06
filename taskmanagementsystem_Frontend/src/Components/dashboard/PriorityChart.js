import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "../../Styles/PriorityChart.css";

export default function PriorityChart({ data, darkMode }) {
  // Safe fallback
  const safeData = data || {};
  const formatted = Object.entries(safeData).map(([k, v]) => ({ name: k, value: v }));

  // Colors adjusted for dark mode
  const COLORS_LIGHT = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b"];
  const COLORS_DARK = ["#818cf8", "#4ade80", "#f87171", "#fbbf24"];
  const COLORS = darkMode ? COLORS_DARK : COLORS_LIGHT;

  // Tooltip style
  const tooltipStyle = {
    backgroundColor: darkMode ? "#2c2c2c" : "#fff",
    color: darkMode ? "#f0f0f0" : "#000",
    border: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    borderRadius: "4px",
    padding: "5px 10px",
  };

  return (
    <div className={`priority-chart-square ${darkMode ? "dark" : ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            innerRadius="50%"
            outerRadius="80%"
          >
            {formatted.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}