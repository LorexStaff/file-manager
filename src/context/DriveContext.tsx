import React, { createContext, useState, useEffect, useCallback } from "react";
import { DriveItem } from "../types/driveTypes";
import driveService from "../services/driveService";
import { useAuth } from "./AuthContext";

export interface DriveContextProps {
  items: DriveItem[];
  setItems: React.Dispatch<React.SetStateAction<DriveItem[]>>;
  currentFolderId: string;
  setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
  fetchFolderContents: (folderId: string) => Promise<void>;
}

export const DriveContext = createContext<DriveContextProps | null>(null);

export const DriveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<DriveItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState("root");
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

  useEffect(() => {
    fetchFolderContents(currentFolderId);
  }, [currentFolderId, fetchFolderContents]);

  return (
    <DriveContext.Provider
      value={{
        items,
        setItems,
        currentFolderId,
        setCurrentFolderId,
        fetchFolderContents,
      }}
    >
      {children}
    </DriveContext.Provider>
  );
};
