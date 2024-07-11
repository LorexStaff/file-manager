import React, { useState } from "react";
import { useDrive } from "../hooks/useDriveHook";
import { useAuth } from "../context/AuthContext";
import driveService from "../services/driveService";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
} from "@mui/material";

interface CreateFolderModalProps {
  open: boolean;
  onClose: () => void;
  parentId: string;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  open,
  onClose,
  parentId,
}) => {
  const [name, setName] = useState("");
  const { fetchFolderContents } = useDrive();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!name.trim() || !user?.token) {
      // Обработайте случай, когда имя папки пустое или пользователь не авторизован
      return;
    }
    try {
      await driveService.createFolder(name, parentId, user.token);
      setName("");
      onClose();
      fetchFolderContents(parentId);
    } catch (error) {
      console.error("Ошибка создания папки:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать папку</DialogTitle>
      <DialogContent>
        <DialogContentText>Введите название папки:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Название"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit}>Создать</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderModal;
