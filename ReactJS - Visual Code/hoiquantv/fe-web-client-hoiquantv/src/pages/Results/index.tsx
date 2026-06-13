import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useDataContext } from "../../hooks/useDataContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/vi";
import type { League } from "../../types/League";
import clsx from "clsx";
import { LuRadio } from "react-icons/lu";
// import CommentatorLabel from "../components/CommentatorLabel";
import { Empty } from "antd";
dayjs.extend(weekday);
dayjs.locale("vi");
const ResultsPage = () => {
  const navigate = useNavigate();
  const { sports, leagues, fixtures } = useDataContext();
  const { sportSlug } = useParams();
  const pageSport = useMemo(() => {
    console.log("page-sportchaned");
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  const [filter, setFilter] = useState<string>(dayjs().format("DD/MM/YYYY"));
  const filters = [
    { label: "Hôm nay", value: dayjs().format("DD/MM/YYYY") },
    { label: dayjs().add(-1, "day").format("dd"), value: dayjs().add(-1, "day").format("DD/MM/YYYY") },
    { label: dayjs().add(-2, "day").format("dd"), value: dayjs().add(-2, "day").format("DD/MM/YYYY") },
    { label: dayjs().add(-3, "day").format("dd"), value: dayjs().add(-3, "day").format("DD/MM/YYYY") },
    { label: dayjs().add(-4, "day").format("dd"), value: dayjs().add(-4, "day").format("DD/MM/YYYY") },
    { label: dayjs().add(-5, "day").format("dd"), value: dayjs().add(-5, "day").format("DD/MM/YYYY") },
    { label: dayjs().add(-6, "day").format("dd"), value: dayjs().add(-6, "day").format("DD/MM/YYYY") },
  ];
  const [leaguesByFilter, setLeaguesByFilter] = useState<League[]>([]);

  useEffect(() => {
    if (sports.data && !pageSport) {
      navigate("/trang-chu"); // quay về trang chủ nếu slug không hợp lệ
    }
  }, [sports.data, pageSport, navigate]);

  useEffect(() => {
    const filterLeaguesWithFilter = leagues.data
      ?.filter((l) => l.sport.id === pageSport?.id)
      ?.map((league) => {
        // lọc fixtures đúng filter
        const filteredFixtures = fixtures
          ?.filter((f) => f.league.id === league.id && f.status?.code === "FT")
          .filter((fixture) => {
            const fixtureStr = dayjs(fixture.startTime).format("DD/MM/YYYY");
            return filter === "LIVE" ? fixture.isLive : fixtureStr === filter;
          });

        // nếu không còn fixture nào, loại bỏ league
        if (filteredFixtures?.length === 0) return null;

        return {
          ...league,
          fixtures: filteredFixtures,
        };
      })
      .filter(Boolean); // loại bỏ các league = null
    console.log(filterLeaguesWithFilter);
    setLeaguesByFilter((filterLeaguesWithFilter as League[]) ?? []);
  }, [fixtures, leagues.data, pageSport, filter]);
  const { fixturesStats } = useDataContext();
  return (
    <div className="w-full">
      <Breadcrumb
        segments={[
          { text: "📊 Kết quả", path: "ket-qua" },
          { text: pageSport?.name || "undefined", path: `ket-qua/${pageSport?.slug}` },
        ]}
      />
      <div className="w-full mt-0 px-2 grid grid-cols-1 lt:grid-cols-[2fr_1fr] gap-2">
        <div className="w-full space-y-1">
          <div className="w-full flex justify-start items-center space-x-2">
            <span className="text-blue-400 font-semibold uppercase">KẾT QUẢ THI ĐẤU {pageSport?.name}</span>
            <span className="flex-1 border-y border-blue-400"></span>
          </div>
          <div className="overflow-y-hidden overflow-x-auto flex w-full space-x-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={clsx(
                  "flex-1 flex flex-col items-center px-4 py-2 rounded-[12px] transition ease-in-out",
                  filter === f.value ? "bg-[#2e9fff] text-white" : "outline-0 outline-transparent bg-[#4B4E56] text-gray-300",
                )}
              >
                <span className="text-xs font-medium truncate">{f.label}</span>
                <span className={clsx("text-xs truncate")}>{f.value}</span>
              </button>
            ))}
            {/* <button
              onClick={() => setFilter("LIVE")}
              className={clsx(
                "flex-1 flex flex-row space-x-0.5 justify-center items-center px-4 py-2 outline  transition ease-in-out",
                filter === "LIVE" ? "outline-2 outline-red-500 bg-red-500 text-white " : "outline-0 outline-transparent bg-[#4B4E56] text-gray-300"
              )}
            >
              <LuRadio className={clsx(filter === "LIVE" ? " text-white" : "text-red-500")} />
              <span className="text-xs font-medium truncate">Live</span>
              <span className={clsx("text-xs font-semibold", filter === "LIVE" ? "text-white" : "text-red-500")}></span>
            </button> */}
          </div>
          <div className="w-full flex flex-col space-y-4">
            {leaguesByFilter.length === 0 ? (
              <Empty description={<span className="text-slate-500">Không có dữ liệu</span>} className="!m-0 !w-full py-8 px-4 !bg-[#1e293b]" />
            ) : (
              leaguesByFilter.map((l, idx) => {
                return (
                  <div key={idx} className="w-full">
                    <div className="w-full flex items-center py-3 px-4 space-x-1 bg-[#2f5ba4] rounded-t-[12px]">
                      <img src={l.logoUrl} alt="" className="w-6 h-6" />
                      <span className="text-sm font-medium">{l.name}</span>
                    </div>
                    <div className="w-full flex flex-col divide-y divide-slate-700">
                      {l.fixtures?.map((f, idx) => {
                        const fixtureStat = fixturesStats.data?.find((stat) => stat.fixture.id.toString() === f.referenceId);
                        console.log(f.referenceId)
                        return (
                          <div key={idx} className="w-full flex flex-col tb:flex-row gap-4 items-center py-3 px-4 bg-[#1e293b] last:rounded-b-[12px]">
                            {/* Cột trái */}
                            <div className="w-full tb:w-[128px] flex flex-row-reverse justify-between tb:flex-col tb:justify-start items-center tb:items-start gap-1">
                              <p className="text-xs space-x-1">
                                <span className="font-semibold">{dayjs(f.startTime).format("HH:mm")}</span>
                                <span>{dayjs(f.startTime).format("DD/MM/YYYY")}</span>
                              </p>
                              {f.isLive ? (
                                <div className="bg-red-500 px-2 h-5 flex justify-center items-center rounded-full space-x-1 animate-pulse">
                                  <LuRadio />
                                  <span className="text-[11px] font-normal">Live</span>
                                </div>
                              ) : (
                                <div className="bg-white/15 text-red-500 px-2 h-5 flex justify-center items-center rounded-full space-x-1">
                                  <span className="text-[11px] truncate font-normal">Kết thúc</span>
                                </div>
                              )}
                            </div>

                            {/* Cột giữa */}
                            <div className="flex-1 justify-self-center min-w-[300px] grid grid-cols-[1fr_auto_1fr] items-center space-x-4">
                              <div className="w-full flex gap-2 flex-row items-center justify-end tb:flex-col-reverse tb:items-center tb:justify-center dt:flex-row dt:items-center dt:justify-end overflow-hidden">
                                <span className="block w-full px-2 text-end tb:text-center dt:text-end text-xs font-medium break-all truncate">
                                  {f.homeTeam.name}
                                </span>
                                <img src={f.homeTeam.logoUrl} alt="" className="w-10 h-10 block flex-shrink-0" />
                              </div>
                              <div className="flex flex-col space-y-1 justify-center items-center">
                                <div className="flex justify-center items-center space-x-1 leading-none">
                                  <span className="text-[16px] font-bold">{fixtureStat?.goals.home ?? 0}</span>
                                  <span className="text-[16px]">-</span>
                                  <span className="text-[16px] font-bold">{fixtureStat?.goals.away ?? 0}</span>
                                </div>
                              </div>
                              <div className="w-full flex gap-2 flex-row items-center justify-start tb:flex-col tb:items-center tb:justify-center dt:flex-row dt:items-center dt:justify-start overflow-hidden">
                                <img src={f.awayTeam.logoUrl} alt="" className="w-10 h-10 block flex-shrink-0" />
                                <span className="block w-full px-2 text-start tb:text-center dt:text-start text-xs font-medium break-all truncate">
                                  {f.awayTeam.name}
                                </span>
                              </div>
                            </div>

                            {/* Cột phải
                          <div className="w-full flex justify-between items-center gap-4 tb:block">
                            <CommentatorLabel commentators={f.fixtureCommentators} />
                          </div> */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="hidden lt:block w-full h-[500px] bg-transalte"></div>
      </div>
    </div>
  );
};

export default ResultsPage;
