import { useEffect, useMemo, useState, type ReactNode } from "react";
import useAuthModal, { AuthModalCtx, type Ctx } from "../hooks/useAuthModal";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import axiosCustom from "../services/axiosCustom";

function LoginForm() {
  const { closeAuthModal, setCurrentForm } = useAuthModal();
  const { login } = useAuth();
  const [isHandling, setHandling] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fData = new FormData(e.currentTarget);
    try {
      setHandling(true);

      await login((fData.get("identifier") ?? "").toString(), (fData.get("rawPassword") ?? "").toString());
      toast.success("Đăng nhập thành công");
      closeAuthModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại!");
    } finally {
      setHandling(false);
    }
  };
  return (
    <form className="w-full py-4 px-4 space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-center text-blue-400">Đăng nhập</h1>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Tên đăng nhập hoặc số điện thoại</label>
        <input name="identifier" className="w-full rounded border-none bg-black/30 p-2 text-sm text-white outline-none" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Mật khẩu</label>
        <input type="password" name="rawPassword" className="w-full rounded border-none bg-black/30 p-2 text-sm text-white outline-none" />
      </div>

      <button
        disabled={isHandling}
        type="submit"
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 font-semibold text-white shadow transition"
      >
        Đăng nhập
      </button>

      <p className="text-xs text-center text-gray-500 space-x-1">
        <span>Chưa có tài khoản</span>
        <button type="button" onClick={() => setCurrentForm?.(<RegisterForm />)} className="text-blue-400 hover:underline">
          Đăng ký tham gia
        </button>
      </p>
    </form>
  );
}

function RegisterForm() {
  const { closeAuthModal, setCurrentForm } = useAuthModal();
  const [isHandling, setHandling] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fData);
    try {
      setHandling(true);
      const res = await axiosCustom.post("/auth/register", payload);
      if (res.status !== 201) throw Error(res.data.message);
      toast.success("Đăng ký thành công");
      closeAuthModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại!");
    } finally {
      setHandling(false);
    }
  };
  return (
    <form className="w-full py-4 px-4 space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-center text-blue-400">Đăng ký tài khoản mới</h1>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Tên</label>
        <input name="name" className="w-full rounded border-none bg-black/30 p-2 text-sm text-white outline-none" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Tên đăng nhập</label>
        <input name="username" className="w-full rounded border-none bg-black/30 p-2 text-sm text-white outline-none" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Số điện thoại</label>
        <input name="phoneNumber" className="w-full rounded border-none bg-black/30 p-2 text-sm text-white outline-none" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">Mật khẩu</label>
        <input type="password" name="rawPassword" className="w-full rounded border-none bg-black/30 p-2 text-sm text-white outline-none" />
      </div>

      <button
        disabled={isHandling}
        type="submit"
        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 font-semibold text-white shadow transition"
      >
        Đăng ký ngay
      </button>

      <p className="text-xs text-center text-gray-500 space-x-1">
        <span>Đã có tài khoản</span>
        <button type="button" onClick={() => setCurrentForm?.(<LoginForm />)} className="text-blue-400 hover:underline">
          Đăng nhập ngay
        </button>
      </p>
    </form>
  );
}

export default function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState<ReactNode>(<LoginForm />);
  const api = useMemo<Ctx>(
    () => ({
      openAuthModal: () => setOpen(true),
      closeAuthModal: () => setOpen(false),
      setCurrentForm,
    }),
    []
  );

  // lock scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // esc to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <AuthModalCtx.Provider value={api}>
      {children}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="login-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />
              <motion.div
                key="login-panel"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="fixed left-1/2 top-1/2 z-[101] !-translate-x-1/2 !-translate-y-1/2 w-full h-screen max-w-[640px] p-4 flex justify-center items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-2xl h-auto max-h-full shadow shadow-[#04133c] bg-[#04133c] overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/10">
                    <h2 className="text-lg font-semibold text-white">Chào mừng bạn tham gia!</h2>
                    <button onClick={() => setOpen(false)} className="px-3 py-1 rounded-xl text-red-800 text-sm bg-slate-800 hover:bg-slate-700">
                      Đóng
                    </button>
                  </div>
                  <div className="bg-[#04133c]">{currentForm}</div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </AuthModalCtx.Provider>
  );
}
