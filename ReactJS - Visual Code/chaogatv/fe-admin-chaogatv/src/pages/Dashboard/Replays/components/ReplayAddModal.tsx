import { motion, AnimatePresence } from "framer-motion";

import { LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import sleep from "../../../../utils/Sleep";
import "../index.css";
import type { Sport } from "../../../../types/data.type";
const env = import.meta.env;
type Props = {
  isOpening: boolean;
  sportId: number | null;
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

const ReplayAddModal = ({ isOpening, sportId, onClose }: Props) => {
  const [sportData, setSportData] = useState<Sport | null>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | undefined>("/assets/imgs/placeholder-img.png");
  const [videoSrc, setVideoSrc] = useState<string>("/assets/imgs/placeholder-video.mp4");

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnail(url);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  useEffect(() => {
    if (!isOpening || sportId === null) {
      setSportData(null);
      return;
    }

    const fetchData = async () => {
      setSportData(null);
      try {
        const res: AxiosResponse<{ code: number; message: string; data: Sport }> = await axios.get(
          `${env.VITE_SERVER_API_BASE_URL}/sports/get?by=id&value=${sportId}`
        );
        if (res.data.code !== 200) throw new Error(`Error code: ${res.data.code} - Message: ${res.data.message}`);
        setSportData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch sport dataa:", error);
        setSportData(null);
      }
    };
    fetchData();
  }, [isOpening, sportId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget); // giữ nguyên FormData

    const toastId = toast.loading("Đang thêm dữ liệu...");
    try {
      const response = await axios.post(
        `${env.VITE_SERVER_API_BASE_URL}/replays/create`,
        formData, // gửi formData trực tiếp
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await sleep(500);
      const { code, message } = response.data;
      if (code !== 201) throw new Error(message || "Có lỗi xảy ra");

      toast.update(toastId, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: 500,
        onClose: () => {
          setIsProcessing(false);
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
              <span>Thêm trận xem lại {sportData?.name}</span>
            </div>
            <div className="flex-1 w-full min-h-[256px] max-h-full py-4 px-4 overflow-auto">
              <form className="w-full flex flex-col gap-4" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input hidden name="sportId" type="number" value={sportData?.id}></input>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="title" className="text-white text-xs">
                      TIÊU ĐỀ
                    </label>
                    <input
                      className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                      type="text"
                      id="title"
                      name="title"
                    />
                  </div>
                </div>
                <div className="w-full flex gap-4">
                  <img className="w-48 h-32 object-cover" src={thumbnail} alt="Thumbnail preview" />
                  <div className="flex-1 flex flex-col justify-start gap-2">
                    <label htmlFor="thumbnail" className="text-white text-xs">
                      THUMBNAIL
                    </label>
                    <div className="flex">
                      <input
                        className="flex-1 inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-2 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        required
                        onChange={handleThumbnailChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex gap-4">
                  <video className="w-48 h-32" src={videoSrc} controls></video>
                  <div className="flex-1 flex flex-col justify-start gap-2">
                    <label htmlFor="file" className="text-white text-xs">
                      VIDEO
                    </label>
                    <div className="flex">
                      <input
                        className="flex-1 inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-2 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                        type="file"
                        name="file"
                        accept="video/*"
                        required
                        onChange={handleVideoChange}
                      />
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReplayAddModal;
