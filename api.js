import axios from 'axios';

const API_BASE = 'https://silent-talks-backend.onrender.com'; // Replace with your actual backend URL if different

export async function sendMessage(userMessage, meta) {
  const response = await axios.post(`${API_BASE}/api/chat`, {
    userMessage,
    meta,
  });
  return response.data.reply;
}