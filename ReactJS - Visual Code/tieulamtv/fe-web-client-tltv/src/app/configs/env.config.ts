const envConfig = {
  BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000",
  SPORT_DATA_API_URL: import.meta.env.VITE_DATA_SPORT_API_URL || "http://localhost:8080",
};

export default envConfig;
