import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { sportQueries } from "../../../features/sports/queries";

const SportNav = () => {
  const { data: sports } = useSuspenseQuery(sportQueries.list());
  return (
    <section className="mt-2">
      <ul className="flex flex-row gap-1.5 sport-list">
        <li className={clsx("shrink-0 border-b border-b-transparent rounded overflow-hidden", "bg-linear-to-r from-[#FFC107]/0 via-[#FFC107] to-[#FFC107]/0")}>
          <Link
            to="/"
            activeOptions={{
              exact: true,
            }}
            activeProps={{
              className: "bg-linear-to-b from-[#0084ff] via-[#0084ff]/25 to-[#0084ff]/0",
            }}
            className={clsx(
              "bg-[#191919] flex flex-row items-center gap-2 px-5 py-2 h-full",
              "hover:bg-linear-to-b hover:from-[#0084ff] hover:via-[#0084ff]/25 hover:to-[#0084ff]/0",
              "active:bg-linear-to-b active:from-[#0084ff] active:via-[#0084ff]/25 active:to-[#0084ff]/0",
              "transition-colors duration-300 ease-in-out",
            )}
          >
            <img src={"/favicon.png"} alt="Tất cả" className="size-5 object-contain rounded-full" />
            <span className="font-semibold text-sm">Tất cả</span>
          </Link>
        </li>
        {sports.sort((a, b) => Number(b.hasLive) - Number(a.hasLive)).map((sport, idx) => (
          <li
            key={idx}
            className={clsx("relative shrink-0 border-b border-b-transparent rounded overflow-hidden", "bg-linear-to-r from-[#FFC107]/0 via-[#FFC107] to-[#FFC107]/0")}
          >
            {sport.hasLive && (
              <span className="absolute top-0.5 left-0.5 z-10 bg-red-600 text-white text-[9px] font-bold leading-none px-1 py-0.5 rounded-sm">
                LIVE
              </span>
            )}
            <Link
              to={`/lich-thi-dau/${sport.slug}`}
              activeOptions={{
                exact: true,
              }}
              activeProps={{
                className: "bg-linear-to-b from-[#0084ff] via-[#0084ff]/25 to-[#0084ff]/0",
              }}
              className={clsx(
                "bg-[#191919] flex flex-row items-center gap-2 px-5 py-2",
                "hover:bg-linear-to-b hover:from-[#0084ff] hover:via-[#0084ff]/25 hover:to-[#0084ff]/0",
                "active:bg-linear-to-b active:from-[#0084ff] active:via-[#0084ff]/25 active:to-[#0084ff]/0",
                "transition-colors duration-300 ease-in-out",
              )}
            >
              <img src={sport.iconUrl} alt={sport.name} className="size-5 object-contain rounded-full" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{sport.name}</span>
                <span className="font-light text-slate-300 text-xs">Xem ngay</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SportNav;
