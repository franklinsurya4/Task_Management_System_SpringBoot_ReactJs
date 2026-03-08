import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDashboardAnalytics } from "../Api/dashboardApi";
import KPICards from "../Components/dashboard/KPICards";
import PriorityChart from "../Components/dashboard/PriorityChart";
import AgingList from "../Components/dashboard/AgingList";
import KPIBarChart from "../Components/KPIBarChart";
import "../Styles/Dashboard.css";
import { FaChartPie } from "react-icons/fa";

export default function DashboardPage({ token, darkMode }) {
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const res = await getDashboardAnalytics(token);
        console.log("DASHBOARD RESPONSE:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      }
    };
    fetchData();
  }, [token]);

  if (!data) {
    return (
      <div className={`loading ${darkMode ? "dark" : ""}`}>
        {t("loadingDashboard")}
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>

      {/* ── TITLE ── */}
      <h1 className="dashboard-title">
        <FaChartPie />
        {t("analyticsDashboard")}
      </h1>

      {/* ── KPI CARDS — 4 cols desktop / 2×2 mobile ── */}
      {/*
        KPICards renders 4 cards internally.
        .kpi-grid uses display:grid so if KPICards returns a single
        wrapper div, we use display:contents to flatten it.
        CSS handles the rest.
      */}
      <div className="kpi-grid">
        <KPICards data={data} darkMode={darkMode} />
      </div>

      {/* ── CHARTS — side by side desktop / stacked mobile ── */}
      <div className="chart-grid">
        <div className="chart-card">
          <PriorityChart
            data={data.priorityDistribution || {}}
            darkMode={darkMode}
          />
        </div>
        <div className="chart-card">
          <KPIBarChart
            data={data}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* ── AGING TASKS — always rendered ── */}
      <div className="aging-card">
        <AgingList
          data={data.agingTasks || []}
          darkMode={darkMode}
        />
      </div>

    </div>
  );
}