import { Star } from "lucide-react";
import HeaderSection from "./sections/HeaderSection";
const bookmakers = [
  {
    id: 1,
    name: "BWING",
    image: "/banners/bwing_1x1.gif",
    rating: 5,
    description: "Nhà cái uy tín hàng đầu thế giới, tỷ lệ cược hấp dẫn và đa dạng môn thể thao.",
    href: "https://www.bwing20.com/vn?affCode=22187",
  },
  {
    id: 2,
    name: "BWING",
    image: "/banners/bwing_1x1.gif",
    rating: 5,
    description: "Nhà cái uy tín hàng đầu thế giới, tỷ lệ cược hấp dẫn và đa dạng môn thể thao.",
    href: "https://www.bwing20.com/vn?affCode=22187",
  },
  {
    id: 3,
    name: "VSBET",
    image: "/banners/vs_1x1.gif",
    rating: 5,
    description: "Nhà cái uy tín hàng đầu thế giới, tỷ lệ cược hấp dẫn và đa dạng môn thể thao.",
    href: "https://6789x.site/ad9namei200",
  },
  {
    id: 4,
    name: "VSBET",
    image: "/banners/vs_1x1.gif",
    rating: 5,
    description: "Nhà cái uy tín hàng đầu thế giới, tỷ lệ cược hấp dẫn và đa dạng môn thể thao.",
    href: "https://6789x.site/ad9namei200",
  },
];
const TopCasinoPage = () => {
  return (
    <>
      <div className="mt-2 px-2 lg:px-0">
        <HeaderSection />
      </div>
      <div className="mt-2 px-2 lg:px-0">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {bookmakers.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border-2 border-yellow-500/10 bg-linear-to-b from-white/3 to-white/1 p-5 backdrop-blur-sm transition-all hover:border-yellow-400/20 hover:shadow-[0_0_25px_rgba(250,204,21,0.15)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>

                  <div className="mt-1 flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-400 line-clamp-2">{item.description}</p>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={item.href}
                  target="_blank"
                  className="flex-1 rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 transition-all hover:border-yellow-400/30 hover:bg-yellow-400/15"
                >
                  <span className="text-yellow-300">Cược ngay</span>
                </a>

                <a href={item.href} target="_blank" className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition-all hover:bg-white/10">
                  <span className="text-white">Xem chi tiết</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopCasinoPage;
