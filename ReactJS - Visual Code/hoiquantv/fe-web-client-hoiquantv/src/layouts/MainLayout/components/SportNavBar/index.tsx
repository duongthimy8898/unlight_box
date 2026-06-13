import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useDataContext } from "../../../../hooks/useDataContext";
import { useEffect, useRef, useState } from "react";

export default function SportNavBar() {
  const { sports } = useDataContext();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const currentBase = location.pathname.split("/")[1];
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const activeLink = container.querySelector("a.active") as HTMLElement | null;
    document.addEventListener("resize", () => {
      if (activeLink) {
        setIndicatorStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
        });
      } else {
        // Không có NavLink nào active → full width
        setIndicatorStyle({
          left: 0,
          width: container.offsetWidth,
        });
      }
    });
    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    } else {
      // Không có NavLink nào active → full width
      setIndicatorStyle({
        left: 0,
        width: container.offsetWidth,
      });
    }
  }, [location.pathname, sports.data]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative z-10 flex border-t-2 border-blue-500/50",
        "bg-[url('/assets/imgs/bg-sport-navbar.png')] bg-cover bg-center overflow-x-auto overflow-y-hidden"
      )}
    >
      {sports.data
        ?.sort((a, b) => a.priority - b.priority)
        .sort((a, b) => Number(b.hasLive) - Number(a.hasLive))
        .map((sport) => {
          let to = `/${currentBase}/${sport.slug}`;

          // Nếu đang không phải route chính, fallback về lich-thi-dau
          if (!["lich-thi-dau", "ket-qua", "xem-lai"].includes(currentBase)) {
            to = `/lich-thi-dau/${sport.slug}`;
          }
          return (
            <NavLink
              key={sport.id}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "group relative px-6 py-3 lt:px-4 lt:py-4 capitalize flex items-center justify-center gap-1.5 lt:gap-2 text-white",
                  "transition-colors",
                  "hover:!text-blue-400",
                  isActive && "active !text-blue-500"
                )
              }
            >
              {sport.hasLive && (
                <span className="text-[7px] lt:text-[8px] font-semibold bg-red-500 text-white py-0.5 px-1 lt:px-2 rounded-full absolute -right-0 top-0.5 lt:top-1 animate-pulse">
                  LIVE
                </span>
              )}
              <img
                src={sport.iconUrl}
                alt={sport.name}
                className={clsx("w-3 h-3 lt:w-4 lt:h-4 transition-transform duration-500", "group-[.active]:animate-jump-scale")}
              />
              <span className={clsx("text-[12px] lt:text-sm font-semibold whitespace-nowrap")}>{sport.name}</span>
              {sport.priority === 0 && <span>&#x1F525;</span>}
            </NavLink>
          );
        })}

      {/* Thanh active indicator */}
      <span className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300" style={{ left: indicatorStyle.left, width: indicatorStyle.width }} />
    </div>
  );
}
