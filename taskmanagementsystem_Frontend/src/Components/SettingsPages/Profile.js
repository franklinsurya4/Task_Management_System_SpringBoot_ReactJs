import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../../Styles/Profile.css";

const Profile = ({ setActiveComponent, darkMode }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          return;
        }

        const res = await axios.get(
          "http://localhost:8080/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!profile) {
    return <div>{t("loadingProfile")}</div>;
  }

  return (
    <div className={`profile-container ${darkMode ? "dark" : ""}`}>
      <div className="profile-card">
        <h2 className="profile-title">{t("Profile Information")}</h2>

        <div className="profile-field">
          <span className="profile-label">{t("Name")}</span>
          <span className="profile-value">{profile.name}</span>
        </div>

        <div className="profile-field">
          <span className="profile-label">{t("Email")}</span>
          <span className="profile-value">{profile.email}</span>
        </div>

        <button
          className="profile-back-button"
          onClick={() => setActiveComponent("Settings")}
        >
          ← {t("Back to Settings")}
        </button>
      </div>
    </div>
  );
};

export default Profile;