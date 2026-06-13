import "keen-slider/keen-slider.min.css";
import { useKeenSlider, type KeenSliderPlugin } from "keen-slider/react";
import { GrNext, GrPrevious } from "react-icons/gr";

const AutoplayPlugin: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 3000); // 👉 3 giây
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

export default function CarouselBanner() {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: { perView: 1, spacing: 0 },
      loop: true,
      mode: "snap",
    },
    [AutoplayPlugin]
  );

  const banners = ["/assets/imgs/intro-banner-1.jpg", "/assets/imgs/intro-banner-2.jpg", "/assets/imgs/intro-banner-3.jpg", "/assets/imgs/intro-banner-4.jpg"];

  return (
    <div className="relative cursor-pointer group">
      <div ref={sliderRef} className="keen-slider">
        {banners.map((banner, i) => (
          <div key={i} className="keen-slider__slide">
            <img className="w-full block transition group-hover:scale-105" src={banner} alt="" />
          </div>
        ))}
      </div>

      <button
        onClick={() => instanceRef.current?.prev()}
        className="hidden dt:block absolute left-1 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full group-hover:bg-white/10 hover:!bg-white/25 transition"
      >
        <GrPrevious size={16} className="transition group-hover:!scale-125" />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="hidden dt:block absolute right-1 top-1/2 -translate-y-1/2 px-4 py-4 rounded-full group-hover:bg-white/10 hover:!bg-white/25 transition"
      >
        <GrNext size={16} className="transition group-hover:!scale-125" />
      </button>
    </div>
  );
}
