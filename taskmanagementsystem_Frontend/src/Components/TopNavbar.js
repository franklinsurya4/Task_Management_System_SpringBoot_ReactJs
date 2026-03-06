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

const SIDEBAR_EXPANDED = 220;
const SIDEBAR_COLLAPSED = 60;

function TopNavbar({
  setActiveComponent,
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode,
  currentUser,
  sidebarCollapsed
}) {

  const { t } = useTranslation();

  const handleDownloadCertificate = async () => {

    if (!currentUser) {
      alert("User data not available");
      return;
    }

    try {
      await generateCertificate({
        name: currentUser.name || "User",
        score: currentUser.score || "N/A",
        darkMode
      });
    } catch (error) {
      console.error(error);
      alert("Certificate generation failed");
    }
  };

  const offset = sidebarCollapsed
    ? SIDEBAR_COLLAPSED
    : SIDEBAR_EXPANDED;

  return (

    <div
      className={`top-navbar ${darkMode ? "dark" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: `${offset}px`,
        width: `calc(100% - ${offset}px)`,
        transition: "left 0.3s ease, width 0.3s ease",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >

      {/* LEFT SIDE */}
      <div className="top-navbar-left">

        <div className={`search-wrapper ${darkMode ? "dark" : "light"}`}>

          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
          />

          <input
            type="text"
            placeholder={t("searchTasks") || "Search tasks"}
            value={searchTerm ?? ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div
        className="top-navbar-right"
        style={{
          paddingRight: sidebarCollapsed ? "12px" : "30px"
        }}
      >

        {/* USERS */}
        <Link
          to="/users"
          className="nav-link"
          onClick={() => setActiveComponent("UserList")}
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <FontAwesomeIcon icon={faUsers} />
          {t("usersList") || "Users"}
        </Link>


        {/* TASKS */}
        <Link
          to="/tasks"
          className="nav-link"
          onClick={() => setActiveComponent("TasksView")}
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <FontAwesomeIcon icon={faTasks} />
          {t("tasksList") || "Tasks"}
        </Link>


        {/* TODO */}
        <Link
          to="/todo"
          className="nav-link"
          onClick={() => setActiveComponent("TodoPage")}
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <FontAwesomeIcon icon={faListCheck} />
          {t("todo") || "Todo"}
        </Link>


        {/* NOTES */}
        <Link
          to="/notes"
          className="nav-link"
          onClick={() => setActiveComponent("NotesPage")}
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <FontAwesomeIcon icon={faNoteSticky} />
          {t("Notes") || "Notes"}
        </Link>


        {/* CERTIFICATE */}
        <button
          className="download-btn"
          onClick={handleDownloadCertificate}
        >
          <FontAwesomeIcon icon={faDownload} style={{ marginRight: "6px" }} />
          {t("Certificate") || "Certificate"}
        </button>


        {/* DARK MODE */}
        <div className="toggle-switch">

          <input
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />

          <label htmlFor="darkModeToggle">
            <span className="toggle-switch-circle">
              {darkMode ? t("on") : t("off")}
            </span>
          </label>

        </div>

      </div>

    </div>

  );
}

export default TopNavbar;