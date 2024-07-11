import React from "react";
import { DriveItem } from "../types/driveTypes";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoveIcon from "@mui/icons-material/MoveToInbox";
import { useDrive } from "../hooks/useDriveHook";

const FolderItem: React.FC<{
  item: DriveItem;
  onEdit: (id: string, name: string) => void;
  onMove: (id: string, newParentId: string) => void;
  onDelete: (id: string, name: string, type: string) => void;
}> = ({ item, onEdit, onMove, onDelete }) => {
  const { setCurrentFolderId } = useDrive();

  const handleFolderClick = () => {
    setCurrentFolderId(item.id);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleFolderClick}>
        <ListItemIcon>
          {item.type === "folder" ? <FolderIcon /> : <InsertDriveFileIcon />}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body1" fontWeight="bold">
              {item.name}
            </Typography>
          }
        />
      </ListItemButton>
      <IconButton edge="end" onClick={() => onEdit(item.id, item.name)}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" onClick={() => onMove(item.id, item.parentId)}>
        <MoveIcon />
      </IconButton>
      <IconButton
        edge="end"
        onClick={() => onDelete(item.id, item.name, item.type)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default FolderItem;
