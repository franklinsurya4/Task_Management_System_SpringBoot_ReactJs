import "../../Styles/AgingList.css";
import { useTranslation } from "react-i18next";

export default function AgingList({ data, darkMode }) {
  const { t } = useTranslation();

  return (
    <div className={`aging-list-container ${darkMode ? "dark" : ""}`}>

      {/* Header Row */}
      <div className="aging-header">
        <span className="left-heading">{t("TaskAging")}</span>
        <span className="right-heading">{t("RemainingDays")}</span>
      </div>

      {/* Task Rows */}
      {data.map((tItem, i) => (
        <div className="aging-row" key={i}>
          <span>{tItem.title}</span>
          <span>{tItem.pendingDays} {t("days")}</span>
        </div>
      ))}
    </div>
  );
}