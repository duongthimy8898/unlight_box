import DataTable from "datatables.net-react";
import DT, { type ConfigColumns } from "datatables.net-dt";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import ReplayAddModal from "./components/ReplayAddModal";
import ReplayUpdateModal from "./components/ReplayUpdateModal";
import { LuPencilLine, LuPlus, LuTrash, LuView } from "react-icons/lu";

import { toast } from "react-toastify";
import type { Replay, Sport } from "../../../types/data.type";
import { Link, useSearchParams } from "react-router-dom";
import clsx from "clsx";
const env = import.meta.env;
const ReplaysPage = () => {
  DataTable.use(DT);
  const [searchParams] = useSearchParams();
  const [sports, setSports] = useState<Sport[]>([]);
  const sportId = searchParams.get("sportId") || sports[0]?.slug || undefined;
  const [currentSport, setCurrentSport] = useState<Sport>();
  const [replays, setReplays] = useState<Replay[]>([]);
  const [filteredReplays, setFilteredReplays] = useState<Replay[]>([]);

  const fetchReplays = useCallback(async () => {
    try {
      const res = await axios.get<{ data: Replay[] }>(`${env.VITE_SERVER_API_BASE_URL}/replays`);
      setReplays(res.data.data);
    } catch (error) {
      console.error("Lỗi khi fetch sport:", error);
    }
  }, []);

  useEffect(() => {
    fetchReplays();
  }, [fetchReplays]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await axios.get<{ data: Sport[] }>(`${env.VITE_SERVER_API_BASE_URL}/sports`);
        setSports(res.data.data);
      } catch (error) {
        console.error("Lỗi khi fetch sport:", error);
      }
    };
    fetchSports();
  }, [sportId]);

  useEffect(() => {
    setCurrentSport(sports.find((s) => s.id.toString() === sportId));
  }, [sports, sportId]);

  useEffect(() => {
    setFilteredReplays(currentSport?.id === undefined ? replays : replays.filter((l) => l.sport.id === currentSport?.id));
  }, [currentSport, replays]);

  const [processingId, setProcessingId] = useState<number | null>(null);
  const [isReplayAddModalOpen, setReplayAddModal] = useState(false);
  const [isReplayUpdateModalOpen, setReplayUpdateModal] = useState(false);

  const handleAdd = () => {
    if (currentSport?.id) {
      setProcessingId(currentSport.id ?? null);
      setReplayAddModal(true);
    } else toast.error("Phải chọn 1 bộ môn nào đó đã :))", { closeButton: false });
  };

  const handleEdit = useCallback((id: number) => {
    setProcessingId(id);
    setReplayUpdateModal(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm("Bạn có chắc muốn xóa video này?")) {
        const toastId = toast.loading("Đang xóa...");
        try {
          const response = await axios.delete(`${env.VITE_SERVER_API_BASE_URL}/replays/delete/${id}`);
          // await sleep(500);
          const { code, message } = response.data;
          if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
          toast.update(toastId, {
            render: message,
            type: "success",
            isLoading: false,
            autoClose: 250,
            onClose: () => fetchReplays(),
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
    },
    [fetchReplays]
  );

  const columns: ConfigColumns[] = [
    {
      title: "",
      data: null,
      render: (row: Replay) =>
        ` <div class="flex flex-col-reverse gap-1 items-center text-xs">
            <img src="${row.thumbnailUrl}" alt="" class="cursor-pointer border w-8 h-4.5 md:w-32 md:h-18 inline-block" onclick="window.open('${row.thumbnailUrl}', '_blank')" />
          </div>`,
    },
    { title: "#", data: "id" },
    { title: "Tiêu đề", data: "title" },
    { title: "Actions", name: "actions", data: null },
  ];

  return (
    <>
      <div className="w-full shadow p-4 bg-gray-100">
        <div className="w-full flex gap-2 overflow-auto ">
          <Link
            to={`/dashboard/replays`}
            className={clsx(
              "flex gap-2 py-2 px-3 text-sm rounded font-semibold",
              currentSport?.id === undefined ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            )}
          >
            <span>Tất cả</span>
          </Link>
          {sports.map((s, idx) => (
            <Link
              key={idx}
              to={`?sportId=${s.id}`}
              className={clsx(
                "flex gap-2 py-2 px-3 text-sm rounded font-semibold",
                s.id === currentSport?.id ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              )}
            >
              {s.iconUrl && <img className="w-5 h-5" src={s.iconUrl} alt="" />}
              <span>{s.name}</span>
            </Link>
          ))}
        </div>
        <div className="w-full flex justify-between items-center py-2">
          <h1 className="text-xl">Giải đấu {currentSport?.name}</h1>
          <button className="py-2 px-2 bg-green-700 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white" onClick={handleAdd}>
            <LuPlus />
            <span className="text-xs font-semibold">Thêm mới</span>
          </button>
        </div>
        <DataTable
          options={{
            scrollX: true,
          }}
          slots={{
            actions: (row: Replay) => (
              <div className="flex gap-2 whitespace-nowrap">
                <button
                  className="py-2 px-2 bg-gray-200 flex items-center gap-1 whitespace-nowrap cursor-pointer text-gray-700"
                  onClick={() => window.open(`https://hoiquan.live/xem-lai/${row.sport?.slug}/${row.slug}/${row.id}`, "_blank")}
                >
                  <LuView />
                  <span className="text-xs font-semibold">Xem</span>
                </button>
                <button
                  hidden
                  className="py-2 px-2 bg-gray-200 flex items-center gap-1 whitespace-nowrap cursor-pointer text-gray-700"
                  onClick={() => handleEdit(row.id)}
                >
                  <LuPencilLine />
                  <span className="text-xs font-semibold">Chỉnh sửa</span>
                </button>

                <button
                  className="py-2 px-2 bg-red-500 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white"
                  onClick={() => handleDelete(row.id)}
                >
                  <LuTrash />
                  <span className="text-xs font-semibold">Xóa</span>
                </button>
              </div>
            ),
          }}
          data={filteredReplays}
          columns={columns}
          className="table table-striped table-hover w-full text-sm text-left row-border text-gray-700"
        />
        <ReplayAddModal
          isOpening={isReplayAddModalOpen}
          sportId={processingId}
          onClose={() => {
            setReplayAddModal(false);
            fetchReplays();
          }}
        />
        <ReplayUpdateModal
          targetId={processingId}
          isOpening={isReplayUpdateModalOpen}
          onClose={() => {
            setProcessingId(null);
            setReplayUpdateModal(false);
            fetchReplays();
          }}
        />
      </div>
    </>
  );
};

export default ReplaysPage;
