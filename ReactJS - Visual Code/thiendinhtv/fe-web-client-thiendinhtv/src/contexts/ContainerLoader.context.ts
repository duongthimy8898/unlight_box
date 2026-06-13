import { createContext } from "react";

const ContainerLoaderContext = createContext<{
  loading: boolean;
  setLoading: (value: boolean) => void;
} | null>(null);

export default ContainerLoaderContext;
