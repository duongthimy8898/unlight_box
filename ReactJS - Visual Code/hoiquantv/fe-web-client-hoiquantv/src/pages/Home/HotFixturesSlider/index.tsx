import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GrNext, GrPrevious } from "react-icons/gr";
import type { Fixture } from "../../../types/Fixture";
import FixtureCard from "../../components/FixtureCard";

export default function HotFixturesSlider({ fixtures }: { fixtures: Fixture[] }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1.1125, spacing: 8, number: fixtures.length },
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
        {fixtures.map((f, idx) => (
          <div key={idx} className="keen-slider__slide">
            <FixtureCard fixture={f} />
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
