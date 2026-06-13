import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import type { Fixture, InternalUser, League, Team } from "../../../../types/data.type";
import Combobox from "../../../../components/Combobox";
import MultiCombobox from "../../../../components/MultiCombobox";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import ReactDatePicker, { registerLocale } from "react-datepicker";
registerLocale("vi", vi);
const env = import.meta.env;
type Props = {
  isOpening: boolean;
  fixtureId: number | null;
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

const FixtureUpdateModal = ({ isOpening, fixtureId, onClose }: Props) => {
  const [currentFixture, setCurrentFixture] = useState<Fixture | null>(null);
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
    if (!isOpening || fixtureId === null) {
      setCurrentFixture(null);
      return;
    }

    const fetchData = async () => {
      setCurrentFixture(null);

      try {
        const res: AxiosResponse<{ code: number; message: string; data: Fixture }> = await axios.get(
          `${env.VITE_SERVER_API_BASE_URL}/fixtures/get?by=id&value=${fixtureId}`
        );
        if (res.data.code !== 200) throw new Error(`Error code: ${res.data.code} - Message: ${res.data.message}`);
        setCurrentFixture(res.data.data);
        setStartTime(format(res.data.data.startTime, "yyyy-MM-dd'T'HH:mm"));
      } catch (error) {
        console.error("Failed to fetch sport dataa:", error);
        setCurrentFixture(null);
      }
    };
    fetchData();
  }, [isOpening, fixtureId]);

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
  }, [isOpening, fixtureId]);

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
      const response = await axios.put(`${env.VITE_SERVER_API_BASE_URL}/fixtures/update/${fixtureId}`, submitData);
      // await sleep(500);
      const { code, message, data } = response.data;
      if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
      toast.update(toastId, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: 500,
        onClose: () => {
          setIsProcessing(false);
          setCurrentFixture(data);
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
              <span>Chỉnh sửa lịch {currentFixture?.sport?.name}</span>
              <span> - </span>
              <span>Mã trận #{currentFixture?.id}</span>
            </div>
            <div className="flex-1 w-full min-h-[256px] max-h-full py-4 px-4 overflow-auto">
              {currentFixture && (
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="title" className="text-white text-xs">
                      TIÊU ĐỀ
                    </label>
                    <input
                      className="inline-block p-2 bg-[#1c2433] border border-white/10 outline-2 -outline-offset-1 outline-transparent focus:outline-blue-500 text-white font-semilight text-sm"
                      type="text"
                      id="title"
                      name="title"
                      defaultValue={currentFixture?.title}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-white text-xs">GIẢI ĐẤU</label>
                    <input hidden readOnly name="leagueId" type="number" value={selectedLeagueId ?? ""} />
                    <Combobox
                      options={
                        leagues?.filter((o) => o.sport.id === currentFixture.sport?.id).map((o) => ({ value: o.id.toString(), text: o.name ?? "undefined" })) ??
                        []
                      }
                      defaultOption={{
                        value: currentFixture.league.id.toString(),
                        text: currentFixture.league.name,
                      }}
                      onChange={(option) => {
                        console.log("Đã chọn:", option);
                        setSelectedLeagueId(option?.value ?? null);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-white text-xs">ĐỘI CHỦ NHÀ</label>
                      <input hidden readOnly name="homeTeamId" type="number" value={selectedHomeTeamId ?? ""} />
                      <Combobox
                        options={
                          teams.filter((o) => o.sport.id === currentFixture.sport?.id).map((o) => ({ value: o.id.toString(), text: o.name ?? "undefined" })) ??
                          []
                        }
                        defaultOption={{
                          value: currentFixture.homeTeam.id.toString(),
                          text: currentFixture.homeTeam.name,
                        }}
                        onChange={(option) => {
                          console.log("Đã chọn:", option);
                          setSelectedHomeTeamId(option?.value ?? null);
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-white text-xs">ĐỘI KHÁCH</label>
                      <input hidden readOnly name="awayTeamId" type="number" value={selectedAwayTeamId ?? ""} />
                      <Combobox
                        options={
                          teams.filter((o) => o.sport.id === currentFixture.sport?.id).map((o) => ({ value: o.id.toString(), text: o.name ?? "undefined" })) ??
                          []
                        }
                        defaultOption={{
                          value: currentFixture.awayTeam.id.toString(),
                          text: currentFixture.awayTeam.name,
                        }}
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
                      <input hidden readOnly name="commentatorIdsIdxs" value={selectedCommentators.map((c, idx) => `${c.id}:${idx}`).join(",")} />
                      <MultiCombobox
                        options={commentators.map((c) => ({ value: c.id.toString(), text: c.nickname ?? "undefined" }))}
                        defaultOptions={
                          currentFixture?.fixtureCommentators.map((fc) => ({
                            value: fc.commentator.id.toString(),
                            text: fc.commentator.nickname ?? "",
                          })) ?? undefined
                        }
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
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FixtureUpdateModal;
