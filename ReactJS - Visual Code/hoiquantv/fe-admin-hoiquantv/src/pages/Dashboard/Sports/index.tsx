import DataTable from "datatables.net-react";
import DT, { type ConfigColumns } from "datatables.net-dt";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import SportAddModal from "./components/SportAddModal";
import SportUpdateModal from "./components/SportUpdateModal";
import { LuPencilLine, LuPlus, LuTrash } from "react-icons/lu";

import { toast } from "react-toastify";
import sleep from "../../../utils/Sleep";
import type { Sport } from "../../../types/data.type";
const env = import.meta.env;
const SportsPage = () => {
  DataTable.use(DT);
  const [Sports, setSports] = useState<Sport[]>([]);
  const columns: ConfigColumns[] = [
    {
      title: "",
      data: null,
      render: (row: Sport) =>
        ` <div class="flex flex-col-reverse gap-1 items-center text-xs">
            <img src="${row.iconUrl}" alt="" class="border w-8 h-8 md:w-12 md:h-12 inline-block" />
          </div>`,
    },
    { title: "#", data: "id" },
    { title: "Ưu tiên", data: "priority" },
    { title: "Tên", data: "name" },
    { title: "Actions", name: "actions", data: null },
  ];

  useEffect(() => {
    sleep(3000);
    fetchSports();
  }, []);

  const fetchSports = async () => {
    // console.log("reload");
    try {
      const res = await axios.get<{ data: Sport[] }>(`${env.VITE_SERVER_API_BASE_URL}/sports`);
      setSports(res.data.data);
    } catch (error) {
      console.error("Lỗi khi fetch sport:", error);
    }
  };

  const [processingId, setProcessingId] = useState<number | null>(null);
  const [isSportAddModalOpen, setSportAddModal] = useState(false);
  const [isSportUpdateModalOpen, setSportUpdateModal] = useState(false);

  const handleAdd = () => {
    setSportAddModal(true);
  };

  const handleEdit = useCallback((id: number) => {
    setProcessingId(id);
    setSportUpdateModal(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa môn này?")) {
      const toastId = toast.loading("Đang xóa...");
      try {
        const response = await axios.delete(`${env.VITE_SERVER_API_BASE_URL}/sports/delete/${id}`);
        // await sleep(500);
        const { code, message } = response.data;
        if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
        toast.update(toastId, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: 250,
          onClose: () => fetchSports(),
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
  }, []);

  return (
    <>
      <div className="w-full shadow p-4 bg-gray-100">
        <div className="w-full flex justify-between items-center py-2">
          <h1 className="text-xl">Môn thể thao</h1>
          <button className="py-2 px-2 bg-green-700 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white" onClick={handleAdd}>
            <LuPlus />
            <span className="text-xs font-semibold">Thêm bộ môn mới</span>
          </button>
        </div>
        <DataTable
          options={{
            scrollX: true,
          }}
          slots={{
            actions: (row: Sport) => (
              <div className="flex gap-2 whitespace-nowrap">
                <button
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
                  <span className="text-xs font-semibold">Xóa môn</span>
                </button>
              </div>
            ),
          }}
          data={Sports}
          columns={columns}
          className="table table-striped table-hover w-full text-sm text-left row-border text-gray-700"
        />
        <SportAddModal
          isOpening={isSportAddModalOpen}
          onClose={() => {
            setSportAddModal(false);
            fetchSports();
          }}
        />
        <SportUpdateModal
          targetId={processingId}
          isOpening={isSportUpdateModalOpen}
          onClose={() => {
            setProcessingId(null);
            setSportUpdateModal(false);
            fetchSports();
          }}
        />
      </div>
    </>
  );
};

export default SportsPage;
