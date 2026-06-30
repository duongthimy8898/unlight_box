import type { Fixture } from "../../shared/types/Fixture";

const FixtureAnalytics = ({ fixture }: { fixture: Fixture }) => {
  return (
    <>
      <div className="mt-8 flex flex-row items-center gap-2">
        <img src="/assets/imgs/icon-tamdiemthethao.png" alt="" className="w-15 h-15" />
        <span className="text-xl text-[#ffd000] font-semibold">THỐNG KÊ TRẬN ĐẤU</span>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">{fixture.awayTeam.name}</div>
    </>
  );
};

export default FixtureAnalytics;
