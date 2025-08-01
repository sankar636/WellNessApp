import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getPublicSessions = () => axios.get(`${BASE_URL}/api/`);

const getMySessions = (token) =>
  axios.get(`${BASE_URL}/api/my-sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getSessionById = (id, token) =>
  axios.get(`${BASE_URL}/api/my-sessions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const saveDraft = (data, token) =>
  axios.post(`${BASE_URL}/api/my-sessions/save-draft`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

const publishSession = (sessionId, token) =>
  axios.post(
    `${BASE_URL}/api/my-sessions/publish`,
    { sessionId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession,
};
