import React from "react";
import { DriveItem } from "../types/driveTypes";
import {
  ListItem,
  IconButton,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";

const FileItem: React.FC<{
  item: DriveItem;
  onDelete: (id: string, name: string, type: string) => void;
}> = ({ item, onDelete }) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon>
        {item.type === "file" ? <InsertDriveFileIcon /> : <FolderIcon />}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight="bold">
            {item.name}
          </Typography>
        }
      />
      <IconButton
        edge="end"
        onClick={() => onDelete(item.id, item.name, item.type)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default FileItem;
