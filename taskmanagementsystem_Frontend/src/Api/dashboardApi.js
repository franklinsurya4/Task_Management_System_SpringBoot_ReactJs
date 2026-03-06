import axios from "axios";

export const getDashboardAnalytics = (token) => {
  return axios.get(
    "http://localhost:8080/api/dashboard", // updated endpoint
    {
      headers: {
        Authorization: `Bearer ${token}` // keep if your backend needs it
      }
    }
  );
};