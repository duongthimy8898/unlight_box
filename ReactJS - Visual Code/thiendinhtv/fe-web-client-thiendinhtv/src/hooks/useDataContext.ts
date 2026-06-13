import { useContext } from "react";
import { DataContext } from "../contexts/Data.context";

export function useDataContext() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useDataContext must be used inside a DataProvider");
  }
  return ctx;
}
