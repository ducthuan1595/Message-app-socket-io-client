import axios from "axios";
// export const url = "http://localhost:5000";
export const url = process.env.REACT_APP_API_URL;

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
  updateUser: (value, token) => {
    return axios.post(`${url}/edit-user`, value, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  updateGroupChat: (value, token) => {
    return axios.post(`${url}/update-user-group-chat`, value, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  renameGroupChat: (value, token) => {
    return axios.put(`${url}/rename-group-chat`, value, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  leaveGroupChat: (value, token) => {
    return axios.put(`${url}/leave-user-group-chat`, value, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  sendMessage: (value, token) => {
    return axios.post(`${url}/sent-message`, value, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getMessage: (chatId, token) => {
    return axios.get(`${url}/get-message?chatId=${chatId}`, {
      validateStatus: (status) => {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
