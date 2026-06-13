/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from "framer-motion";
// import { parseISO, format } from "date-fns";

import { LuX } from "react-icons/lu";
import { useCallback, useEffect, useRef, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import $ from "jquery";
import { toast } from "react-toastify";
import sleep from "../../../../utils/Sleep";
import { type ExtFixture, type InternalUser, type League, type Sport, type Team } from "../../../../types/data.type";
import Combobox from "../../../../components/Combobox";
import MultiCombobox from "../../../../components/MultiCombobox";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import DataTable from "datatables.net-react";
import DT, { type ConfigColumns } from "datatables.net-dt";
import "datatables.net-scroller";
import "../index.css";
registerLocale("vi", vi);
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

const FixtureAddModal = ({ isOpening, sportId, onClose }: Props) => {
  DataTable.use(DT);
  const [currentSport, setCurrentSport] = useState<Sport | null>();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [commentators, setCommentators] = useState<InternalUser[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [startTime, setStartTime] = useState<string>();
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | string | null>(null);
  const [selectedHomeTeamId, setSelectedHomeTeamId] = useState<number | string | null>(null);
  const [selectedAwayTeamId, setSelectedAwayTeamId] = useState<number | string | null>(null);
  const [selectedCommentators, setSelectedCommentators] = useState<InternalUser[]>([]);
  useEffect(() => {
    console.log("sportId", sportId);
    if (!isOpening || sportId === null) {
      setCurrentSport(null);
      return;
    }

    const fetchData = async () => {
      setCurrentSport(null);
      try {
        const res: AxiosResponse<{ code: number; message: string; data: Sport }> = await axios.get(
          `${env.VITE_SERVER_API_BASE_URL}/sports/get?by=id&value=${sportId}`
        );
        if (res.data.code !== 200) throw new Error(`Error code: ${res.data.code} - Message: ${res.data.message}`);
        console.log("Fetched sport data:", res.data.data);
        setCurrentSport(res.data.data);
      } catch (error) {
        console.error("Failed to fetch sport dataa:", error);
        setCurrentSport(null);
      }
    };
    fetchData();
  }, [isOpening, sportId]);

  useEffect(() => {
    const fetchLeagues = async () => {
      setLeagues([]);
      try {
        const res: AxiosResponse<{ code: number; message: string; data: League[] }> = await axios.get(`${env.VITE_SERVER_API_BASE_URL}/leagues`);
        if (res.data.code !== 200) throw new Error(`Error code: ${res.data.code} - Message: ${res.data.message}`);
        setLeagues(res.data.data);
      } catch (error) {
        console.error("Failed to fetch sport dataa:", error);
        setLeagues([]);
      }
    };

    const fetchTeams = async () => {
      setTeams([]);
      try {
        const res: AxiosResponse<{ code: number; message: string; data: Team[] }> = await axios.get(`${env.VITE_SERVER_API_BASE_URL}/teams`);
        if (res.data.code !== 200) throw new Error(`Error code: ${res.data.code} - Message: ${res.data.message}`);
        setTeams(res.data.data);
      } catch (error) {
        console.error("Failed to fetch sport dataa:", error);
        setTeams([]);
      }
    };

    const fetchCommentators = async () => {
      setCommentators([]);
      try {
        const res: AxiosResponse<{ code: number; message: string; data: InternalUser[] }> = await axios.get(
          `${env.VITE_SERVER_API_BASE_URL}/internal-users/by?by=role&value=commentator`
        );
        if (res.data.code !== 200) throw new Error(`Error code: ${res.data.code} - Message: ${res.data.message}`);
        setCommentators(res.data.data);
      } catch (error) {
        console.error("Failed to fetch sport dataa:", error);
        setCommentators([]);
      }
    };
    fetchLeagues();
    fetchTeams();
    fetchCommentators();
  }, [isOpening, sportId]);

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
    const toastId = toast.loading("Đang thêm dữ liệu...");
    try {
      const response = await axios.post(`${env.VITE_SERVER_API_BASE_URL}/fixtures/create`, submitData);
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

  const [fixtures, setFixtures] = useState<ExtFixture[]>([]);
  const loadFixtures = async () => {
    try {
      const res = await axios.get(`${env.VITE_SPORT_DATA_API}/fixtures/all`);

      if (res.status === 200) {
        setFixtures(res.data.results);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fixturesFlat = fixtures.map((f) => ({
    id: f.fixture.id,
    leagueName: f.league.name,
    home: { name: f.teams.home.name, logo: f.teams.home.logo },
    away: { name: f.teams.away.name, logo: f.teams.away.logo },
    date: f.fixture.date,
  }));

  const columns: ConfigColumns[] = [
    { title: "#", data: "id" },
    { title: "Tên giải", data: "leagueName" },
    {
      title: "Đội nhà",
      data: "home",
      render: (data) =>
        `<div class="flex flex-col-reverse gap-1 items-end text-xs">
        <img src="${data.logo}" alt="" class="border w-8 h-8 md:w-12 md:h-12 inline-block" />
        <span>${data.name}</span>
      </div>`,
    },
    {
      title: "Đội khách",
      data: "away",
      render: (data) =>
        `<div class="flex flex-col-reverse gap-1 items-start text-xs">
        <img src="${data.logo}" alt="" class="border w-8 h-8 md:w-12 md:h-12 inline-block" />
        <span>${data.name}</span>
      </div>`,
    },
    { title: "Thời gian đá", data: "date", className: "text-center", render: (data) => format(new Date(data), "dd/MM/yyyy HH:mm") },
    {
      title: "Actions",
      data: null,
      render: (row) => `<button class="btn-pickup text-white bg-blue-500 px-3 py-1.5 rounded hover:bg-blue-600 transition" data-id="${row.id}">Pick</button>`,
    },
  ];
  const selectedCommentatorsRef = useRef<InternalUser[]>([]);
  useEffect(() => {
    selectedCommentatorsRef.current = selectedCommentators;
  }, [selectedCommentators]);

  const handlePickup = useCallback(
    async (id: number) => {
      const fixture = fixtures.find((f) => f.fixture.id === id) as ExtFixture | undefined;
      if (!fixture) return;

      // --- 1. Xử lý League ---
      let currentLeague: League | undefined = leagues.find(
        (l) => l.name.trim() === fixture.league.name.trim() || l.referenceId === fixture.league.id.toString()
      );

      if (!currentLeague) {
        const toastId = toast.loading("Đang kiểm tra giải đấu...");
        toast.update(toastId, { render: "Đang tạo giải đấu mới..." });
        try {
          const createLeagueRes = await axios.post(`${env.VITE_SERVER_API_BASE_URL}/leagues/create`, {
            sportId,
            referenceId: fixture.league.id.toString(),
            name: fixture.league.name,
            logoUrl: fixture.league.logo,
          });
          if (createLeagueRes.status !== 201) throw new Error(createLeagueRes.data.message || "Unknown error");

          currentLeague = createLeagueRes.data.data;
          // Thêm League mới vào state
          if (currentLeague) setLeagues((prev) => [...prev, currentLeague!]);
          toast.update(toastId, {
            render: `Tạo giải đấu thành công: ${currentLeague?.name}`,
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
        } catch (err: any) {
          toast.update(toastId, {
            render: `Lỗi tạo giải đấu: ${err.message || "Lỗi không xác định"}`,
            type: "error",
            isLoading: false,
            autoClose: 1500,
          });
          return; // nếu tạo league lỗi thì dừng
        }
      } else {
        const toastId = toast.loading("Đang kiểm tra giải đấu...");
        toast.update(toastId, {
          render: `Giải đấu đã có sẵn: ${currentLeague.name}`,
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      }

      // --- 2. Xử lý Teams ---
      const fixtureTeams = [fixture.teams.home, fixture.teams.away];
      const currentTeams: Record<string, Team> = {};

      for (const team of fixtureTeams) {
        let existingTeam = teams.find((t) => t.name.trim() === team.name.trim() || t.referenceId === team.id.toString());
        console.log("Existing team check:", team.name, existingTeam);
        console.log(
          "Teams state:",
          teams.find((t) => t.name == team.name)
        );

        if (!existingTeam) {
          const toastId = toast.loading("Đang tạo đội mới...");
          try {
            const createTeamRes = await axios.post(`${env.VITE_SERVER_API_BASE_URL}/teams/create`, {
              sportId,
              referenceId: team.id.toString(),
              name: team.name,
              logoUrl: team.logo,
            });
            if (createTeamRes.status !== 201) throw new Error(createTeamRes.data.message || "Unknown error");

            existingTeam = createTeamRes.data.data;
            // Thêm Team mới vào state
            if (existingTeam) setTeams((prev) => [...prev, existingTeam!]);
            toast.update(toastId, {
              render: `Tạo đội thành công: ${existingTeam?.name}`,
              type: "success",
              isLoading: false,
              autoClose: 1500,
            });
          } catch (err: any) {
            toast.update(toastId, {
              render: `Lỗi tạo đội: ${err.message || "Lỗi không xác định"}`,
              type: "error",
              isLoading: false,
              autoClose: 1500,
            });
            return; // nếu tạo team lỗi thì dừng
          }
        } else {
          const toastId = toast.loading("Đang kiểm tra đội...");
          toast.update(toastId, {
            render: `Đội đã có sẵn: ${existingTeam.name}`,
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
        }

        // Lưu team để dùng tạo fixture
        currentTeams[team.id.toString()] = existingTeam!;
      }

      // --- 3. Tạo Fixture ---
      setIsProcessing(true);
      const formData = new FormData();
      formData.append("sportId", sportId?.toString() ?? "");
      formData.append("referenceId", fixture.fixture.id.toString());
      formData.append("title", `${fixture.teams.home.name} vs ${fixture.teams.away.name}`);
      formData.append("leagueId", currentLeague?.id.toString() ?? "-9999");
      formData.append("homeTeamId", currentTeams[fixture.teams.home.id.toString()]?.id.toString() ?? "-9999");
      formData.append("awayTeamId", currentTeams[fixture.teams.away.id.toString()]?.id.toString() ?? "-9999");
      formData.append("startTime", format(fixture.fixture.date, "yyyy-MM-dd'T'HH:mm"));
      const commentatorIdsIdxs = selectedCommentatorsRef.current.map((c, idx) => `${c.id}:${idx}`).join(",");
      formData.append("commentatorIdsIdxs", commentatorIdsIdxs);

      const submitData = Object.fromEntries(formData.entries());
      const toastId = toast.loading("Đang thêm dữ liệu...");
      try {
        // throw new Error("áo em si")
        const response = await axios.post(`${env.VITE_SERVER_API_BASE_URL}/fixtures/create`, submitData);
        await sleep(500);
        const { code, message } = response.data;
        if (code !== 201) throw new Error(message || "Có lỗi xảy ra");

        toast.update(toastId, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: 1500,
          onClose: () => setIsProcessing(false),
        });
      } catch (err: any) {
        toast.update(toastId, {
          render: err.message || "Lỗi không xác định",
          type: "error",
          isLoading: false,
          autoClose: 1500,
          onClose: () => setIsProcessing(false),
        });
      }
    },
    [fixtures, leagues, teams, sportId]
  );

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
            className="relative w-full max-w-[1440px] max-h-full flex flex-col bg-gray-900 shadow-red-500 shadow rounded"
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
              <span>Thêm lịch {currentSport?.name}</span>
            </div>
            <div className="flex-1 w-full min-h-[256px] max-h-full py-4 px-4 overflow-auto">
              <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                <input hidden name="sportId" type="number" value={currentSport?.id ?? ""} readOnly></input>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" hidden>
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="referenceId" className="text-white text-xs">
                      REFERENCE_ID
                    </label>
                    <input
                      className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                      type="number"
                      id="referenceId"
                      name="referenceId"
                      readOnly
                    />
                  </div>
                </div>
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
                <div className="w-full flex flex-col gap-2">
                  <label className="text-white text-xs">GIẢI ĐẤU</label>
                  <input hidden name="leagueId" type="number" value={selectedLeagueId ?? ""} readOnly />
                  <Combobox
                    options={
                      leagues?.filter((o) => o.sport.id === currentSport?.id).map((o) => ({ value: o.id.toString(), text: o.name ?? "undefined" })) ?? []
                    }
                    onChange={(option) => {
                      console.log("Đã chọn:", option);
                      setSelectedLeagueId(option?.value ?? null);
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-white text-xs">ĐỘI CHỦ NHÀ</label>
                    <input hidden name="homeTeamId" type="number" value={selectedHomeTeamId ?? ""} readOnly />
                    <Combobox
                      options={teams.filter((o) => o.sport.id === currentSport?.id).map((o) => ({ value: o.id.toString(), text: o.name ?? "undefined" })) ?? []}
                      onChange={(option) => {
                        console.log("Đã chọn:", option);
                        setSelectedHomeTeamId(option?.value ?? null);
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-white text-xs">ĐỘI KHÁCH</label>
                    <input hidden name="awayTeamId" type="number" value={selectedAwayTeamId ?? ""} readOnly />
                    <Combobox
                      options={teams.filter((o) => o.sport.id === currentSport?.id).map((o) => ({ value: o.id.toString(), text: o.name ?? "undefined" })) ?? []}
                      onChange={(option) => {
                        console.log("Đã chọn:", option);
                        setSelectedAwayTeamId(option?.value ?? null);
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-white text-xs">THỜI GIAN ĐÁ</label>
                    <input
                      hidden
                      readOnly
                      name="startTime"
                      className="text-white"
                      type="datetime-local"
                      value={startTime} // startTime phải là string ISO kiểu "2025-09-26T14:30"
                      onChange={(e) => setStartTime(e.target.value)}
                    />

                    <ReactDatePicker
                      selected={startTime ? new Date(startTime) : null}
                      onChange={(d: Date | null) => {
                        if (d) {
                          // format đúng cho <input type="datetime-local" />
                          setStartTime(format(d, "yyyy-MM-dd'T'HH:mm"));
                        }
                      }}
                      locale={vi}
                      showTimeSelect
                      timeFormat="HH:mm"
                      dateFormat="dd/MM/yyyy HH:mm" // ✅ sửa YYYY -> yyyy
                      placeholderText="dd/MM/yyyy HH:mm"
                      className="w-full inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-white text-xs">BÌNH LUẬN VIÊN</label>
                    <input hidden name="commentatorIdsIdxs" value={selectedCommentators.map((c, idx) => `${c.id}:${idx}`).join(",")} readOnly />
                    <MultiCombobox
                      options={commentators.map((c) => ({ value: c.id.toString(), text: c.nickname ?? "undefined" }))}
                      onChange={(options) => {
                        console.log("muti chang", options);
                        setSelectedCommentators(
                          options.map((o) => commentators.find((c) => c.id.toString() === o.value)).filter((c): c is InternalUser => c !== undefined)
                        );
                      }}
                    />
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
              <div className="w-full mt-2 bg-white p-2">
                {fixtures.length > 0 ? (
                  <>
                    <button onClick={loadFixtures} className="bg-gray-500 text-white rounded p-2 text-sm hover:bg-gray-600 transition">
                      Reload data
                    </button>
                    <DataTable
                      options={{
                        deferRender: true,
                        scrollY: "300",
                        paging: true,
                        pageLength: 50,
                        createdRow: (row, data: any) => {
                          $(row)
                            .find(".btn-pickup")
                            .off("click")
                            .on("click", () => {
                              handlePickup(data.id);
                            });
                        },
                      }}
                      data={fixturesFlat}
                      columns={columns}
                      className="table table-striped table-hover w-full text-sm text-left row-border text-gray-700"
                    />
                  </>
                ) : (
                  <button onClick={loadFixtures} className="bg-gray-500 text-white rounded p-2 text-sm hover:bg-gray-600 transition">
                    Load data
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FixtureAddModal;
