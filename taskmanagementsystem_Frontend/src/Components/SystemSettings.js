import React, { useEffect, useState } from "react";
import { getSystemSettings, updateSystemSettings, uploadFile } from "../Api/systemApi";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'; // example icon

import "../Styles/SystemSettings.css";

const defaultState = {
  appName: "",
  maintenanceMode: false,
  defaultTaskPriority: "MEDIUM",
  maxFileUploadSize: 5,
  allowUserRegistration: true,
  enableEmailNotifications: true,
  autoArchiveDays: 30,
  uploadedFileName: "",
};

const SystemSettings = ({ darkMode, setActiveComponent }) => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(defaultState);
  const [originalSettings, setOriginalSettings] = useState(defaultState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getSystemSettings();
      setSettings({ ...defaultState, ...data });
      setOriginalSettings({ ...defaultState, ...data });
    } catch (err) {
      setError(t("failedToLoadSettings"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.size / 1024 / 1024 > settings.maxFileUploadSize) {
      setError(t("fileExceedsMaxSize", { size: settings.maxFileUploadSize }));
      return;
    }
    setFile(selectedFile);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return setError(t("noFileSelected"));
    try {
      setUploading(true);
      const response = await uploadFile(file);
      setSettings({ ...settings, uploadedFileName: response.fileName });
      setMessage(t("fileUploadedSuccessfully"));
      setFile(null);
    } catch (err) {
      setError(t("failedToUploadFile"));
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    if (!settings.appName.trim()) return t("appNameCannotBeEmpty");
    if (settings.maxFileUploadSize <= 0) return t("uploadSizeMustBePositive");
    if (settings.autoArchiveDays < 0) return t("archiveDaysCannotBeNegative");
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      setSaving(true);
      await updateSystemSettings(settings);
      setMessage(t("systemSettingsUpdated"));
      setOriginalSettings(settings);
    } catch (err) {
      setError(t("failedToUpdateSettings"));
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(originalSettings);
    setMessage("");
    setError("");
    setFile(null);
  };

  if (loading)
    return (
      <div className={`settings-container ${darkMode ? "dark" : "light"}`}>
        {t("loadingSettings")}
      </div>
    );

  return (
    <div className={`settings-container ${darkMode ? "dark" : "light"}`}>
      <h2>
        <FontAwesomeIcon icon={faGear} /> {t("System Settings")}
      </h2>
      {error && <div className="error-msg">{error}</div>}
      {message && <div className="success-msg">{message}</div>}

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-grids">
          {/* General */}
          <div className="settings-section">
            <h3>{t("General")}</h3>
            <label>{t("Application Name")}</label>
            <input
              type="text"
              name="appName"
              value={settings.appName}
              onChange={handleChange}
              className="input-field"
            />
            <label>{t("Default Task Priority")}</label>
            <select
              name="defaultTaskPriority"
              value={settings.defaultTaskPriority}
              onChange={handleChange}
              className="input-field"
            >
              <option value="LOW">{t("LOW")}</option>
              <option value="MEDIUM">{t("MEDIUM")}</option>
              <option value="HIGH">{t("HIGH")}</option>
            </select>
          </div>

          {/* System Controls */}
          <div className="settings-section">
            <h3>{t("System Controls")}</h3>
            <label>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              {t("Enable Maintenance Mode")}
            </label>
            <label>
              <input
                type="checkbox"
                name="allowUserRegistration"
                checked={settings.allowUserRegistration}
                onChange={handleChange}
              />
              {t("Allow User Registration")}
            </label>
          </div>

          {/* Storage & Automation */}
          <div className="settings-section">
            <h3>{t("Storage Automation")}</h3>
            <label>{t("MaxFileUploadSize")}</label>
            <input
              type="number"
              name="MaxFileUploadSize"
              value={settings.maxFileUploadSize}
              onChange={handleChange}
              className="input-field"
            />
            <label>{t("Auto Archive Days")}</label>
            <input
              type="number"
              name="autoArchiveDays"
              value={settings.autoArchiveDays}
              onChange={handleChange}
              className="input-field"
            />
            <label>
              <input
                type="checkbox"
                name="enableEmailNotifications"
                checked={settings.enableEmailNotifications}
                onChange={handleChange}
              />
              {t("Enable Email Notifications")}
            </label>

            {/* File Upload */}
            <label>{t("Upload File")}</label>
            <input type="file" onChange={handleFileChange} />
            <button
              type="button"
              className="btn upload-btn"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? t("uploading") : t("upload")}
            </button>
            {settings.uploadedFileName && (
              <p>{t("uploadedFile")}: {settings.uploadedFileName}</p>
            )}
          </div>
        </div>

        <div className="settings-actions">
          <button
            type="button"
            className="btn back-btn"
            onClick={() => setActiveComponent("Settings")}
          >
            ← {t("backToSettings")}
          </button>
          <button type="button" onClick={handleReset} className="btn reset-btn">
            {t("Reset")}
          </button>
          <button type="submit" disabled={saving} className="btn save-btn">
            {saving ? t("Saving") : t("SaveSettings")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;