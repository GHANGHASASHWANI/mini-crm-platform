// import axios from 'axios';
// const API = 'http://localhost:5000/api';

// export const previewAudience = async (rules) => {
//   const res = await axios.post(`${API}/segments/preview`, { rules });
//   return res.data.size;
// };

// export const createSegmentAndCampaign = async (name, rules) => {
//   const res = await axios.post(`${API}/campaigns`, { name, rules });
//   return res.data;
// };

// export const getCampaigns = async () => {
//   const res = await axios.get(`${API}/campaigns`);
//   return res.data.reverse();
// };

import axios from 'axios';

const API = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const previewAudience = async (rules) => {
  const res = await axios.post(`${API}/segments/preview`, { rules });
  return res.data.size;
};

export const createSegmentAndCampaign = async (name, rules) => {
  const res = await axios.post(`${API}/campaigns`, { name, rules });
  return res.data;
};

export const getCampaigns = async () => {
  const res = await axios.get(`${API}/campaigns`);
  return res.data.reverse();
};
