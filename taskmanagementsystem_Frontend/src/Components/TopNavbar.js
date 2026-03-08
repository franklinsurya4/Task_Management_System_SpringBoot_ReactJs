import React from "react";
import "../Styles/TopNavbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDownload,
  faListCheck,
  faUsers,
  faTasks,
  faNoteSticky
} from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";
import { generateCertificate } from "../Components/Certificate";
import { Link } from "react-router-dom";

const SIDEBAR_EXPANDED  = 220;
const SIDEBAR_COLLAPSED = 60;

function TopNavbar({
  setActiveComponent,
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode,
  currentUser,
  sidebarCollapsed,
  isMobile,           // ✅ passed from App.js
}) {
  const { t } = useTranslation();

  const handleDownloadCertificate = async () => {
    if (!currentUser) { alert("User data not available"); return; }
    try {
      await generateCertificate({
        name: currentUser.name || "User",
        score: currentUser.score || "N/A",
        darkMode,
      });
    } catch (error) {
      console.error(error);
      alert("Certificate generation failed");
    }
  };

  const offset = sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  return (
    <div
      className={`top-navbar ${darkMode ? "dark" : ""}`}
      style={{
        left:   isMobile ? "0px" : `${offset}px`,
        width:  isMobile ? "100%" : `calc(100% - ${offset}px)`,
      }}
    >

      {/* ── LEFT — search (hidden on mobile via CSS) ── */}
      <div className="top-navbar-left">
        <div className={`search-wrapper ${darkMode ? "dark" : "light"}`}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder={t("searchTasks") || "Search tasks"}
            value={searchTerm ?? ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* ── RIGHT — nav links + buttons ── */}
      <div className="top-navbar-right">

        {/* USERS */}
        <Link
          to="/users"
          className="nav-link"
          onClick={() => setActiveComponent("UserList")}
        >
          <FontAwesomeIcon icon={faUsers} className="nav-icon" />
          <span className="nav-label">{t("usersList") || "Users"}</span>
        </Link>

        {/* TASKS */}
        <Link
          to="/tasks"
          className="nav-link"
          onClick={() => setActiveComponent("TasksView")}
        >
          <FontAwesomeIcon icon={faTasks} className="nav-icon" />
          <span className="nav-label">{t("tasksList") || "Tasks"}</span>
        </Link>

        {/* TODO */}
        <Link
          to="/todo"
          className="nav-link"
          onClick={() => setActiveComponent("TodoPage")}
        >
          <FontAwesomeIcon icon={faListCheck} className="nav-icon" />
          <span className="nav-label">{t("todo") || "Todo"}</span>
        </Link>

        {/* NOTES */}
        <Link
          to="/notes"
          className="nav-link"
          onClick={() => setActiveComponent("NotesPage")}
        >
          <FontAwesomeIcon icon={faNoteSticky} className="nav-icon" />
          <span className="nav-label">{t("Notes") || "Notes"}</span>
        </Link>

        {/* CERTIFICATE — icon only on mobile, icon+text on desktop */}
        <button
          className="download-btn"
          onClick={handleDownloadCertificate}
          title="Download Certificate"
        >
          <FontAwesomeIcon icon={faDownload} className="nav-icon" />
          <span className="nav-label" style={{ marginLeft: "6px" }}>
            {t("Certificate") || "Certificate"}
          </span>
        </button>

        {/* DARK MODE TOGGLE */}
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label htmlFor="darkModeToggle">
            <span className="toggle-switch-circle">
              {darkMode ? "🌙" : "☀️"}
            </span>
          </label>
        </div>

      </div>
    </div>
  );
}

export default TopNavbar;