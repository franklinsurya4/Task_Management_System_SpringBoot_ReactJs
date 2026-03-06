import React, { useEffect, useState } from "react";
import {
  getIntegrations,
  connectIntegration,
  disconnectIntegration,
} from "../Api/integrationApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import "../Styles/IntegrationSettings.css";

const PROVIDERS = [
  { id: "google", nameKey: "GoogleCloud" },
  { id: "github", nameKey: "Github" },
  { id: "slack", nameKey: "Slack" },
];

export default function IntegrationSettings({ darkMode, currentUser, setActiveComponent }) {
  const { t } = useTranslation();

  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser?.id) loadIntegrations();
  }, [currentUser]);

  const loadIntegrations = async () => {
    if (!currentUser?.id) return;
    try {
      setLoading(true);
      const data = await getIntegrations(currentUser.id);

      setIntegrations(
        PROVIDERS.map((p) => ({
          provider: p.id,
          connected: data.some((i) => i.provider === p.id && i.connected),
        }))
      );
      setError(null);
    } catch (err) {
      console.error(err);
      setError(t("Failed Load Integrations"));
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (provider) => {
    if (!currentUser?.id) return;
    try {
      setConnecting(provider);
      setError(null);

      const data = await connectIntegration(provider, currentUser.id);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        await loadIntegrations();
      }
    } catch (err) {
      console.error(err);
      setError(`${t("Connection Failed")}: ${err.message}`);
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (provider) => {
    if (!currentUser?.id) return;
    try {
      setError(null);
      await disconnectIntegration(provider, currentUser.id);
      await loadIntegrations();
    } catch (err) {
      console.error(err);
      setError(`${t("Disconnect Failed")}: ${err.message}`);
    }
  };

  if (loading) return <p>{t("Loading Integrations")}</p>;

  return (
    <div className={`integration-container ${darkMode ? "dark" : ""}`}>
      <h2 className="integration-header">
        <FontAwesomeIcon icon={faPlug} className="integration-icon" />
        {t("Integrations")}
      </h2>

      {error && <div className="error-box">{error}</div>}

      <div className="integration-grid">
        {PROVIDERS.map((p) => {
          const integration = integrations.find((i) => i.provider === p.id);
          const connected = integration?.connected || false;

          return (
            <div key={p.id} className="integration-card">
              <h3>{t(p.nameKey)}</h3>
              <p className={`status ${connected ? "status-connected" : "status-disconnected"}`}>
                {connected ? t("Connected") : t("NotConnected")}
              </p>

              {connected ? (
                <button className="disconnect-btn" onClick={() => handleDisconnect(p.id)}>
                  {t("Disconnect")}
                </button>
              ) : (
                <button
                  className="connect-btn"
                  onClick={() => handleConnect(p.id)}
                  disabled={connecting === p.id}
                >
                  {connecting === p.id ? t("Connecting") : t("Connect")}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Back button */}
      <div className="back-button-container">
        <button
          className="integration-back-button"
          onClick={() => setActiveComponent("Settings")}
        >
          ← {t("Back To Settings")}
        </button>
      </div>
    </div>
  );
}