// src/App.js
import React, { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import TopNavbar from "./Components/TopNavbar";

import DashboardPage from "./pages/DashboardPage";
import TaskGrid from "./Components/TaskGrid";
import TasksView from "./Components/TasksView";
import Report from "./Components/Report";
import UserList from "./Components/UserList";
import Settings from "./Components/Settings";
import AuthPage from "./Components/AuthPage";
import NotificationTasks from "./Components/NotificationTasks";
import HelpAI from "./Components/HelpAi";
import PrivacySettings from "./Components/PrivacySettings";
import IntegrationSettings from "./Components/IntegrationSettings";
import Profile from "./Components/SettingsPages/Profile";
import ChangePassword from "./Components/SettingsPages/ChangePassword";
import PreferencesPage from "./pages/PreferencesPage";
import SystemSettings from "./Components/SystemSettings";

import TodoPage from "./Components/TodoPage";
import NotesPage from "./Components/NotesPage"; 

import "./Styles/Global.css";
import "./App.css";

const SIDEBAR_FULL = 220;
const SIDEBAR_COLLAPSED = 60;
const TOPNAV_HEIGHT = 60;

const PROTECTED_COMPONENTS = [
  "Dashboard",
  "TaskGrid",
  "Reports",
  "UserList",
  "Settings",
  "Profile",
  "ChangePassword",
  "Notification",
  "HelpAI",
  "Preferences",
  "PrivacySettings",
  "Integrations",
  "SystemSettings",
  "TodoPage",
  "NotesPage" // ✅ ADDED
];

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") ||
    (localStorage.getItem("token") ? "Dashboard" : "TasksView")
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "Franklin",
    score: 95
  });

  const isAuthenticated = !!token;

  useEffect(() => {
    if (!isAuthenticated && PROTECTED_COMPONENTS.includes(activeComponent)) {
      setActiveComponent("Auth");
    }
  }, [token, activeComponent, isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const handleLoginSuccess = (jwtToken) => {

    if (!jwtToken) return;

    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setActiveComponent("Dashboard");

  };

  const handleLogout = () => {

    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("activeComponent");
    setActiveComponent("TasksView");

  };

  const renderComponent = () => {

    switch (activeComponent) {

      case "Auth":
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;

      case "Dashboard":
        return <DashboardPage token={token} darkMode={darkMode} />;

      case "TaskGrid":
        return <TaskGrid token={token} darkMode={darkMode} searchTerm={searchTerm} />;

      case "TasksView":
        return <TasksView token={token} darkMode={darkMode} searchTerm={searchTerm} />;

      case "Reports":
        return <Report darkMode={darkMode} />;

      case "UserList":
        return <UserList darkMode={darkMode} />;

      case "Notification":
        return (
          <NotificationTasks
            darkMode={darkMode}
            token={token}
            setActiveComponent={setActiveComponent}
          />
        );

      case "HelpAI":
        return <HelpAI darkMode={darkMode} setActiveComponent={setActiveComponent} />;

      case "PrivacySettings":
        return (
          <PrivacySettings
            userId={1}
            darkMode={darkMode}
            setActiveComponent={setActiveComponent}
          />
        );

      case "Integrations":
        return (
          <IntegrationSettings
            token={token}
            darkMode={darkMode}
            currentUser={{ id: 1 }}
            setActiveComponent={setActiveComponent}
          />
        );

      case "Settings":
        return (
          <Settings
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={handleLogout}
            setActiveComponent={setActiveComponent}
          />
        );

      case "Profile":
        return <Profile darkMode={darkMode} setActiveComponent={setActiveComponent} />;

      case "SystemSettings":
        return <SystemSettings darkMode={darkMode} setActiveComponent={setActiveComponent} />;

      case "ChangePassword":
        return <ChangePassword darkMode={darkMode} setActiveComponent={setActiveComponent} />;

      case "Preferences":
        return (
          <PreferencesPage
            userId={1}
            darkMode={darkMode}
            setActiveComponent={setActiveComponent}
          />
        );

      case "TodoPage":
        return <TodoPage darkMode={darkMode} />;

      case "NotesPage": // ✅ NEW CASE
        return <NotesPage darkMode={darkMode} />;

      default:
        return <TasksView token={token} darkMode={darkMode} searchTerm={searchTerm} />;

    }

  };

  const sidebarWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_FULL;

  return (

    <div className={`app-container ${darkMode ? "dark" : ""}`}>

      <Navbar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        darkMode={darkMode}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <TopNavbar
        setActiveComponent={setActiveComponent}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        sidebarCollapsed={sidebarCollapsed}
      />

      <div
        className={`main-content ${darkMode ? "dark" : ""}`}
        style={{
          marginLeft: `${sidebarWidth}px`,
          marginTop: `${TOPNAV_HEIGHT}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          minHeight: `calc(100vh - ${TOPNAV_HEIGHT}px)`,
          padding: sidebarCollapsed ? "24px 40px" : "24px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "margin-left 0.3s ease, width 0.3s ease, padding 0.3s ease",
          boxSizing: "border-box"
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth: sidebarCollapsed ? "1400px" : "1200px",
            transition: "max-width 0.3s ease"
          }}
        >
          {renderComponent()}
        </div>

      </div>

    </div>

  );

}

export default App;