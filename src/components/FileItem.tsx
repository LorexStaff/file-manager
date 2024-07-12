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

interface FileItemProps {
  item: DriveItem;
  onDelete: (id: string, name: string, type: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ item, onDelete }) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon>
        <InsertDriveFileIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight="bold">
            {item.file?.name}
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
