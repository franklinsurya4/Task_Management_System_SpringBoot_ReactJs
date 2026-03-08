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

const SIDEBAR_FULL           = 220;
const SIDEBAR_COLLAPSED      = 60;
const TOPNAV_HEIGHT_DESKTOP  = 60;
const TOPNAV_HEIGHT_MOBILE   = 52;

const PROTECTED_COMPONENTS = [
  "Dashboard", "TaskGrid", "Reports", "UserList",
  "Settings", "Profile", "ChangePassword", "Notification",
  "HelpAI", "Preferences", "PrivacySettings", "Integrations",
  "SystemSettings", "TodoPage", "NotesPage",
];

function App() {
  const [token,            setToken]            = useState(localStorage.getItem("token"));
  const [activeComponent,  setActiveComponent]  = useState(
    localStorage.getItem("activeComponent") ||
    (localStorage.getItem("token") ? "Dashboard" : "TasksView")
  );
  const [darkMode,         setDarkMode]         = useState(localStorage.getItem("theme") === "dark");
  const [searchTerm,       setSearchTerm]       = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [isMobile,         setIsMobile]         = useState(window.innerWidth <= 900);

  const [currentUser] = useState({ name: "Franklin", score: 95 });
  const isAuthenticated = !!token;

  // Track resize
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Redirect to auth if not logged in
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

  const handleSetActiveComponent = (comp) => {
    setActiveComponent(comp);
    if (isMobile) setMobileOpen(false); // close sidebar on mobile nav
  };

  const handleLogin = (tok) => {
    setToken(tok);
    localStorage.setItem("token", tok);
    setActiveComponent("Dashboard");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("activeComponent");
    setActiveComponent("Auth");
  };

  // ── Render page content ──────────────────────────────────────────────────
  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":    return <DashboardPage token={token} darkMode={darkMode} />;
      case "TaskGrid":     return <TaskGrid token={token} darkMode={darkMode} searchTerm={searchTerm} />;
      case "Reports":      return <Report token={token} darkMode={darkMode} />;
      case "UserList":     return <UserList token={token} darkMode={darkMode} />;
      case "Notification": return <NotificationTasks token={token} darkMode={darkMode} />;
      case "HelpAI":       return <HelpAI token={token} darkMode={darkMode} />;
      case "Settings":     return <Settings token={token} darkMode={darkMode} setActiveComponent={handleSetActiveComponent} />;
      case "PrivacySettings": return <PrivacySettings darkMode={darkMode} />;
      case "Integrations": return <IntegrationSettings darkMode={darkMode} />;
      case "SystemSettings": return <SystemSettings token={token} darkMode={darkMode} />;
      case "Profile":      return <Profile token={token} darkMode={darkMode} setActiveComponent={handleSetActiveComponent} />;
      case "ChangePassword": return <ChangePassword darkMode={darkMode} setActiveComponent={handleSetActiveComponent} />;
      case "Preferences":  return <PreferencesPage userId={1} darkMode={darkMode} setActiveComponent={handleSetActiveComponent} />;
      case "TodoPage":     return <TodoPage darkMode={darkMode} />;
      case "NotesPage":    return <NotesPage darkMode={darkMode} />;
      default:             return <TasksView token={token} darkMode={darkMode} searchTerm={searchTerm} />;
    }
  };

  // ── Layout values ────────────────────────────────────────────────────────
  const sidebarWidth   = sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_FULL;
  const topNavHeight   = isMobile ? TOPNAV_HEIGHT_MOBILE : TOPNAV_HEIGHT_DESKTOP;
  const mainMarginLeft = isMobile ? 0 : sidebarWidth;
  const mainWidth      = isMobile ? "100%" : `calc(100% - ${sidebarWidth}px)`;
  const mainPadding    = isMobile ? "10px" : sidebarCollapsed ? "24px 40px" : "24px 28px";
  const innerMaxWidth  = isMobile ? "100%" : sidebarCollapsed ? "1400px" : "1200px";

  // ════════════════════════════════════════════════════════════════════════
  // ✅ NOT AUTHENTICATED — show ONLY the login/register page, full screen
  //    No sidebar, no topnavbar
  // ════════════════════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div
        className={`app-container ${darkMode ? "dark" : ""}`}
        style={{ display: "block", width: "100%", minHeight: "100vh" }}
      >
        <AuthPage
          setToken={handleLogin}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // ✅ AUTHENTICATED — full layout with sidebar + topnavbar
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>

      {/* Sidebar */}
      <Navbar
        activeComponent={activeComponent}
        setActiveComponent={handleSetActiveComponent}
        darkMode={darkMode}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isMobile={isMobile}
        onLogout={handleLogout}
      />

      {/* Overlay to close sidebar on mobile tap-outside */}
      {isMobile && mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Hamburger button — only on mobile */}
      {isMobile && (
        <button
          className={`mobile-hamburger ${darkMode ? "dark" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Open menu"
        >
          ☰
        </button>
      )}

      {/* TopNavbar */}
      <TopNavbar
        setActiveComponent={handleSetActiveComponent}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        sidebarCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div
        className={`main-content ${darkMode ? "dark" : ""}`}
        style={{
          marginLeft:    `${mainMarginLeft}px`,
          marginTop:     `${topNavHeight}px`,
          width:         mainWidth,
          minHeight:     `calc(100vh - ${topNavHeight}px)`,
          padding:       mainPadding,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          transition:    "margin-left 0.3s ease, width 0.3s ease",
          boxSizing:     "border-box",
          overflowX:     "hidden",
        }}
      >
        <div
          style={{
            width:     "100%",
            maxWidth:  innerMaxWidth,
            transition:"max-width 0.3s ease",
            overflowX: "hidden",
          }}
        >
          {renderComponent()}
        </div>
      </div>

    </div>
  );
}

export default App;