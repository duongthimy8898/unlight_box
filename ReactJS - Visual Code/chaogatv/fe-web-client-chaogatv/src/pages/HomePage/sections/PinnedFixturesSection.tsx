import fireIcon from "../../../assets/fire-icon.png";
import type { Fixture } from "../../../shared/types/Fixture";
import FixtureCards from "../../components/FixtureCards";

const PinnedFixturesSection = ({ fixtures }: { fixtures: Fixture[] }) => {
  const pinnedFixtures = [...fixtures.filter((f) => f.isPinned), ...fixtures.filter((f) => !f.isPinned)].slice(0, 6);
  return (
    <section className="mt-4 px-2 lg:px-0 rounded-lg">
      <h2 className="text-md font-medium text-white mb-2 flex gap-0.5 items-center">
        <img src={fireIcon} alt="" />
        <span>TÂM ĐIỂM THỂ THAO</span>
      </h2>
      <FixtureCards type="pinned" fixtures={pinnedFixtures} />
    </section>
  );
};

export default PinnedFixturesSection;
