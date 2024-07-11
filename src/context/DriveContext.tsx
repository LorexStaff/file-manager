import React, { createContext, useState, useEffect, useCallback } from "react";
import { DriveItem } from "../types/driveTypes";
import driveService from "../services/driveService";
import { useAuth } from "./AuthContext";

export interface DriveContextProps {
  items: DriveItem[];
  setItems: React.Dispatch<React.SetStateAction<DriveItem[]>>;
  currentFolderId: string;
  folderPath: string[];
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
  fetchFolderContents: (folderId: string) => Promise<void>;
  updateFolderPath: (folderId: string) => void;
  goBack: () => void;
}

export const DriveContext = createContext<DriveContextProps | null>(null);

export const DriveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<DriveItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState("root");
  const [folderPath, setFolderPath] = useState(["root"]);
  const { user } = useAuth();

  const fetchFolderContents = useCallback(
    async (folderId: string) => {
      if (!user?.token) {
        console.error("Пользователь не авторизован");
        return;
      }
      try {
        const folderItems = await driveService.getFolderContents(
          folderId,
          user.token
        );
        setItems(folderItems);
      } catch (error) {
        console.error("Ошибка получения содержимого папки:", error);
      }
    },
    [user?.token]
  );

  const updateFolderPath = useCallback(
    (folderId: string) => {
      const folderIndex = folderPath.indexOf(folderId);
      if (folderIndex === -1) {
        setFolderPath([...folderPath, folderId]);
      } else {
        setFolderPath(folderPath.slice(0, folderIndex + 1));
      }
    },
    [folderPath]
  );

  const goBack = useCallback(() => {
    if (folderPath.length > 1) {
      const newFolderPath = folderPath.slice(0, -1);
      setFolderPath(newFolderPath);
      const newCurrentFolderId = newFolderPath[newFolderPath.length - 1];
      setCurrentFolderId(newCurrentFolderId);
      fetchFolderContents(newCurrentFolderId);
    }
  }, [folderPath, fetchFolderContents]);

  useEffect(() => {
    fetchFolderContents(currentFolderId);
  }, [currentFolderId, fetchFolderContents]);

  return (
    <DriveContext.Provider
      value={{
        items,
        setItems,
        currentFolderId,
        folderPath,
        setCurrentFolderId,
        fetchFolderContents,
        updateFolderPath,
        goBack,
      }}
    >
      {children}
    </DriveContext.Provider>
  );
};
