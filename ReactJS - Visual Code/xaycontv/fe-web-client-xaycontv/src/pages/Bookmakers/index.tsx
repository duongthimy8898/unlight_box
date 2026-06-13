import clsx from "clsx";
import bookmakers from "../../data/bookmakers";
import { BsStars } from "react-icons/bs";
import BMCard from "./components/BMCard";

const BookmakerPage = () => {
  return (
    <>
      <div className="my-1 lt:my-4"></div>
      <div className="w-full">
        <div className="flex flex-row space-x-1 items-center justify-start mb-4">
          <BsStars size={32} color="#EAB308" />
          <span className="text-[20px] font-semibold">Nhà Cái Uy Tín</span>
        </div>
        <div className={clsx("grid gap-2", "grid-cols-1", "tb:grid-cols-1", "lt:grid-cols-3", "dt:grid-cols-3")}>
          {bookmakers
            .filter((item, index, self) => index === self.findIndex((t) => t.href === item.href))
            .map((bm, idx) => (
              <BMCard key={idx} bookmaker={bm} />
            ))}
        </div>
      </div>
      <div className="my-1 lt:my-4"></div>
    </>
  );
};

export default BookmakerPage;
