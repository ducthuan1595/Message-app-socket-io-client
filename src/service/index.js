import axios from "axios";
const url = "http://localhost:5000";

export const request = {
  chats: () => {
    return axios.get(`${url}/chats`);
  },
  login: (...data) => {
    return axios.post(`${url}/login`, ...data);
  },
  signup: (...data) => {
    return axios.post(`${url}/signup`, ...data);
  },

  searchUser: (key, token) => {
    return axios.get(`${url}/search-user?key=${key}`, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
