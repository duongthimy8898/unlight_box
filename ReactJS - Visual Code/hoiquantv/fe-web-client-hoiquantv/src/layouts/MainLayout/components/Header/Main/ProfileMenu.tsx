import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useAuth } from "../../../../../hooks/useAuth";
import useAuthModal from "../../../../../hooks/useAuthModal";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout, isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();

  // Đóng khi click ra ngoài hoặc nhấn ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="relative z-30 inline-block" ref={menuRef}>
      {/* Nút Profile */}
      <button
        onClick={() => (isAuthenticated ? setOpen((p) => !p) : openAuthModal())}
        className={clsx(
          "flex items-center gap-2 border-2 border-blue-500 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400"
        )}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="avatar" className="w-8 aspect-square rounded-full" />
      </button>

      {/* Popup Menu (tone tối + animation) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -5, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 origin-top-right z-40"
          >
            <div className="bg-neutral-900 border border-neutral-800 text-gray-200 rounded-xl shadow-2xl overflow-hidden backdrop-blur-lg">
              <ul className="py-1 text-sm">
                {/* <MenuItem text="My Account" />
                <MenuItem text="Settings" /> */}
                <li
                  tabIndex={0}
                  className={clsx("px-4 py-2 text-sm cursor-pointer select-none focus:outline-none", "text-red-400 hover:bg-red-500/10 hover:text-red-300")}
                  onClick={() => logout()}
                >Đăng xuất</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
