import { useContext } from "react";
import ContainerLoaderContext from "../contexts/containerLoader.context";

const useContainerLoader = () => {
  const ctx = useContext(ContainerLoaderContext);
  if (!ctx) {
    throw new Error("useContainerLoader must be used within ContainerLoaderProvider");
  }
  return ctx;
};

export default useContainerLoader;
