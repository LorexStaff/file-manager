export interface DriveItem {
  id: string;
  parentId: string;
  name: string;
  type: "folder" | "file";
  file?: {
    name: string;
    filepath: string;
  };
  children?: DriveItem[];
}

export interface Folder {
  id: string;
  name: string;
}

export interface File {
  name: string | undefined;
  id: string;
  file: {
    name: string;
    filepath: string;
  };
}
