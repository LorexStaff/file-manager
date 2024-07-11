import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
} from "@mui/material";

interface EditFolderModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (id: string, name: string) => void;
  folderId: string;
  folderName: string;
}

const EditFolderModal: React.FC<EditFolderModalProps> = ({
  open,
  onClose,
  onEdit,
  folderId,
  folderName,
}) => {
  const [name, setName] = useState(folderName);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!name.trim() || !user?.token) {
      return;
    }
    try {
      onEdit(folderId, name);
      setName("");
      onClose();
    } catch (error) {
      console.error("Ошибка редактирования папки:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать папку</DialogTitle>
      <DialogContent>
        <DialogContentText>Введите новое название папки:</DialogContentText>
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
        <Button onClick={handleSubmit}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFolderModal;
