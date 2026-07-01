import { useState } from "react";
import ContainerLoaderContext from "../contexts/containerLoader.context";

const ContainerLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return <ContainerLoaderContext.Provider value={{ loading, setLoading }}>{children}</ContainerLoaderContext.Provider>;
};

export default ContainerLoaderProvider;
