import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
});

// 요청을 보내기 전 하고자 하는 것을 정의
axiosInstance.interceptors.request.use(function (config) {
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
      return response;
  }, function (error) {
    if (error.response.data === 'jwt expired') {
        window.location.reload();
    }
      return Promise.reject(error);
  });

export default axiosInstance;
