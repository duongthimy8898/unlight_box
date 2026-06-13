import { useDataContext } from "../../hooks/useDataContext";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

import ShortSchedule from "./components/ShortSchedule";
import HeroAdBanners from "../../components/HeroAdBanners";

const ResultsPage = () => {
  const { sports, fixtures } = useDataContext();
  const { sportSlug } = useParams();

  const pageSport = useMemo(() => {
    console.log("pageSport changed");
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  const fixturesBySport = fixtures.filter((fixture) => fixture.sport.id === pageSport?.id) ?? [];

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex flex-row space-x-2 items-center justify-start mb-4">
          <img src={pageSport?.iconUrl} alt="" className="w-8 h-8" />
          <span className="text-[20px] font-semibold">Kết quả {pageSport?.name}</span>
        </div>
        <div className="my-4"></div>
        <HeroAdBanners />
        {pageSport && <ShortSchedule props={{ sport: pageSport, fixtures: fixturesBySport }} />}
        <div className="my-4"></div>
        <HeroAdBanners />
      </div>
    </>
  );
};

export default ResultsPage;
