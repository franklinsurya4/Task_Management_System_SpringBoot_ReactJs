import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import "../Styles/NotificationTasks.css";

const NotificationTasks = ({ token, darkMode, setActiveComponent }) => {
  const { t } = useTranslation();
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    fetchPendingTasks();
  }, []);

  const fetchPendingTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/tasks/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingTasks(response.data);
    } catch (error) {
      console.error(t("failedToLoadTasks"), error);
    }
  };

  const sendEmail = async (taskId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/tasks/send-email/${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(t("emailSent"));
    } catch (error) {
      console.error(t("emailSendingFailed"), error);
    }
  };

  return (
    <div className={`notification-container ${darkMode ? "dark" : ""}`}>
      
      <div className="notification-header">
       <h2 className="notification-title">
         <FontAwesomeIcon icon={faClock} className="title-icon" />
            {t("pendingTasks")}
        </h2>
      </div>

      {pendingTasks.length === 0 ? (
        <p className="no-tasks">{t("noPendingTasks")}</p>
      ) : (
        pendingTasks.map((task) => (
          <div className="notification-card" key={task.id}>
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <span className="task-status">
                {t(task.status.toLowerCase())}
              </span>
              <span className="task-date">
                {t("due")}: {task.dueDate}
              </span>
            </div>

            <button
              className="reminder-btn"
              onClick={() => sendEmail(task.id)}
            >
              {t("sendEmail")}
            </button>
          </div>
        ))
      )}

      {/* BACK BUTTON AT BOTTOM */}
      <div className="bottom-back-container">
        <button
          className="bottom-back-btn"
          onClick={() => setActiveComponent("Settings")}
        >
          ← {t("Back to Settings")}
        </button>
      </div>
    </div>
  );
};

export default NotificationTasks;