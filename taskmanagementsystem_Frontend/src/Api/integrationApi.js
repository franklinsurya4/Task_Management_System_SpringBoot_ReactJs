import axios from "axios";

const API_BASE = "http://localhost:8080/api/integrations";

// Get all integrations for a user
export const getIntegrations = async (userId) => {
  if (!userId) throw new Error("userId is required");
  const response = await axios.get(API_BASE, { params: { userId } });
  return response.data;
};

// Connect to an integration
export const connectIntegration = async (provider, userId) => {
  if (!userId) throw new Error("userId is required");
  const response = await axios.post(
    `${API_BASE}/connect/${provider}`,
    null,
    { params: { userId } }
  );
  return response.data; // { redirectUrl }
};

// Disconnect integration
export const disconnectIntegration = async (provider, userId) => {
  if (!userId) throw new Error("userId is required");
  await axios.delete(`${API_BASE}/disconnect/${provider}`, { params: { userId } });
};