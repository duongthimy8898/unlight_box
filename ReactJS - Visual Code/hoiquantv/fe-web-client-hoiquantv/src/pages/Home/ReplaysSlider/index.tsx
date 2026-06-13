import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GrNext, GrPrevious } from "react-icons/gr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReplaysSlider({ replays }: { replays: any[] }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1.1125, spacing: 8, number: replays.length },
    breakpoints: {
      "(min-width: 640px) and (max-width: 959px)": {
        slides: { perView: 1.5, spacing: 6 }, // tb
      },
      "(min-width: 960px) and (max-width: 1535px)": {
        slides: { perView: 2.25, spacing: 8 }, // lt
      },
      "(min-width: 1536px) and (max-width: 1919px)": {
        slides: { perView: 3.5, spacing: 10 }, // dt+
      },
      "(min-width: 1920px)": {
        slides: { perView: 3.5, spacing: 10 }, // dt+
      },
    },
    mode: "snap",
  });

  return (
    <div className="relative cursor-pointer group">
      <div ref={sliderRef} className="keen-slider">
        {replays.map((o, idx) => (
          <div key={idx} className="keen-slider__slide">
            <div className="block rounded shadow-2xl overflow-hidden group cursor-pointer">
              <div className="relative">
                <img
                  alt={o.title}
                  loading="lazy"
                  className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105"
                  src={o.imageUrl}
                />
                <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 sm:w-12 sm:h-12 text-white opacity-70 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-[11px] sm:text-xs px-2 py-1 rounded-sm">{o.startTime}</div>
                {/* <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-[11px] sm:text-xs px-1.5 py-0.5 rounded-sm">{duration}</div> */}
              </div>
              <div className="p-2 sm:p-3">
                <h3 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-blue-500 transition-colors" title={o.title}>
                  {o.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                  BLV {o.commentator} - <span className="text-[11px] sm:text-xs text-gray-500">{o.category}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => instanceRef.current?.prev()}
        className="hidden dt:group-hover:block absolute left-2 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full group-hover:bg-white/10 hover:!bg-white/25 transition"
      >
        <GrPrevious size={16} className="transition group-hover:!scale-125" />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="hidden dt:group-hover:block absolute right-2 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full group-hover:bg-white/10 hover:!bg-white/25 transition"
      >
        <GrNext size={16} className="transition group-hover:!scale-125" />
      </button>
    </div>
  );
}
