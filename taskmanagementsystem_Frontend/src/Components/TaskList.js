import React from "react";
import { useTranslation } from "react-i18next";
import "../Styles/TaskList.css";

function TaskList({ tasks = [], loading, error, darkMode }) {
  const { t } = useTranslation();

  if (loading) {
    return <p className="task-message">{t("loading")}</p>;
  }

  if (error) {
    return <p className="task-message error">{error}</p>;
  }

  return (
    <div className={`task-list-container ${darkMode ? "dark" : ""}`}>
      <h2>{t("taskList")}</h2>

      {tasks.length === 0 ? (
        <p className="task-message">{t("noTasks")}</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("description")}</th>
              <th>{t("status")}</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => {
              const displayStatus =
                !task.status || task.status === "PENDING"
                  ? "todo"
                  : task.status.toLowerCase();

              return (
                <tr key={task.id}>
                  <td className="task-title">{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <span className={`status ${displayStatus}`}>
                      {t(displayStatus)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;