import axios from "axios";
import { API_URL } from "../api/config";
import { DriveItem, Folder, File } from "../types/driveTypes";

const api = {
  getFolderContents: async (
    folderId: string,
    token: string
  ): Promise<DriveItem[]> => {
    if (token) {
      const response = await axios.get(`${API_URL}drive/folder/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data.children;
    } else {
      return Promise.reject("Пользователь не авторизован");
    }
  },
  createFolder: async (
    name: string,
    parentId: string,
    token: string
  ): Promise<Folder> => {
    if (token) {
      const response = await axios.post(
        `${API_URL}drive/folder`,
        { name, parentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } else {
      return Promise.reject("Пользователь не авторизован");
    }
  },
  editFolder: async (
    folderId: string,
    name: string,
    token: string
  ): Promise<Folder> => {
    if (token) {
      const response = await axios.patch(
        `${API_URL}drive/folder/${folderId}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } else {
      return Promise.reject("Пользователь не авторизован");
    }
  },
  deleteFolder: async (folderId: string, token: string): Promise<string> => {
    if (token) {
      const response = await axios.delete(
        `${API_URL}drive/folder/${folderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.message;
    } else {
      return Promise.reject("Пользователь не авторизован");
    }
  },
  uploadFile: async (
    folderId: string,
    file: Blob,
    token: string
  ): Promise<File> => {
    if (token) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderId", folderId);

      const response = await axios.post(`${API_URL}drive/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      return Promise.reject("Пользователь не авторизован");
    }
  },
  deleteFile: async (fileId: string, token: string): Promise<string> => {
    if (token) {
      const response = await axios.delete(`${API_URL}drive/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.message;
    } else {
      return Promise.reject("Пользователь не авторизован");
    }
  },
  moveFolder: async (folderId: string, newParentId: string, token: string) => {
    if (!token) {
      return Promise.reject("Пользователь не авторизован");
    }
    try {
      const response = await axios.patch(
        `${API_URL}drive/folder/${folderId}`,
        { parentId: newParentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при перемещении папки:", error);
      return Promise.reject(error);
    }
  },
};

export default api;
