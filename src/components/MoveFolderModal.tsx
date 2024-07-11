import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

interface MoveFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMove: (folderId: string, newParentId: string) => Promise<void>;
  folders: { id: string; name: string }[];
  itemName: string;
  currentFolderId: string;
}

const MoveFolderModal: React.FC<MoveFolderModalProps> = ({
  isOpen,
  onClose,
  folders,
  onMove,
  itemName,
  currentFolderId,
}) => {
  const [selectedFolder, setSelectedFolder] = useState("");

  const handleMoveClick = () => {
    if (selectedFolder && currentFolderId !== selectedFolder) {
      onMove(currentFolderId, selectedFolder);
      onClose();
    } else {
      console.error(
        "Невозможно переместить папку в саму себя или без выбора нового родителя"
      );
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Переместить папку {itemName}</DialogTitle>
      <DialogContent>
        <Select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value as string)}
          fullWidth
        >
          {folders.map((folder) => (
            <MenuItem key={folder.id} value={folder.id}>
              {folder.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleMoveClick}>Переместить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveFolderModal;
