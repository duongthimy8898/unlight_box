import DataTable from "datatables.net-react";
import DT, { type ConfigColumns } from "datatables.net-dt";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import InternalUserAddModal from "./components/InternalUserAddModal";
import InternalUserUpdateModal from "./components/InternalUserUpdateModal";
import { LuPencilLine, LuPlus, LuSettings, LuTrash } from "react-icons/lu";

import { toast } from "react-toastify";
import sleep from "../../../utils/Sleep";
import type { Fixture, InternalUser } from "../../../types/data.type";
import InternalUserConfigStreamModal from "./components/InternalUserConfigStreamModal";
const env = import.meta.env;
const InternalUsersPage = () => {
  DataTable.use(DT);
  const [internalUsers, setInternalUsers] = useState<InternalUser[]>([]);
  const columns: ConfigColumns[] = [
    {
      title: "",
      data: null,
      render: (row: InternalUser) =>
        ` <div class="flex flex-col-reverse gap-1 items-center text-xs">
            <img src="${row.avatarUrl}" alt="" class="border w-8 h-8 md:w-12 md:h-12 inline-block" />
          </div>`,
    },
    { title: "#", data: "id" },
    { title: "Tên đăng nhập", data: "username" },
    { title: "Họ tên", data: "name" },
    { title: "Nickname", data: "nickname" },
    { title: "Vai trò", data: "role" },
    { title: "Actions", name: "actions", data: null },
  ];

  useEffect(() => {
    sleep(3000);
    fetchInternalUsers();
  }, []);

  const fetchInternalUsers = async () => {
    // console.log("reload");
    try {
      const res = await axios.get<{ data: InternalUser[] }>(`${env.VITE_SERVER_API_BASE_URL}/internal-users`);
      setInternalUsers(res.data.data);
    } catch (error) {
      console.error("Lỗi khi fetch fixturees:", error);
    }
  };

  const [processingId, setProcessingId] = useState<number | null>(null);
  const [isInternalUserAddModalOpen, setInternalUserAddModal] = useState(false);
  const [isInternalUserUpdateModalOpen, setInternalUserUpdateModal] = useState(false);
  const [isInternalUserConfigStreamModal, setInternalUserConfigStreamModal] = useState(false);

  const handleAdd = () => {
    setInternalUserAddModal(true);
  };

  const handleConfigStream = useCallback((id: number) => {
    setProcessingId(id);
    setInternalUserConfigStreamModal(true);
  }, []);

  const handleEdit = useCallback((id: number) => {
    setProcessingId(id);
    setInternalUserUpdateModal(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      const toastId = toast.loading("Đang xóa...");
      try {
        const response = await axios.delete(`${env.VITE_SERVER_API_BASE_URL}/internal-users/delete/${id}`);
        // await sleep(500);
        const { code, message } = response.data;
        if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
        toast.update(toastId, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: 250,
          onClose: () => fetchInternalUsers(),
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
          <h1 className="text-xl">Tài khoản nội bộ</h1>
          <button className="py-2 px-2 bg-green-700 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white" onClick={handleAdd}>
            <LuPlus />
            <span className="text-xs font-semibold">Thêm tài khoản</span>
          </button>
        </div>
        <DataTable
          options={{
            createdRow: (row, data) => {
              const fixture = data as Fixture;
              if (fixture.isPinned) {
                row.classList.add("text-red-600");
              }
            },
            scrollX: true,
          }}
          slots={{
            actions: (row: InternalUser) => (
              <div className="flex gap-2 whitespace-nowrap">
                <button
                  className="py-2 px-2 bg-gray-200 flex items-center gap-1 whitespace-nowrap cursor-pointer text-gray-700"
                  onClick={() => handleEdit(row.id)}
                >
                  <LuPencilLine />
                  <span className="text-xs font-semibold">Chỉnh sửa</span>
                </button>
                <button
                  hidden={row.role !== "commentator"}
                  className="py-2 px-2 bg-blue-500 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white"
                  onClick={() => handleConfigStream(row.id)}
                >
                  <LuSettings />
                  <span className="text-xs font-semibold">Cấu hình live</span>
                </button>
                <button
                  className="py-2 px-2 bg-red-500 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white"
                  onClick={() => handleDelete(row.id)}
                >
                  <LuTrash />
                  <span className="text-xs font-semibold">Xóa tài khoản</span>
                </button>
              </div>
            ),
          }}
          data={internalUsers}
          columns={columns}
          className="table table-striped table-hover w-full text-sm text-left row-border text-gray-700"
        />
        <InternalUserAddModal
          isOpening={isInternalUserAddModalOpen}
          onClose={() => {
            setInternalUserAddModal(false);
            fetchInternalUsers();
          }}
        />
        <InternalUserUpdateModal
          internalUserId={processingId}
          isOpening={isInternalUserUpdateModalOpen}
          onClose={() => {
            setProcessingId(null);
            setInternalUserUpdateModal(false);
            fetchInternalUsers();
          }}
        />

        <InternalUserConfigStreamModal
          commentatorId={processingId}
          isOpening={isInternalUserConfigStreamModal}
          onClose={() => {
            setProcessingId(null);
            setInternalUserConfigStreamModal(false);
            fetchInternalUsers();
          }}
        />
      </div>
    </>
  );
};

export default InternalUsersPage;
