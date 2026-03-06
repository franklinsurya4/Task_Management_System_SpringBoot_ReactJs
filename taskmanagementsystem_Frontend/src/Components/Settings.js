import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faPalette,
  faTasks,
  faShieldAlt,
  faPlug,
  faCogs,
  faInfoCircle,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";
import "../Styles/Settings.css";

const SettingsMenu = ({
  darkMode,
  setDarkMode,
  onLogout,
  setActiveComponent
}) => {
  const { t } = useTranslation();

  const settingsCards = [
    { key: "Account", icon: faUser },
    { key: "Notifications", icon: faBell },
    { key: "Appearance", icon: faPalette },
    { key: "TaskPreferences", icon: faTasks },
    { key: "PrivacyAndSecurity", icon: faShieldAlt },
    { key: "Integrations", icon: faPlug },
    { key: "System", icon: faCogs },
    { key: "HelpAndAbout", icon: faInfoCircle }
  ];

  const handleCardClick = (key) => {
    switch (key) {
      case "Account":
        setActiveComponent("Profile");
        break;

      case "Notifications":
        setActiveComponent("Notification");
        break;

      case "Appearance":
        setDarkMode((prev) => !prev);
        break;

      case "TaskPreferences":
        setActiveComponent("Preferences");
        break;

      case "PrivacyAndSecurity":
        setActiveComponent("PrivacySettings");
        break;

      case "Integrations":
        setActiveComponent("Integrations"); // 🔥 CONNECTED TO BACKEND PAGE
        break;

      case "System":
        setActiveComponent("SystemSettings");
        break;

      case "HelpAndAbout":
        setActiveComponent("HelpAI");
        break;

      default:
        break;
    }
  };

  return (
    <div className={`settings-window ${darkMode ? "dark" : ""}`}>
      <h2 className="settings-title">
        <FontAwesomeIcon icon={faCogs} /> {t("settings")}
      </h2>

      <div className="settings-grid">
        {settingsCards.map((card) => (
          <div
            key={card.key}
            className="settings-card"
            onClick={() => handleCardClick(card.key)}
          >
            <FontAwesomeIcon icon={card.icon} className="settings-icon" />
            <span>{t(card.key)}</span>
          </div>
        ))}
      </div>

      <div className="logout-container">
        <button className="logout-button" onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default SettingsMenu;