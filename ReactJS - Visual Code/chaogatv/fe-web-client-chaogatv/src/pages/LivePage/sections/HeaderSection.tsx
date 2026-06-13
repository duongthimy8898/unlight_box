import { formatDate } from "date-fns";
import { formatTime } from "../../../shared/lib/dateFns";
import type { Fixture } from "../../../shared/types/Fixture";
const HeaderSection = ({ fixture }: { fixture: Fixture }) => {
  return (
    <header className="flex flex-row gap-1 text-brand">
      <time className="space-x-1 font-semibold" dateTime={fixture.startTime.toISOString()}>
        <span>{formatTime(fixture.startTime, "HH:mm")}</span>
        <span>{formatDate(fixture.startTime, "d/M")}</span>
      </time>
      <span className="inline-block bg-linear-to-b from-[#FFFFFF]/0 via-[#FFA520] to-[#FFFFFF]/0 w-0.5"></span>
      <h1>{fixture.title}</h1>
    </header>
  );
};

export default HeaderSection;
