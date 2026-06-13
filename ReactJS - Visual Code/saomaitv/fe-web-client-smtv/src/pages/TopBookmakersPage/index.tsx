import { motion } from "framer-motion";
import { Star, ArrowRight, Trophy } from "lucide-react";
import clsx from "clsx";

const bookmakers = [
  {
    id: 1,
    name: "o8",
    image: "/banners/o8_1x1.gif",
    rating: 5,
    description: "Nhà cái uy tín hàng đầu thế giới, tỷ lệ cược hấp dẫn và đa dạng môn thể thao.",
    href: "https://39o8.com/aff/10598",
  },
  {
    id: 2,
    name: "o8",
    image: "/banners/o8_1x1.gif",
    rating: 5,
    description: "Nền tảng cá cược lâu đời, nổi bật với bóng đá và giao diện thân thiện.",
    href: "https://39o8.com/aff/10598",
  },
];

export default function TopBookmakersPage() {
  return (
    <div
      className={clsx(
        "min-h-[calc(100vh-64px)] overflow-hidden text-white",
        "bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.14),transparent_30%),linear-gradient(135deg,#050505_0%,#18181b_45%,#27272a_100%)]",
      )}
    >
      <div className="mx-auto px-4 py-8 md:px-6 lg:px-8">
        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 backdrop-blur-xl">
            <Trophy className="h-5 w-5 text-orange-400" />
            <span className="text-sm font-semibold text-orange-300">Bảng xếp hạng nhà cái uy tín</span>
          </div>

          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            <span className="bg-linear-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">TOP NHÀ CÁI</span>
          </h1>

          <p className="mx-auto mt-6 text-balance text-lg leading-8 text-zinc-300">
            Khám phá những nhà cái hàng đầu với tỷ lệ cược cạnh tranh, giao diện hiện đại và trải nghiệm cá cược đẳng cấp.
          </p>
        </motion.header>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
          {bookmakers.map((bookmaker, index) => (
            <motion.article
              key={bookmaker.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -14, rotateX: 5, rotateY: -5 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-[28px] bg-linear-to-br from-orange-500/40 via-amber-400/20 to-transparent opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col rounded-[28px] border border-orange-400/20 bg-linear-to-b from-zinc-900/95 via-zinc-900 to-black p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-500 group-hover:border-orange-400/50">
                <div className="mb-6 flex h-24 items-start justify-start rounded-2xl gap-2 p-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.08)]">
                  <img src={bookmaker.image} alt={bookmaker.name} className="max-h-full max-w-full object-contain" />
                  <div className="flex flex-col">
                    <h2 className="mb-3 text-2xl font-bold text-white">{bookmaker.name}</h2>
                    <div className="mb-4 flex items-center gap-1.5">
                      {Array.from({ length: bookmaker.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mb-6 flex-1 text-base leading-7 text-zinc-300">{bookmaker.description}</p>

                <button
                  type="button"
                  onClick={() => window.open(bookmaker.href, "_blank")}
                  className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-amber-200/40 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 px-6 py-4 font-bold text-black shadow-[0_12px_35px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_45px_rgba(251,146,60,0.6)] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 translate-x-[-120%] bg-linear-to-r from-transparent via-white/80 to-transparent transition-transform duration-1000 group-hover/button:translate-x-[120%]" />
                  <span className="relative flex items-center gap-2 uppercase">
                    Cược ngay
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
