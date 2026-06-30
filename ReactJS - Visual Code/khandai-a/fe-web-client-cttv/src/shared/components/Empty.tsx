import { SearchX } from "lucide-react";

const Empty = () => {
  return (
    <div className="mt-2 h-80 md:h-125 lg:h-175 w-full rounded-2xl border border-blue-500/10 bg-linear-to-b from-white/3 to-white/1 backdrop-blur-sm">
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        {/* <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10"> */}
        <SearchX className="text-shadow-[0_0_10px_rgba(250,204,21,1)] h-15 w-15 text-blue-400" />
        {/* </div> */}

        <div className="max-w-md mt-4">
          <h3 className="text-2xl font-bold tracking-tight text-white">Không có dữ liệu</h3>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Hiện chưa có trận đấu nào. <br />
            Hãy thử chọn môn thể thao khác hoặc quay lại sau để xem dữ liệu mới nhất.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-xl border border-blue-400/20 bg-blue-400/10 px-5 py-2.5 text-sm font-semibold text-blue-300 transition-all hover:bg-blue-400/15 hover:border-blue-400/30"
          >
            Trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Empty;
