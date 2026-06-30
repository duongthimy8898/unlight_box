import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChartBarBig, ChevronLeft, ChevronRight } from "lucide-react";
import bookmakers from "../../../data/bookmakers";

export default function Bookmakers() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 3, spacing: 6, number: bookmakers.length },
    breakpoints: {
      "(min-width: 640px) and (max-width: 959px)": {
        slides: { perView: 3, spacing: 6 }, // tb
      },
      "(min-width: 960px) and (max-width: 1535px)": {
        slides: { perView: 4, spacing: 8 }, // lt
      },
      "(min-width: 1536px) and (max-width: 1919px)": {
        slides: { perView: 6, spacing: 10 }, // dt+
      },
      "(min-width: 1920px)": {
        slides: { perView: 8, spacing: 10 }, // dt+
      },
    },
    mode: "snap",
  });

  return bookmakers.length === 0 ? null : (
    <section className="mt-4 p-4 bg-[#191920] rounded-lg">
      <h2 className="flex gap-1 items-center mb-2">
        <ChartBarBig className="size-6 text-pink-500" />
        <span className="font-bold text-[20px] uppercase">TOP nhà cái uy tín</span>
      </h2>
      <div className="relative cursor-pointer group">
        <div ref={sliderRef} className="keen-slider">
          {bookmakers.map((o, idx) => (
            <div key={idx} className="keen-slider__slide">
              <div className="flex flex-col gap-2 items-center rounded shadow-2xl overflow-hidden group cursor-pointer bg-[#171717] border border-[#3A3F4380] p-2">
                <img src={o.src} alt="" className="w-16 h-16" />
                <a href={o.href} target="_blank" className="py-1 px-3 bg-pink-500 text-white text-xs rounded-full">
                  <span>Đặt cược</span>
                </a>
                <a href={o.href} target="_blank" className="py-1 px-3 bg-green-500 text-white text-xs rounded-full">
                  <span>Chi tiết</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => instanceRef.current?.prev()}
          className="hidden lg:group-hover:block absolute left-2 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full group-hover:bg-white/10 hover:bg-white/25! transition"
        >
          <ChevronLeft size={16} className="transition group-hover:scale-125!" />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="hidden lg:group-hover:block absolute right-2 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full group-hover:bg-white/10 hover:bg-white/25! transition"
        >
          <ChevronRight size={16} className="transition group-hover:scale-125!" />
        </button>
      </div>
    </section>
  );
}
