import { createContext, useContext } from "react";

type Ctx = {
  openAuthModal: (opts?: { next?: string }) => void;
  closeAuthModal: () => void;
  setCurrentForm?: (form: React.ReactNode) => void; // 👈 thêm dòng này
};
const AuthModalCtx = createContext<Ctx | null>(null);

function useAuthModal() {
  const ctx = useContext(AuthModalCtx);
  if (!ctx) throw new Error("useAuthModal must be used within <AuthModalProvider>");
  return ctx;
}

export default useAuthModal;
export { AuthModalCtx };
export type { Ctx };
