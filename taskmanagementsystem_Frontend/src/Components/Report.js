import React from "react";
import { useTranslation } from "react-i18next";
import "../Styles/Report.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const Report = ({ tasks = [], darkMode }) => {

  const { t } = useTranslation();

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#00C49F", "#FF8042"];

  /* ================= DOWNLOAD PDF ================= */
  const downloadReport = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/reports/tasks/pdf",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (!response.ok) throw new Error("downloadError");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "task-report.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(t(err.message));
    }
  };

  /* ================= DATA PREP ================= */

  const statusCounts = tasks.reduce((acc, tsk) => {
    acc[tsk.status] = (acc[tsk.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = [
    {
      name: t("tasks"),
      TODO: statusCounts.TODO || 0,
      IN_PROGRESS: statusCounts.IN_PROGRESS || 0,
      DONE: statusCounts.DONE || 0,
    },
  ];

  const radialData = [
    { name: t("todo"), value: statusCounts.TODO || 0, fill: "#8884d8" },
    { name: t("inprogress"), value: statusCounts.IN_PROGRESS || 0, fill: "#82ca9d" },
    { name: t("done"), value: statusCounts.DONE || 0, fill: "#ffc658" },
  ];

  const dateCounts = tasks.reduce((acc, tsk) => {
    if (tsk.completedAt) {
      const date = tsk.completedAt.split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const lineData = Object.keys(dateCounts)
    .sort()
    .map((date) => ({
      date,
      completed: dateCounts[date],
    }));

  if (lineData.length === 0) {
    lineData.push({ date: t("noData"), completed: 0 });
  }

  const gridColor = darkMode ? "#555" : "#ccc";
  const axisColor = darkMode ? "#ddd" : "#333";
  const tooltipStyle = {
    backgroundColor: darkMode ? "#2a2a3d" : "#fff",
    border: "none",
    color: darkMode ? "#fff" : "#000",
  };

  return (
    <div className={`report-container ${darkMode ? "dark" : ""}`}>
      <div className="report-header">
        <h2>
          <FontAwesomeIcon icon={faChartBar} style={{ marginRight: "8px" }} />
              {t("taskReports")}
        </h2>
        <button className="download-btns" onClick={downloadReport}>
          {t("downloadPdf")}
        </button>
      </div>

      <div className="report-charts">

        {/* Bar Chart */}
        <div className="chart-card">
          <h3>{t("tasksByStatus")}</h3>
          <BarChart width={350} height={250} data={statusData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar dataKey="TODO" fill="#8884d8" name={t("todo")} />
            <Bar dataKey="IN_PROGRESS" fill="#82ca9d" name={t("inprogress")} />
            <Bar dataKey="DONE" fill="#ffc658" name={t("done")} />
          </BarChart>
        </div>

        {/* Radial */}
        <div className="chart-card">
          <h3>{t("statusDistribution")}</h3>
          <RadialBarChart
            width={350}
            height={250}
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            data={radialData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar dataKey="value" background />
            <Tooltip contentStyle={tooltipStyle} />
          </RadialBarChart>

          <div className="polar-labels">
            {radialData.map((i) => (
              <span key={i.name} style={{ color: i.fill }}>
                {i.name}
              </span>
            ))}
          </div>
        </div>

        {/* Line */}
        <div className="chart-card">
          <h3>{t("completionTrend")}</h3>
          <LineChart width={350} height={250} data={lineData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Line dataKey="completed" stroke="#82ca9d" strokeWidth={3} name={t("completed")} />
          </LineChart>
        </div>

        {/* Composed */}
        <div className="chart-card">
          <h3>{t("statusVsTrend")}</h3>
          <ComposedChart width={350} height={250} data={lineData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar dataKey="completed" barSize={20} fill="#82ca9d" name={t("completed")} />
            <Line dataKey="completed" stroke="#8884d8" />
          </ComposedChart>
        </div>

      </div>
    </div>
  );
};

export default Report;