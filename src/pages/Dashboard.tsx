import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useDrive } from "../hooks/useDriveHook";
import CreateFolderModal from "../components/CreateFolderModal";
import CreateFileModal from "../components/CreateFileModal";
import EditFolderModal from "../components/EditFolderModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import MoveFolderModal from "../components/MoveFolderModal";
import FolderItem from "../components/FolderItem";
import FileItem from "../components/FileItem";
import { Box, Button, Typography, Stack } from "@mui/material";
import Header from "../components/Header";
import api from "../services/driveService";

const HomePage: React.FC = () => {
  const {
    items,
    currentFolderId,
    folderPath,
    fetchFolderContents,
    updateFolderPath,
    goBack,
  } = useDrive();
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [isMoveFolderModalOpen, setIsMoveFolderModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [, setSelectedFile] = useState<File | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.token && currentFolderId) {
      fetchFolderContents(currentFolderId);
      updateFolderPath(currentFolderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, currentFolderId]);

  const handleDeleteItem = (id: string, name: string) => {
    setSelectedFolderId(id);
    setSelectedItemName(name);
    setIsDeleteConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!user?.token || !selectedFolderId) return;
    try {
      const itemType = items.find((item) => item.id === selectedFolderId)?.type;
      if (itemType === "folder") {
        await api.deleteFolder(selectedFolderId, user.token);
      } else {
        await api.deleteFile(selectedFolderId, user.token);
      }
      fetchFolderContents(currentFolderId);
      setIsDeleteConfirmationModalOpen(false);
    } catch (error) {
      console.error(`Ошибка удаления:`, error);
    }
  };

  const handleEdit = async (id: string, name: string) => {
    if (!name.trim() || !user?.token) {
      return;
    }
    try {
      setIsEditFolderModalOpen(true);
      await api.editFolder(id, name, user.token);
      fetchFolderContents(currentFolderId);
      setSelectedFolderId(id);
    } catch (error) {
      console.error("Ошибка редактирования папки:", error);
    }
  };

  const handleUploadFile = async (file: File) => {
    console.log("Загрузка файла:", file);
    console.log("Folder ID:", currentFolderId);
    if (!user?.token || !currentFolderId || !file) return;
    try {
      console.log("Отправка файла на сервер");
      const response = await api.uploadFile(currentFolderId, file, user.token);
      console.log("Ответ сервера:", response);
      fetchFolderContents(currentFolderId);
      setSelectedFile(null);
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
    }
  };

  const handleMoveFolder = (folderId: string, name: string) => {
    setSelectedFolderId(folderId);
    setSelectedItemName(name);
    setIsMoveFolderModalOpen(true);
  };

  return (
    <>
      <Header />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Мой диск
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Button
            variant="contained"
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            Создать папку
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsCreateFileModalOpen(true)}
          >
            Загрузить файл
          </Button>
          {folderPath.length > 1 && (
            <Button variant="contained" onClick={goBack}>
              Назад
            </Button>
          )}
        </Stack>
        {items.map((item) =>
          item.type === "folder" ? (
            <FolderItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onMove={(id: string) => handleMoveFolder(id, item.name)}
              onDelete={handleDeleteItem}
            />
          ) : (
            <FileItem key={item.id} item={item} onDelete={handleDeleteItem} />
          )
        )}

        <CreateFolderModal
          open={isCreateFolderModalOpen}
          onClose={() => setIsCreateFolderModalOpen(false)}
          parentId={currentFolderId}
        />
        <CreateFileModal
          open={isCreateFileModalOpen}
          onClose={() => setIsCreateFileModalOpen(false)}
          onUploadFile={handleUploadFile}
        />

        <EditFolderModal
          open={isEditFolderModalOpen}
          onClose={() => setIsEditFolderModalOpen(false)}
          folderId={selectedFolderId}
          folderName={selectedItemName}
          onEdit={handleEdit}
        />
        <DeleteConfirmationModal
          open={isDeleteConfirmationModalOpen}
          onClose={() => setIsDeleteConfirmationModalOpen(false)}
          onDelete={confirmDelete}
          itemName={selectedItemName}
        />
        <MoveFolderModal
          isOpen={isMoveFolderModalOpen}
          onClose={() => setIsMoveFolderModalOpen(false)}
          onMove={async (newParentId) =>
            handleMoveFolder(selectedFolderId, newParentId)
          }
          folders={items.filter((item) => item.type === "folder")}
          itemName={selectedItemName}
          currentFolderId={currentFolderId}
        />
      </Box>
    </>
  );
};

export default HomePage;
