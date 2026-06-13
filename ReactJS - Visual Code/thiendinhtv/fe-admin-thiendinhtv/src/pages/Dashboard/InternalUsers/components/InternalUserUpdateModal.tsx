import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import sleep from "../../../../utils/Sleep";
import type { InternalUser } from "../../../../types/data.type";
const env = import.meta.env;
type Props = {
  isOpening: boolean;
  internalUserId: number | null;
  onClose: () => void;
};

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const InternalUserUpdateModal = ({ isOpening, internalUserId, onClose }: Props) => {
  const [internalUserData, setInternalUserData] = useState<InternalUser | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>("/assets/imgs/placeholder-img.png");
  useEffect(() => {
    if (!isOpening || internalUserId === null) {
      setInternalUserData(null);
      return;
    }

    const fetchData = async () => {
      setInternalUserData(null);
      try {
        const res: AxiosResponse<{ code: number; message: string; data: InternalUser }> = await axios.get(
          `${env.VITE_SERVER_API_BASE_URL}/internal-users/get?by=id&value=${internalUserId}`
        );
        if (res.data.code !== 200) throw new Error(`Error code: ${res.data.code} - Message: ${res.data.message}`);
        setInternalUserData(res.data.data);
        if (res.data.data.avatarUrl != null) setAvatarUrl(res.data.data.avatarUrl);
        else setAvatarUrl(undefined);
      } catch (error) {
        console.error("Failed to fetch match data:", error);
        setInternalUserData(null);
      }
    };
    fetchData();
  }, [isOpening, internalUserId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const toDelete: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && value.trim().length === 0) {
        toDelete.push(key);
      }
    }
    toDelete.forEach((key) => formData.delete(key));
    const submitData = Object.fromEntries(formData.entries());
    const toastId = toast.loading("Đang cập nhật dữ liệu...");
    try {
      const response = await axios.put(`${env.VITE_SERVER_API_BASE_URL}/internal-users/update/${internalUserId}`, submitData);
      await sleep(500);
      const { code, message, data } = response.data;
      if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
      toast.update(toastId, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: 500,
        onClose: () => {
          setIsProcessing(false);
          setInternalUserData(data);
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.update(toastId, {
        render: err.message || "Lỗi không xác định",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        onClose: () => {
          setIsProcessing(false);
        },
      });
    }
  };
  return (
    <AnimatePresence>
      {isOpening && (
        <motion.div
          className="absolute inset-0 flex justify-center px-4 py-4 items-start bg-black/10 z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          // onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[1440px] max-h-full flex flex-col bg-gray-900 shadow-lg rounded"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
          >
            <button
              className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 p-1 text-white bg-red-500 border-2 border-white shadow-lg rounded-full hover:bg-red-700 hover:border-white transition duration-200"
              onClick={onClose}
              aria-label="Close modal"
            >
              <LuX />
            </button>
            <div className="w-full py-5 px-4 bg-yellow-500/10 font-semibold flex-shrink-0 uppercase text-yellow-500">
              <span>Chỉnh sửa tài khoản nội bộ</span>
              <span> - </span>
              <span>Mã tài khoản #{internalUserData?.id}</span>
            </div>
            <div className="flex-1 w-full min-h-[256px] max-h-full py-4 px-4 overflow-auto">
              {internalUserData && (
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="username" className="text-white text-xs">
                        TÊN ĐĂNG NHẬP
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="text"
                        id="username"
                        name="username"
                        value={internalUserData.username}
                        readOnly
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="email" className="text-white text-xs">
                        EMAIL (KHÔNG BẮT BUỘC)
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={internalUserData.email !== null ? internalUserData.email : ""}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="phoneNumber" className="text-white text-xs">
                        SỐ ĐIỆN THOẠI (KHÔNG BẮT BUỘC)
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        defaultValue={internalUserData.phoneNumber !== null ? internalUserData.phoneNumber : ""}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="name" className="text-white text-xs">
                        HỌ TÊN (KHÔNG BẮT BUỘC)
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={internalUserData.name !== null ? internalUserData.name : ""}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="nickname" className="text-white text-xs">
                        NICKNAME (KHÔNG BẮT BUỘC)
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="text"
                        id="nickname"
                        name="nickname"
                        defaultValue={internalUserData.nickname !== null ? internalUserData.nickname : ""}
                      />
                    </div>
                    {/* <div className="w-full flex flex-col gap-2">
                      <label htmlFor="gender" className="text-white text-xs">
                        GIỚI TÍNH (KHÔNG BẮT BUỘC)
                      </label>
                      <select
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        id="gender"
                        name="gender"
                        defaultValue={internalUserData.gender !== null ? internalUserData.gender : ""}
                      >
                        <option value="MALE">NAM</option>
                        <option value="FEMALE">NỮ</option>
                      </select>
                    </div> */}
                    {/* <div className="w-full flex flex-col gap-2" hidden>
                      <label htmlFor="rawPassword" className="text-white text-xs">
                        MẬT KHẨU (NẾU KHÔNG THAY ĐỔI, HÃY ĐỂ TRỐNG)
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="text"
                        id="rawPassword"
                        name="rawPassword"
                      />
                    </div> */}
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="role" className="text-white text-xs">
                        VAI TRÒ
                      </label>
                      <select
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        id="role"
                        name="role"
                        defaultValue={internalUserData.role !== null ? internalUserData.role : ""}
                      >
                        <option value="commentator">BÌNH LUẬN VIÊN</option>
                        <option value="scheduler">NGƯỜI LÊN LỊCH</option>
                        <option value="administrator">QUẢN TRỊ HỆ THỐNG</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full flex gap-4">
                    <img className="w-32 h-32" src={avatarUrl} alt="" />
                    <div className="flex-1 flex flex-col justify-start gap-2">
                      <label htmlFor="avatarUrl" className="text-white text-xs">
                        URL ẢNH ĐẠI DIỆN (KHÔNG BẮT BUỘC)
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="text"
                        id="avatarUrl"
                        name="avatarUrl"
                        defaultValue={internalUserData.avatarUrl !== null ? internalUserData.avatarUrl : ""}
                        onChange={(e) => setAvatarUrl(e.target.value.length > 0 ? e.target.value : "/assets/imgs/placeholder-img.png")}
                      />
                      <div className="flex" hidden>
                        <input
                          className="flex-1 inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-2 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                          type="file"
                        />
                        <button
                          className="w-fit py-2 px-4 bg-green-500 text-white uppercase text-xs font-semibold shadow hover:bg-green-600 transition-colors duration-200"
                          type="button"
                        >
                          TẢI LÊN
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2 bg-yellow-500 text-white uppercase font-semibold shadow hover:bg-yellow-600 transition-colors duration-200"
                      type="submit"
                      disabled={isProcessing}
                    >
                      SAVE
                    </button>
                    <button
                      className="flex-1 py-2 bg-gray-600 text-white uppercase font-semibold shadow hover:bg-gray-700 transition-colors duration-200"
                      type="button"
                      disabled={isProcessing}
                      onClick={onClose}
                    >
                      CLOSE
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InternalUserUpdateModal;
