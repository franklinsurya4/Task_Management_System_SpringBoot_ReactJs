import React from "react";
import { useTranslation } from "react-i18next";
import "../../Styles/KPICards.css";

export default function KPICards({ data, darkMode }) {
  const { t } = useTranslation();

  return (
    <div className={`kpi-container ${darkMode ? "dark" : ""}`}>
      <div className="kpi-card-total">
        <p>{t("totalTasks")}</p>
        <h2>{data.totalTasks}</h2>
      </div>
      <div className="kpi-card-complete">
        <p>{t("completed")}</p>
        <h2>{data.completedTasks}</h2>
      </div>
      <div className="kpi-card-overdue">
        <p>{t("overdue")}</p>
        <h2>{data.overdueTasks}</h2>
      </div>
      <div className="kpi-card-risk">
        <p>{t("atRisk")}</p>
        <h2>{data.atRiskTasks}</h2>
      </div>
    </div>
  );
}