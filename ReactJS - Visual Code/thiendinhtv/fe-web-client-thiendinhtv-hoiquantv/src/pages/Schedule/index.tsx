import clsx from "clsx";
import { useDataContext } from "../../hooks/useDataContext";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import RegularFixtureCard from "../../components/RegularFixtureCard";

import ShortSchedule from "./components/ShortSchedule";
import HeroAdBanners from "../../components/HeroAdBanners";

const SchedulePage = () => {
  const { sports, unfinishedFixtures } = useDataContext();
  const { sportSlug } = useParams();

  const pageSport = useMemo(() => {
    console.log("pageSport changed");
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  const fixtures = unfinishedFixtures.data?.filter((fixture) => fixture.sport.id === pageSport?.id) ?? [];

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex flex-row space-x-2 mt-4 dt:mt-0 items-center justify-start mb-4">
          <img src={pageSport?.iconUrl} alt="" className="w-6 h-6 lt:w-8 lt:h-8" />
          <span className="text-[16px] lt:text-[20px] font-semibold">Tâm Điểm {pageSport?.name}</span>
        </div>
        <div className="my-4"></div>
        <HeroAdBanners />
        <div className="my-4"></div>
        <div className={clsx("grid gap-4", "grid-cols-1", "tb:grid-cols-2", "lt:grid-cols-3", "dt:grid-cols-4")}>
          {fixtures.map((fixture, idx) => (
            <RegularFixtureCard key={idx} fixture={fixture} />
          ))}
        </div>
      </div>
      <div className="my-4"></div>
      <HeroAdBanners />
      <hr className="my-4 border-t-2 border-gray-600" />
      {pageSport && <ShortSchedule props={{ sport: pageSport, fixtures: fixtures }} />}
      <div className="my-4"></div>
      <HeroAdBanners />
    </>
  );
};

export default SchedulePage;
