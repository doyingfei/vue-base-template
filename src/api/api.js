// api.js
import service from "../utils/request.js";
import { message } from "ant-design-vue";

// GET 请求
export function get(url, params) {
  return service({
    method: "get",
    url,
    params
  });
}

// POST 请求
export function post(url, data) {
  return service({
    method: "post",
    url,
    data
  });
}

// 其他请求方法（如 PUT、DELETE）可根据需要封装
export function put(url, data) {
  return service({
    method: "put",
    url,
    data
  });
}

export function del(url, data) {
  return service({
    method: "delete",
    url,
    data
  });
}

export function uploadFile(url, file, additionalData = {}) {
  // 使用 FormData 构建请求数据
  const formData = new FormData();
  formData.append("file", file);

  // 如果有其他额外的表单数据，可以追加到 formData 中
  Object.keys(additionalData).forEach((key) => {
    formData.append(key, additionalData[key]);
  });

  return service.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: (progressEvent) => {
      // 可以在此获取上传进度
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`上传进度：${progress}%`);
    }
  });
}

// 文件下载封装方法
export function downloadFile(url, params = {}, filename = "downloaded-file") {
  return service
    .get(url, {
      params,
      responseType: "blob", // 确保响应为 Blob 格式
      onDownloadProgress: (progressEvent) => {
        // 获取下载进度
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`下载进度：${progress}%`);
      }
    })
    .then((response) => {
      // 创建一个 Blob URL，并触发下载
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // 设置文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // 释放 Blob URL
    })
    .catch((error) => {
      message.error("下载错误：", error);
    });
}
