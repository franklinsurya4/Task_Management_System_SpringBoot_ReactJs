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

const SIDEBAR_FULL      = 220;
const SIDEBAR_COLLAPSED = 60;
const TOPNAV_HEIGHT     = 60;

const PROTECTED_COMPONENTS = [
  "Dashboard", "TaskGrid", "Reports", "UserList",
  "Settings", "Profile", "ChangePassword", "Notification",
  "HelpAI", "Preferences", "PrivacySettings", "Integrations",
  "SystemSettings", "TodoPage", "NotesPage",
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

  const [searchTerm, setSearchTerm]         = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ✅ NEW — controls mobile sidebar open/close
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ NEW — detect if screen is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const [currentUser] = useState({ name: "Franklin", score: 95 });

  const isAuthenticated = !!token;

  // ✅ Listen for screen resize to update isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth > 900) setMobileOpen(false); // close on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // ✅ Close sidebar when a nav item is clicked on mobile
  const handleSetActiveComponent = (name) => {
    setActiveComponent(name);
    if (isMobile) setMobileOpen(false);
  };

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
            setActiveComponent={handleSetActiveComponent}
          />
        );
      case "HelpAI":
        return <HelpAI darkMode={darkMode} setActiveComponent={handleSetActiveComponent} />;
      case "PrivacySettings":
        return (
          <PrivacySettings
            userId={1}
            darkMode={darkMode}
            setActiveComponent={handleSetActiveComponent}
          />
        );
      case "Integrations":
        return (
          <IntegrationSettings
            token={token}
            darkMode={darkMode}
            currentUser={{ id: 1 }}
            setActiveComponent={handleSetActiveComponent}
          />
        );
      case "Settings":
        return (
          <Settings
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={handleLogout}
            setActiveComponent={handleSetActiveComponent}
          />
        );
      case "Profile":
        return <Profile darkMode={darkMode} setActiveComponent={handleSetActiveComponent} />;
      case "SystemSettings":
        return <SystemSettings darkMode={darkMode} setActiveComponent={handleSetActiveComponent} />;
      case "ChangePassword":
        return <ChangePassword darkMode={darkMode} setActiveComponent={handleSetActiveComponent} />;
      case "Preferences":
        return (
          <PreferencesPage
            userId={1}
            darkMode={darkMode}
            setActiveComponent={handleSetActiveComponent}
          />
        );
      case "TodoPage":
        return <TodoPage darkMode={darkMode} />;
      case "NotesPage":
        return <NotesPage darkMode={darkMode} />;
      default:
        return <TasksView token={token} darkMode={darkMode} searchTerm={searchTerm} />;
    }
  };

  // ✅ On mobile → always use 0 margin (sidebar is overlay)
  // On desktop → use normal sidebar width
  const sidebarWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_FULL;

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>

      {/* ✅ Sidebar */}
      <Navbar
        activeComponent={activeComponent}
        setActiveComponent={handleSetActiveComponent}
        darkMode={darkMode}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}        // ✅ NEW prop
        setMobileOpen={setMobileOpen}  // ✅ NEW prop
        isMobile={isMobile}            // ✅ NEW prop
      />

      {/* ✅ Dark overlay — tap to close sidebar on mobile */}
      {isMobile && mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ✅ Mobile hamburger button — fixed top left, only on mobile */}
      {isMobile && (
        <button
          className={`mobile-hamburger ${darkMode ? "dark" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      )}

      {/* Top Navbar */}
      <TopNavbar
        setActiveComponent={handleSetActiveComponent}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* ✅ Main content — mobile uses 0 margin, desktop uses sidebarWidth */}
      <div
        className={`main-content ${darkMode ? "dark" : ""}`}
        style={{
          marginLeft:  isMobile ? "0px" : `${sidebarWidth}px`,
          marginTop:   `${TOPNAV_HEIGHT}px`,
          width:       isMobile ? "100%" : `calc(100% - ${sidebarWidth}px)`,
          minHeight:   `calc(100vh - ${TOPNAV_HEIGHT}px)`,
          padding:     isMobile ? "16px" : sidebarCollapsed ? "24px 40px" : "24px 28px",
          display:     "flex",
          flexDirection: "column",
          alignItems:  "center",
          transition:  "margin-left 0.3s ease, width 0.3s ease, padding 0.3s ease",
          boxSizing:   "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: isMobile ? "100%" : sidebarCollapsed ? "1400px" : "1200px",
            transition: "max-width 0.3s ease",
          }}
        >
          {renderComponent()}
        </div>
      </div>

    </div>
  );
}

export default App;