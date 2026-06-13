import clsx from "clsx";
import dayjs from "dayjs";
import { HiStatusOnline } from "react-icons/hi";
import { Link } from "react-router-dom";

const FilterSection = ({ selectedFilter }: { selectedFilter: { by: string | null; value: string | null } }) => {
  const filters = [
    { label: "H.Nay", value: dayjs() },
    { label: "N.Mai", value: dayjs().add(1, "day") },
    { label: dayjs().add(2, "day").format("dd"), value: dayjs().add(2, "day") },
    { label: dayjs().add(3, "day").format("dd"), value: dayjs().add(3, "day") },
    { label: dayjs().add(4, "day").format("dd"), value: dayjs().add(4, "day") },
  ];
  return (
    <div className={clsx("sticky top-0 bg-[#141414] py-4 flex flex-row gap-2 overflow-auto", "lt:flex-col")}>
      {/* sticky không hoạt động */}
      <Link
        to={`?by=state&value=live`}
        className={clsx(
          "py-2 px-6 rounded-[12px] flex flex-col gap-1 items-center border-2 border-red-500 hover:bg-red-500 transition-all",
          selectedFilter.by === "state" && selectedFilter.value === "live" ? "bg-red-500 text-white" : "bg-transparent text-white"
        )}
      >
        <HiStatusOnline size={24} />
        <span className="text-xs font-semibold">LIVE</span>
      </Link>
      {filters.map((filter, idx) => (
        <Link
          key={idx}
          to={`?by=date&value=${filter.value.format("DD/MM/YYYY")}`}
          className={clsx(
            "py-2 px-6 rounded-[12px] flex flex-col gap-1 items-center hover:bg-yellow-300 hover:text-black transition-all",
            selectedFilter.by === "date" && selectedFilter.value === filter.value.format("DD/MM/YYYY") ? "bg-yellow-300 text-black" : "bg-gray-500/25 text-white"
          )}
        >
          <span className="text-[14px] font-semibold">{filter.label}</span>
          <span className="text-xs font-semibold">{filter.value.format("DD/MM")}</span>
        </Link>
      ))}
    </div>
  );
};

export default FilterSection;
