import axios from "axios";
const url = "http://localhost:5000";

export const request = {
  fetchChats: (token) => {
    return axios.get(`${url}/get-chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  createChat: (userId, token) => {
    return axios.post(`${url}/chat`, userId, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createGroupChat: (value, token) => {
    return axios.post(`${url}/create-group-chat`, value, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
