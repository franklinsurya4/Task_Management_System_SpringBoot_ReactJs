import React, { useEffect, useState, useMemo } from "react";
import TaskCalendar from "./TaskCalendar";
import TaskStatusChart from "./TaskStatusChart";
import TaskList from "./TaskList";
import { getAllTasks } from "../Api/taskApi";
import "../Styles/TasksView.css";

function TasksView({ token, darkMode, searchTerm }) {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await getAllTasks(token);
        setTasks(res.data || []);
        setError("");
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  /* 🔥 Proper filtering logic */
  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks;

    return tasks.filter((task) =>
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  if (!token) {
    return (
      <div className="tasks-view-container">
        <p className="task-message">Please login to view tasks.</p>
      </div>
    );
  }

  return (
    <div className={`tasks-view-container ${darkMode ? "dark" : ""}`}>
      <div className="tasks-view-grid">

        {/* ===== TOP ROW ===== */}
        <div className="tasks-top-row">

          <div className="tasks-card calendar-card">
            <TaskCalendar
              setTasks={setTasks}
              token={token}
              darkMode={darkMode}
            />
          </div>

          <div className="tasks-card chart-card">
            <TaskStatusChart
              tasks={filteredTasks}
              darkMode={darkMode}
            />
          </div>

        </div>

        {/* ===== BOTTOM ROW ===== */}
        <div className="tasks-bottom-row">
          <div className="tasks-card table-card">
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              darkMode={darkMode}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default TasksView;