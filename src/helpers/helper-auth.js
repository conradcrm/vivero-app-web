import Axios from 'axios';
const TOKEN_KEY = 'VIVERO_TOKEN';
const USER_KEY = 'USER';
const PHOTO = 'PHOTO';
export function setToken(valor) {
  localStorage.setItem(TOKEN_KEY, valor);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setUserCurrent(valor) {
  localStorage.setItem(USER_KEY, valor);
}

export function getUserCurrent() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

export function deleteUserCurrent() {
  localStorage.removeItem(USER_KEY);
}

export function setPhoto(valor) {
  localStorage.setItem(PHOTO, valor);
}

export function getPhoto() {
  return localStorage.getItem(PHOTO);
}

export function initInterceptors() {
  const token = getToken();
  const myHeaders = new Headers({
    "content-type": "application/json",
    Accept: "application/json",
  });

  if (token) {
    myHeaders.append('Authorization', `Bearer ${token}`);
  }

  return myHeaders;
}

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(function (config) {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        deleteToken();
        window.location = '/';
      } else {
        return Promise.reject(error);
      }
    }
  );
}
