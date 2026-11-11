// VITE_API_URL est publique : ne jamais y placer de secret.
const configuredUrl = import.meta.env.VITE_API_URL;
export const API_BASE_URL = (
  configuredUrl ||
  (import.meta.env.DEV
    ? "http://localhost:5003"
    : "https://expressfood-back-abdellahs-projects-4bd571ad.vercel.app")
).replace(/\/+$/, "");

export const apiUrl = (path) =>
  `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
