import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  FormControl,
  FormHelperText,
  DialogActions,
} from "@mui/material";

interface CreateFileModalProps {
  open: boolean;
  onClose: () => void;
  onUploadFile: (file: File) => void;
}

const CreateFileModal: React.FC<CreateFileModalProps> = ({
  open,
  onClose,
  onUploadFile,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onUploadFile(file);
      onClose();
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Загрузить файл</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Input id="file-upload" type="file" onChange={handleFileChange} />
          {file && <FormHelperText>Выбран файл: {file.name}</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit}>Загрузить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFileModal;
