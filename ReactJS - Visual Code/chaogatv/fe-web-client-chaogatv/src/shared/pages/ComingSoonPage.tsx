import { Clock3 } from "lucide-react";

const ComingSoonPage = () => {
  return (
    <div className="w-full px-4 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <div className="w-full rounded-2xl border border-yellow-500/10 bg-linear-to-b from-white/3 to-white/1 backdrop-blur-sm">
          <div className="flex min-h-125 flex-col items-center justify-center px-6 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10">
              <Clock3 className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
            </div>

            <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-medium tracking-wide text-yellow-300 uppercase">
              Coming Soon
            </span>

            <div className="mt-6 max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Tính năng này đang được phát triển</h1>

              <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
                Chúng tôi đang hoàn thiện tính năng để mang đến trải nghiệm tốt hơn cho bạn.
                <br className="hidden md:block" />
                Vui lòng quay lại sau để cập nhật phiên bản mới nhất.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/"
                type="button"
                className="cursor-pointer rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-5 py-2.5 text-sm font-semibold text-yellow-300 transition-all hover:border-yellow-400/30 hover:bg-yellow-400/15"
              >
                Trang chủ
              </a>

              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Thông báo khi ra mắt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
