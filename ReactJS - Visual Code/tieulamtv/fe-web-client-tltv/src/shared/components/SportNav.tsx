import clsx from "clsx";
import useSports from "../../features/sports/hooks";
import { Link } from "@tanstack/react-router";

const SportNav = () => {
  const { data: sports } = useSports.list();
  return (
    <ul
      className={clsx("mb-4 h-12 md:h-14","flex flex-row items-center gap-0", "border-y-2 border-[#eab30880]", "overflow-x-auto snap-x snap-mandatory")}
    >
      {sports?.map((sport) => (
        <li key={sport.id} className="snap-start shink-0 relative">
          <Link
            to={''}
            search={{
              mon: sport.slug,
            }}
            activeOptions={{
              exact: true,
              includeSearch: true,
            }}
            activeProps={{
              className: "text-[#ffd000]!",
            }}
            className={clsx("px-4 py-2 md:py-4", "flex items-center gap-2", "text-white text-xs md:text-sm font-semibold")}
          >
            <img src={sport.iconUrl} alt="" className="block shrink-0 w-3 h-3 md:w-4 md:h-4" />
            <span className="block capitalize truncate shrink-0">{sport.name}</span>
          </Link>
          {sport.hasLive && (
            <span className="absolute -top-0.5 md:top-1 right-0 block bg-red-500 py-0.5 px-1 md:px-2 rounded-full text-[8px] font-semibold text-white">
              LIVE
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SportNav;
