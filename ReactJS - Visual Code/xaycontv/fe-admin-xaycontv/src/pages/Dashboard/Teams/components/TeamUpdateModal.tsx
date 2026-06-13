import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import sleep from "../../../../utils/Sleep";
import type { League } from "../../../../types/data.type";
const env = import.meta.env;
type Props = {
  isOpening: boolean;
  targetId: number | null;
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

const TeamUpdateModal = ({ isOpening, targetId, onClose }: Props) => {
  const [leagueData, setLeagueData] = useState<League | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | undefined>("/assets/imgs/placeholder-img.png");

  useEffect(() => {
    if (!isOpening || targetId === null) {
      setLeagueData(null);
      return;
    }

    const fetchData = async () => {
      setLeagueData(null);
      try {
        const res: AxiosResponse<{ code: number; message: string; data: League }> = await axios.get(
          `${env.VITE_SERVER_API_BASE_URL}/teams/get?by=id&value=${targetId}`
        );
        if (res.data.code !== 200) throw new Error(`Error code: ${res.data.code} - Message: ${res.data.message}`);
        setLeagueData(res.data.data);
        if (res.data.data.logoUrl != null) setLogoUrl(res.data.data.logoUrl);
        else setLogoUrl(undefined);
      } catch (error) {
        console.error("Failed to fetch league dataa:", error);
        setLeagueData(null);
      }
    };
    fetchData();
  }, [isOpening, targetId]);

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
      const response = await axios.put(`${env.VITE_SERVER_API_BASE_URL}/teams/update/${targetId}`, submitData);
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
          setLeagueData(data);
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
              <span>Chỉnh sửa thông tin đội tuyển {leagueData?.sport.name}</span>
              <span> - </span>
              <span>Mã đội #{leagueData?.id}</span>
            </div>
            <div className="flex-1 w-full min-h-[256px] max-h-full py-4 px-4 overflow-auto">
              {leagueData && (
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="name" className="text-white text-xs">
                        TÊN ĐỘI
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={leagueData.name}
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-4">
                    <img className="w-32 h-32" src={logoUrl} alt="" />
                    <div className="flex-1 flex flex-col justify-start gap-2">
                      <label htmlFor="logoUrl" className="text-white text-xs">
                        LOGO (KHÔNG BẮT BUỘC)
                      </label>
                      <input
                        className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="text"
                        id="logoUrl"
                        name="logoUrl"
                        defaultValue={leagueData.logoUrl ?? ""}
                        onChange={(e) => setLogoUrl(e.target.value.length > 0 ? e.target.value : "/assets/imgs/placeholder-img.png")}
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

export default TeamUpdateModal;
