// // frontend/src/api/axiosInstance.js

// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000", // Backend API base
// });

// export default instance;

// frontend/src/api/axiosInstance.js

import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default instance;
