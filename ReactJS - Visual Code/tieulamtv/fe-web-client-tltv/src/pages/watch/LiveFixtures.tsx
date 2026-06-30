import { useMemo, useState } from "react";
import type { Fixture } from "../../shared/types/Fixture";
import BasicFixture from "../../features/fixtures/ui/BasicFixture";
import { ChevronsDown } from "lucide-react";

const LiveFixtures = ({ fixtures }: { fixtures: Fixture[] }) => {
  const [count, setCount] = useState(6);

  const visible = useMemo(() => {
    return fixtures?.slice(0, count) ?? [];
  }, [fixtures, count]);
  return (
    <>
      <div className="mt-8 flex flex-row items-center gap-2">
        <img src="/assets/imgs/icon-tamdiemthethao.png" alt="" className="w-15 h-15" />
        <span className="text-xl text-[#ffd000] font-semibold">TRẬN ĐẤU ĐANG DIỄN RA</span>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {visible.map((f, idx) => (
          <BasicFixture key={idx} fixture={f} />
        ))}
      </div>
      {count < fixtures.length && (
        <button
          onClick={() => setCount(count + 3)}
          className="mt-4 w-full py-2 flex flex-row justify-center items-center gap-2 text-[#ffd000] cursor-pointer"
        >
          <ChevronsDown size={24} />
          <span className="text-base">Xem thêm</span>
          <ChevronsDown size={24} />
        </button>
      )}
    </>
  );
};

export default LiveFixtures;
