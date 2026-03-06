import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useTranslation } from "react-i18next";
import "../Styles/TaskStatusChart.css";

const STATUS_LIST = ["todo", "inprogress", "done"];

const STATUS_COLORS_LIGHT = {
  todo: "#ef4444",
  inprogress: "#3b82f6",
  done: "#22c55e",
};

const STATUS_COLORS_DARK = {
  todo: "#fca5a5",
  inprogress: "#60a5fa",
  done: "#4ade80",
};

function TaskStatusChart({ tasks, statusSummary, darkMode }) {
  const { t } = useTranslation();

  const data = useMemo(() => {
    // 🔥 Dashboard Mode (statusSummary)
    if (statusSummary && Object.keys(statusSummary).length > 0) {
      return STATUS_LIST.map((status) => ({
        status,
        count: statusSummary[status] || 0,
      }));
    }

    // 🔥 TaskView Mode (tasks array)
    const counts = { todo: 0, inprogress: 0, done: 0 };

    (tasks || []).forEach((task) => {
      if (!task.status) return;

      const normalized = task.status
        .toLowerCase()
        .replace("_", "")
        .replace("pending", "todo");

      if (counts.hasOwnProperty(normalized)) {
        counts[normalized]++;
      }
    });

    return STATUS_LIST.map((status) => ({
      status,
      count: counts[status],
    }));
  }, [tasks, statusSummary]);

  const totalTasks = data.reduce((sum, d) => sum + d.count, 0);

  const colors = darkMode ? STATUS_COLORS_DARK : STATUS_COLORS_LIGHT;
  const textColor = darkMode ? "#f3f4f6" : "#374151";
  const gridColor = darkMode ? "#374151" : "#e5e7eb";

  return (
    <div className={`chart-container ${darkMode ? "dark" : ""}`}>
      <h3 className="chart-title">{t("taskStatus")}</h3>

      {totalTasks === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: textColor }}>
          {t("noData")}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis
              dataKey="status"
              tick={{ fill: textColor }}
              tickFormatter={(status) => t(status)}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: textColor }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="count" position="top" fill={textColor} />
              {data.map((entry, index) => (
                <Cell key={index} fill={colors[entry.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TaskStatusChart;