import { useContext } from "react";
import ContainerLoaderContext from "../contexts/ContainerLoader.context";

export function useContainerLoader() {
  const ctx = useContext(ContainerLoaderContext);
  if (!ctx) {
    throw new Error("useContainerLoader must be used inside a ContainerLoaderProvider");
  }
  return ctx;
}
