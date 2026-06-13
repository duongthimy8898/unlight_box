import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Sport } from "../../../../types/Sport";
import type { Fixture } from "../../../../types/Fixture";
import HotFixtureSlider from "./HotFixtureSlider";
type SportSectionProps = {
  sport: Sport;
  fixtures: Fixture[];
};
const SportSection = ({ props }: { props: SportSectionProps }) => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-start items-center gap-4 mb-4">
        <div className="flex flex-row items-center space-x-2">
          {/* <RiFocus2Line size={32} color="#C4E456" /> */}
          <img src={props.sport.iconUrl} alt="" className="w-8 h-8" />
          <span className="text-[20px] font-semibold">{props.sport.name}</span>
        </div>
        <Link to={`/lich-thi-dau/${props.sport.slug}`} className="flex space-x-1 items-center border border-gray-500 rounded-full px-3 py-1">
          <span className="text-xs">Xem tất cả</span>
          <FaChevronRight size={11} />
        </Link>
      </div>
      <div className="w-full">
        <HotFixtureSlider fixtures={props.fixtures} />
      </div>
    </div>
  );
};

export default SportSection;
