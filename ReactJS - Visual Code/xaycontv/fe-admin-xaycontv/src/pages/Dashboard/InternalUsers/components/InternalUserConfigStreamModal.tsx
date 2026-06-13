import { motion, AnimatePresence } from "framer-motion";
import { LuTrash, LuX } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import sleep from "../../../../utils/Sleep";
import DataTable from "datatables.net-react";
import DT, { type ConfigColumns } from "datatables.net-dt";
import "../index.css";
import type { InternalUser, StreamSource } from "../../../../types/data.type";
const env = import.meta.env;
type Props = {
  isOpening: boolean;
  commentatorId: number | null;
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

const InternalUserConfigStreamModal = ({ isOpening, commentatorId, onClose }: Props) => {
  DataTable.use(DT);
  const [streamsData, setStreamsData] = useState<StreamSource[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchStreamsData = useCallback(async () => {
    setStreamsData([]);
    try {
      const res = await axios.get<{ code: number; message: string; data: InternalUser }>(
        `${env.VITE_SERVER_API_BASE_URL}/internal-users/get?by=id&value=${commentatorId}`
      );
      setStreamsData(res.data.data.streams);
    } catch (error) {
      console.error("Failed to fetch fixture data:", error);
      setStreamsData([]);
    }
  }, [commentatorId]);

  useEffect(() => {
    if (!isOpening || commentatorId === null) {
      setStreamsData([]);
      return;
    }
    fetchStreamsData();
  }, [isOpening, commentatorId, fetchStreamsData]);

  const handleDelete = async (streamId: number) => {
    if (confirm("Bạn có chắc muốn xóa luồng này?")) {
      const toastId = toast.loading("Đang xóa...");
      try {
        const response = await axios.delete(`${env.VITE_SERVER_API_BASE_URL}/stream-sources/delete/${streamId}`);
        await sleep(500);
        const { code, message } = response.data;
        if (code !== 204) throw new Error(message || "Có lỗi xảy ra");
        toast.update(toastId, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: 500,
          onClose: () => fetchStreamsData(),
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.update(toastId, {
          render: err.message || "Lỗi không xác định",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsProcessing(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submitData = Object.fromEntries(formData.entries());
    const toastId = toast.loading("Đang thêm luồng...");
    try {
      const response = await axios.post(`${env.VITE_SERVER_API_BASE_URL}/stream-sources/create`, submitData);
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
          fetchStreamsData();
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
          fetchStreamsData();
        },
      });
    }
  };

  const columns: ConfigColumns[] = [
    { title: "#", data: "id" },
    { title: "ƯU TIÊN", data: "priority" },
    { title: "TÊN LUỒNG", data: "name" },
    { title: "URL NGUỒN PHÁT", data: "sourceUrl" },
    { title: "ACTIONS", name: "actions", data: null },
  ];

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
              <span>Luồng trực tiếp</span>
              <span> - </span>
              <span>Mã BLV #{commentatorId}</span>
            </div>
            <div className="flex-1 w-full min-h-[256px] max-h-full py-4 px-4 overflow-auto">
              <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="streamSourceType" className="text-white text-xs">
                      MÃ BLV
                    </label>
                    <input
                      className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                      type="text"
                      id="commentatorId"
                      name="commentatorId"
                      defaultValue={commentatorId?.toString()}
                      readOnly={true}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="streamName" className="text-white text-xs">
                      TÊN LUỒNG
                    </label>
                    <input
                      className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                      type="text"
                      id="streamName"
                      name="name"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="streamSourceType" className="text-white text-xs">
                      ƯU TIÊN
                    </label>
                    <input
                      className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                      type="number"
                      id="priority"
                      name="priority"
                      defaultValue={0}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="streamSourceUrl" className="text-white text-xs">
                    URL NGUỒN PHÁT
                  </label>
                  <input
                    className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                    type="text"
                    id="streamSourceUrl"
                    name="sourceUrl"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2 bg-yellow-500 text-white uppercase font-semibold shadow hover:bg-yellow-600 transition-colors duration-200"
                    type="submit"
                    disabled={isProcessing}
                  >
                    ADD
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
              <div className="mt-4 w-full bg-gray-200 px-2 py-2">
                <DataTable
                  options={{
                    lengthChange: false,
                    info: false,
                    pageLength: 5,
                    searching: false,
                  }}
                  slots={{
                    actions: (row: StreamSource) => (
                      <div className="flex gap-2 whitespace-nowrap">
                        <button
                          className="py-2 px-2 bg-red-500 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white"
                          onClick={() => handleDelete(row.id)}
                        >
                          <LuTrash />
                          <span className="text-xs font-semibold">Xóa luồng</span>
                        </button>
                      </div>
                    ),
                  }}
                  data={streamsData}
                  columns={columns}
                  className="table table-striped table-hover w-full text-sm text-left row-border text-gray-700"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InternalUserConfigStreamModal;
