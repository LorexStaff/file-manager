import { useContext } from "react";
import { DriveContext } from "../context/DriveContext";

export const useDrive = () => {
  const context = useContext(DriveContext);
  if (!context) {
    throw new Error("DriveContext must be used within a DriveProvider");
  }
  return context;
};
