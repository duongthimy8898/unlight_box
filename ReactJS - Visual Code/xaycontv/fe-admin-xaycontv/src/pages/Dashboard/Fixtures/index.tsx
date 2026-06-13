import DataTable from "datatables.net-react";
import DT, { type ConfigColumns } from "datatables.net-dt";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { LuArrowUp10, LuFlame, LuFlameKindling, LuPencilLine, LuPin, LuPinOff, LuPlus, LuRadio, LuTrash } from "react-icons/lu";
import clsx from "clsx";
import { toast } from "react-toastify";
import type { Fixture, Sport } from "../../../types/data.type";
import { Link, useSearchParams } from "react-router-dom";
import FixtureAddModal from "./components/FixtureAddModal";
import FixtureUpdateModal from "./components/FixtureUpdateModal";
import { format } from "date-fns";
import FixtureUpdateScoreModal from "./components/FixtureUpdateScore";
import { useAuth } from "../../../hooks/useAuth.hook";
const env = import.meta.env;
const FixturesPage = () => {
  DataTable.use(DT);
  const [searchParams] = useSearchParams();
  const [sports, setSports] = useState<Sport[]>([]);
  const [currentSport, setCurrentSport] = useState<Sport>();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [filteredFixtures, setFilteredFixtures] = useState<Fixture[]>([]);
  const sportId = searchParams.get("sportId") || sports[0]?.slug || undefined;

  const auth = useAuth();

  const fetchFixtures = useCallback(async () => {
    try {
      const res = await axios.get<{ data: Fixture[] }>(`${env.VITE_SERVER_API_BASE_URL}/fixtures`);
      const fData = res.data.data as Fixture[];
      fData.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      if (auth.user && auth.user?.role === "commentator") {
        const forBLV = fData.filter((f) => f.fixtureCommentators.map((fc) => fc.commentator.id).includes(auth.user!.id));
        setFixtures(forBLV);
      } else {
        setFixtures(fData);
      }
      // console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [auth.user]);

  useEffect(() => {
    fetchFixtures();
  }, [fetchFixtures]);

  useEffect(() => {
    const fetchSports = async () => {
      // console.log("reload");
      try {
        const res = await axios.get<{ data: Sport[] }>(`${env.VITE_SERVER_API_BASE_URL}/sports`);
        const rawSports = res.data.data;
        setSports(rawSports);
      } catch (error) {
        console.error("Lỗi khi fetch sports:", error);
      }
    };
    fetchSports();
  }, []);

  useEffect(() => {
    setCurrentSport(sports.find((s) => s.id.toString() === sportId));
  }, [sportId, sports]);

  useEffect(() => {
    setFilteredFixtures(currentSport?.id === undefined ? fixtures : fixtures.filter((f) => f.sport.id === currentSport?.id));
  }, [currentSport, fixtures]);

  const [processingId, setProcessingId] = useState<number | null>(null);
  const [isFixtureAddModalOpen, setFixtureAddModal] = useState(false);
  const [isFixtureUpdateModalOpen, setFixtureUpdateModal] = useState(false);
  const [isFixtureUpdateScoreModalOpen, setFixtureUpdateScoreModal] = useState(false);

  const handleAct = useCallback(
    async (id: number, act: string) => {
      const toastId = toast.loading(`Đang ${act}...`);
      try {
        const response = await axios.put(`${env.VITE_SERVER_API_BASE_URL}/fixtures/acts?act=${act}&id=${id}`);
        // await sleep(500);
        const { code, message } = response.data;
        if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
        toast.update(toastId, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: 250,
          onClose: () => fetchFixtures(),
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
    },
    [fetchFixtures],
  );

  const handleAdd = () => {
    if (currentSport?.id) {
      setProcessingId(currentSport.id ?? null);
      setFixtureAddModal(true);
    } else toast.error("Phải chọn 1 bộ môn nào đó đã :))", { closeButton: false });
  };
  const handleUpdateScore = useCallback((id: number) => {
    setProcessingId(id);
    setFixtureUpdateScoreModal(true);
  }, []);
  const handleEdit = useCallback((id: number) => {
    setProcessingId(id);
    setFixtureUpdateModal(true);
  }, []);

  const handleDone = useCallback(
    async (id: number) => {
      if (confirm("Bạn có chắc muốn xóa trận này?")) {
        const toastId = toast.loading("Đang xóa...");
        try {
          // const response = await axios.delete(`${env.VITE_SERVER_API_BASE_URL}/fixtures/${id}`);
          const response = await axios.put(`${env.VITE_SERVER_API_BASE_URL}/fixtures/done/${id}`);
          // await sleep(500);
          const { code, message } = response.data;
          if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
          toast.update(toastId, {
            render: message,
            type: "success",
            isLoading: false,
            autoClose: 250,
            onClose: () => fetchFixtures(),
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
    [fetchFixtures],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (confirm("Bạn có chắc muốn xóa trận này?")) {
        const toastId = toast.loading("Đang xóa...");
        try {
          // const response = await axios.delete(`${env.VITE_SERVER_API_BASE_URL}/fixtures/${id}`);
          const response = await axios.delete(`${env.VITE_SERVER_API_BASE_URL}/fixtures/delete/${id}`);
          // await sleep(500);
          const { code, message } = response.data;
          if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
          toast.update(toastId, {
            render: message,
            type: "success",
            isLoading: false,
            autoClose: 250,
            onClose: () => fetchFixtures(),
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
    [fetchFixtures],
  );

  const columns: ConfigColumns[] = [
    { title: "#", data: "id" },
    { title: "Tiêu đề", data: "title" },
    { title: "Tên giải", data: "league.name" },
    {
      title: "Đội nhà",
      data: "homeTeam",
      render: (data) =>
        ` <div class="flex flex-col-reverse gap-1 items-end text-xs">
            <img src="${data.logoUrl}" alt="" class="border w-8 h-8 md:w-12 md:h-12 inline-block" />
            <span>${data.name}</span>
          </div>`,
    },
    {
      title: "Tỉ số",
      data: "score",
      render: (data) =>
        ` <div class="flex flex-row gap-1 items-center justify-center text-xs">
            <span class="font-semibold text-lg">${data.home}</span>
            <span>-</span>
            <span class="font-semibold text-lg">${data.away}</span>
          </div>`,
    },
    {
      title: "Đội khách",
      data: "awayTeam",
      render: (data) =>
        ` <div class="flex flex-col-reverse gap-1 items-start text-xs">
            <img src="${data.logoUrl}" alt="" class="border w-8 h-8 md:w-12 md:h-12 inline-block" />
            <span>${data.name}</span>
          </div>`,
    },
    {
      title: "Thời gian đá",
      data: "startTime",
      className: "text-center",
      type: "text",
      render: (data) => {
        return format(data, "yyyy-MM-dd HH:mm:ss");
      },
    },
    {
      title: "Bình luận viên",
      data: "fixtureCommentators",
      className: "text-center",
      render: function (data) {
        // data là array
        if (!Array.isArray(data)) return "";
        return data.map((c) => c?.commentator?.nickname ?? "undefined").join(", ");
      },
    },
    { title: "Actions", name: "actions", data: null },
  ];

  return (
    <>
      <div className="w-full shadow p-4 bg-gray-100">
        <div className="w-full flex gap-2 overflow-auto ">
          <Link
            to={`/dashboard/fixtures`}
            className={clsx(
              "flex gap-2 py-2 px-3 text-sm rounded font-semibold",
              currentSport?.id === undefined ? "bg-blue-500 text-white" : "bg-gray-300 text-black",
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
                s.id === currentSport?.id ? "bg-blue-500 text-white" : "bg-gray-300 text-black",
              )}
            >
              {s.iconUrl && <img className="w-5 h-5" src={s.iconUrl} alt="" />}
              <span>{s.name}</span>
            </Link>
          ))}
        </div>
        <div className="w-full flex justify-between items-center py-2">
          <h1 className="text-xl">Lịch thi đấu</h1>
          <button className="py-2 px-2 bg-green-700 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white" onClick={handleAdd}>
            <LuPlus />
            <span className="text-xs font-semibold">Thêm trận</span>
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
          }}
          slots={{
            actions: (row: Fixture) => (
              <div className="flex gap-2 whitespace-nowrap">
                <button
                  className={clsx(
                    row.isLive ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700",
                    "py-1 px-2 rounded cursor-pointer",
                    "flex items-center gap-1 whitespace-nowrap ",
                  )}
                  onClick={() => (!row.isLive ? handleAct(row.id, "live") : handleAct(row.id, "unlive"))}
                >
                  {!row.isLive ? <LuRadio size={24} /> : <LuRadio size={24} />}
                  <span className="text-xs">Live</span>
                </button>
                {auth.user && auth.user.role === "administrator" && (
                  <>
                    <button
                      className={clsx(
                        row.isPinned ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700",
                        "py-1 px-2 rounded cursor-pointer",
                        "flex items-center gap-1 whitespace-nowrap ",
                      )}
                      onClick={() => (!row.isPinned ? handleAct(row.id, "pin") : handleAct(row.id, "unpin"))}
                    >
                      {!row.isPinned ? <LuPin size={24} /> : <LuPinOff size={24} />}
                      <span className="text-xs">Ghim</span>
                    </button>
                    <button
                      className={clsx(
                        row.isHot ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700",
                        "py-1 px-2 rounded cursor-pointer",
                        "flex items-center gap-1 whitespace-nowrap ",
                      )}
                      onClick={() => (!row.isHot ? handleAct(row.id, "hot") : handleAct(row.id, "unhot"))}
                    >
                      {!row.isPinned ? <LuFlame size={24} /> : <LuFlameKindling size={24} />}
                      <span className="text-xs">Hot</span>
                    </button>
                  </>
                )}
                <button
                  className="py-2 px-2 bg-yellow-200 flex items-center gap-1 whitespace-nowrap cursor-pointer text-gray-900"
                  onClick={() => handleUpdateScore(row.id)}
                >
                  <LuArrowUp10 />
                  <span className="text-xs font-semibold">Cập nhật tỉ số</span>
                </button>
                <button
                  className="py-2 px-2 bg-gray-200 flex items-center gap-1 whitespace-nowrap cursor-pointer text-gray-700"
                  onClick={() => handleEdit(row.id)}
                >
                  <LuPencilLine />
                  <span className="text-xs font-semibold">Chỉnh sửa</span>
                </button>
                <button className="py-2 px-2 bg-red-500 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white" onClick={() => handleDone(row.id)}>
                  <LuTrash />
                  <span className="text-xs font-semibold">Xóa trận</span>
                </button>
                {env.MODE === "development" && (
                  <button
                    className="py-2 px-2 bg-red-500 flex items-center gap-1 whitespace-nowrap cursor-pointer text-white"
                    onClick={() => handleDelete(row.id)}
                  >
                    <LuTrash />
                  </button>
                )}
              </div>
            ),
          }}
          data={filteredFixtures.filter((f) => f.status?.code !== "FT")}
          columns={columns}
          className="table table-striped table-hover w-full text-sm text-left row-border text-gray-700"
        />
        <FixtureAddModal
          isOpening={isFixtureAddModalOpen}
          sportId={processingId}
          onClose={() => {
            setFixtureAddModal(false);
            fetchFixtures();
          }}
        />
        <FixtureUpdateModal
          fixtureId={processingId}
          isOpening={isFixtureUpdateModalOpen}
          onClose={() => {
            setProcessingId(null);
            setFixtureUpdateModal(false);
            fetchFixtures();
          }}
        />

        <FixtureUpdateScoreModal
          fixtureId={processingId}
          isOpening={isFixtureUpdateScoreModalOpen}
          onClose={() => {
            setProcessingId(null);
            setFixtureUpdateScoreModal(false);
            fetchFixtures();
          }}
        />
      </div>
    </>
  );
};

export default FixturesPage;
