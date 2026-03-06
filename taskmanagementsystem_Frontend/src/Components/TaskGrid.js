import React, { useEffect, useState } from "react";
import { getAllTasks, checkTaskScore, downloadTaskPdf } from "../Api/taskApi";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faDownload, faFilter } from "@fortawesome/free-solid-svg-icons";

import "../Styles/TaskGrid.css";

const TaskGrid = ({ token, darkMode, searchTerm }) => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchTasks = async () => {
    if (!token) return;
    try {
      const res = await getAllTasks(token);
      setTasks(res.data);
    } catch (error) {
      console.error(t("failedToLoadTasks"), error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleCheck = async (id) => {
    try {
      await checkTaskScore(id, token);
      fetchTasks();
    } catch (error) {
      console.error(t("errorCheckingScore"), error);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await downloadTaskPdf(token);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Task_Report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(t("downloadFailed"), error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm?.toLowerCase() ?? "");
    const matchesStatus = filterStatus === "All" || task.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`grid ${darkMode ? "dark" : ""}`}>
      <div className="grid-header">
        <h1>
          <FontAwesomeIcon icon={faTasks} /> {t("listOfTasks")}
        </h1>

        <div className="filter-container">
  
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <select
             className="filter-select"
             value={filterStatus}
             onChange={(e) => setFilterStatus(e.target.value)}
          >
          <option value="All">{t("allStatus")}</option>
          <option value="Pending">{t("pending")}</option>
          <option value="Completed">{t("completed")}</option>
          <option value="In Progress">{t("inprogress")}</option>
        </select>
      </div>
      
      </div>

      <div className="grid-container">
        {filteredTasks.map((task) => (
          <div key={task.id} className="card">
            <a href={task.googleFormUrl} target="_blank" rel="noopener noreferrer">
              <img src={task.imageUrl} alt={`Task: ${task.title}`} className="task-image" />
            </a>
            <h4>{task.title}</h4>
            <p>{t("status")}: <strong>{t(task.status.toLowerCase())}</strong></p>
            <p>{t("score")}: <strong>{task.score ?? "-"}</strong></p>
            <button onClick={() => handleCheck(task.id)}>{t("checkResult")}</button>
          </div>
        ))}
      </div>

      <div className="download-container">
        <button onClick={handleDownloadPdf}>
          <FontAwesomeIcon icon={faDownload} /> {t("downloadTaskReport")}
        </button>
      </div>
    </div>
  );
};

export default TaskGrid;