import React, { useState } from "react";
import Calendar from "react-calendar";
import { useTranslation } from "react-i18next";
import "react-calendar/dist/Calendar.css";
import { getTasksByDate } from "../Api/taskApi";
import "../Styles/TaskCalendar.css";

const TaskCalendar = ({ setTasks, token, darkMode }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString("en-CA");
    try {
      const res = await getTasksByDate(formattedDate, token);
      setTasks(res.data || []);
    } catch (error) {
      console.error(t("failedToLoadTasks"), error);
    }
  };

  return (
    <div className={`calendar-wrapper ${darkMode ? "dark" : ""}`}>
      <h3 className="calendar-title">{t("taskCalendar")}</h3>
      <Calendar onChange={handleDateChange} value={selectedDate} />
    </div>
  );
};

export default TaskCalendar;