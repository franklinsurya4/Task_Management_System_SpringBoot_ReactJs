import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

import "../Styles/TaskPreference.css";

const PreferencesPage = ({ darkMode, setActiveComponent }) => {
  const { t, i18n } = useTranslation();

  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  /* ===========================
     Fetch Tasks
  =========================== */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/api/tasks");
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  /* ===========================
     Filter Tasks
  =========================== */
  const filteredTasks =
    statusFilter === "ALL"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  /* ===========================
     Change Language
  =========================== */
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className={`task-preference ${darkMode ? "dark" : ""}`}>
      <h1 className="section-title">
        <FontAwesomeIcon icon={faTasks} style={{ marginRight: '8px' }} />
           {t("Task Preferences")}
      </h1>

      {/* Filters */}
      <div className="filters-section-wrapper">

        <div className="language-section">
          <h3>{t("Select Language")}</h3>
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div className="task-filter-section">
          <h3>{t("Filter Tasks by Status")}</h3>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">{t("All")}</option>
            <option value="PENDING">{t("Pending")}</option>
            <option value="IN_PROGRESS">{t("In Progress")}</option>
            <option value="DONE">{t("Done")}</option>
          </select>
        </div>

      </div>

      {/* Tasks */}
      <div className="favourite-tasks-section">
        <h3>{t("Tasks")}</h3>

        {loading && <p>{t("Loading tasks...")}</p>}

        {!loading && (
          <ul className="task-grid">
            {filteredTasks.map((task) => (
              <li key={task.id} className="task-card">
                <label>
                  <input type="checkbox" />
                  <span className="task-title">{task.title}</span>
                  <span className="task-status"> ({task.status})</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button
          className="back-button"
          onClick={() => setActiveComponent("Settings")}
        >
          ← {t("Back to Settings")}
        </button>

        <button className="save-button">
          {t("Save Preferences")}
        </button>
      </div>
    </div>
  );
};

export default PreferencesPage;