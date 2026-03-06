import axios from "axios";

const BASE_URL = "http://localhost:8080/api/system-settings";

export const getSystemSettings = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const updateSystemSettings = async (data) => {
  const response = await axios.put(BASE_URL, data);
  return response.data;
};

// Upload file
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};