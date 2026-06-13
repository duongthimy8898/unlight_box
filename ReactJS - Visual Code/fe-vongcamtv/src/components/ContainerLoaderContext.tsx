import React, { createContext, useState } from "react";

const ContainerLoaderContext = createContext<{
  loading: boolean;
  setLoading: (value: boolean) => void;
} | null>(null);

const ContainerLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return <ContainerLoaderContext.Provider value={{ loading, setLoading }}>{children}</ContainerLoaderContext.Provider>;
};

export default ContainerLoaderProvider;
