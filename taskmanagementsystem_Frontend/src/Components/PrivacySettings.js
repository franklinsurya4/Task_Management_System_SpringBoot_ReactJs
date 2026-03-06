import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import "../Styles/PrivacySettings.css";

export default function PrivacySettings({
  userId,
  darkMode,
  setActiveComponent,
}) {
  const { t } = useTranslation();

  const [settings, setSettings] = useState({
    taskVisibility: "private",
    activityHidden: false,
    notifyTaskChanges: true,
    notifyComments: true,
    allowGuests: false,
    allowMembers: true,
    allowAdmins: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/privacy/${userId}`)
      .then((res) => setSettings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!userId) {
      setMessage(t("invalidUserId"));
      return;
    }

    setSaving(true);
    setMessage("");

    axios
      .post(`http://localhost:8080/api/privacy/${userId}`, settings)
      .then(() => setMessage(t("settingsSaved")))
      .catch(() => setMessage(t("errorSavingSettings")))
      .finally(() => setSaving(false));
  };

  if (loading) return <p>{t("loadingPrivacySettings")}</p>;

  return (
    <div className={`privacy-settings ${darkMode ? "dark" : ""}`}>
      <h2 className="section-title">
        <FontAwesomeIcon icon={faEye} className="section-icon" />
        {t("Task Visibility")}
      </h2>

      <div className="privacy-grid">
        <div className="setting-card">
          <h3>{t("Task Visibility")}</h3>
          <select
            value={settings.taskVisibility}
            onChange={(e) =>
              handleChange("taskVisibility", e.target.value)
            }
          >
            <option value="private">{t("private (Only Me)")}</option>
            <option value="team">{t("Team Only")}</option>
            <option value="public">{t("Public")}</option> 
          </select>
        </div>

        <div className="setting-card">
          <h3>{t("Profile & Activity")}</h3>
          <label>
            <input
              type="checkbox"
              checked={settings.activityHidden}
              onChange={() =>
                handleChange("activityHidden", !settings.activityHidden)
              }
            />
            {t("Hide my activity feed")}
          </label>
        </div>

        <div className="setting-card">
          <h3>{t("Notifications")}</h3>

          <label>
            <input
              type="checkbox"
              checked={settings.notifyTaskChanges}
              onChange={() =>
                handleChange(
                  "notifyTaskChanges",
                  !settings.notifyTaskChanges
                )
              }
            />
            {t("Task change notifications")}
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.notifyComments}
              onChange={() =>
                handleChange(
                  "notifyComments",
                  !settings.notifyComments
                )
              }
            />
            {t("Comment notifications")}
          </label>
        </div>

        <div className="setting-card">
          <h3>{t("Role-based Access")}</h3>

          <label>
            <input
              type="checkbox"
              checked={settings.allowGuests}
              onChange={() =>
                handleChange("allowGuests", !settings.allowGuests)
              }
            />
            {t("Allow Guests")}
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.allowMembers}
              onChange={() =>
                handleChange("allowMembers", !settings.allowMembers)
              }
            />
            {t("Allow Members")}
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.allowAdmins}
              onChange={() =>
                handleChange("allowAdmins", !settings.allowAdmins)
              }
            />
            {t("Allow Admins")}
          </label>
        </div>
      </div>

      <div className="button-group">
        <button
          className="back-btn"
          onClick={() => setActiveComponent("Settings")}
        >
          ← {t("Back To Settings")}
        </button>

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? t("Saving") : t("Save Settings")}
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}