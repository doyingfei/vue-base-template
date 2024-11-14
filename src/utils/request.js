// request.js
import axios from "axios";
import { message } from "ant-design-vue";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 请求的基础 URL
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送前可以做一些处理，比如在 headers 中添加 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 可以在这里处理统一的响应逻辑，比如只返回 response.data
    return response.data;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          // 未授权，重定向到登录页
          message.error("请登录");
          break;
        case 403:
          message.error("权限不足");
          break;
        case 404:
          message.error("请求的资源不存在");
          break;
        case 500:
          message.error("服务器内部错误");
          break;
        default:
          message.error(`发生错误：${error.message}`);
      }
    } else {
      // 网络或其他错误
      message.error("网络错误，请稍后重试");
    }
    return Promise.reject(error);
  }
);

export default service;
