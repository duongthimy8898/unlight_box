import { useEffect } from "react";
import useContainerLoader from "../../hooks/useContainerLoader.hook";
import clsx from "clsx";
import { FaStar } from "react-icons/fa6";
import bookmakers from "../../data/bookmakers";

const BookmakersPage = () => {
  const { setLoading } = useContainerLoader();
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <>
      <div className="my-2"></div>
      <div className={clsx("bg-gradient-to-r from-[#080247] via-[#2A4AE1] to-[#080247]", "w-fit px-3 py-1.5 text-[20px] font-semibold rounded-[8px] mb-2")}>
        NHÀ CÁI UY TÍN
      </div>
      <div className="my-2"></div>
      <div className="w-full flex flex-col gap-4">
        {bookmakers.map((bm) => (
          <div className="w-full flex flex-col md:flex-row bg-[#2C3339] p-4 gap-8 rounded-[12px]">
            <div className="flex-shrink-0 flex flex-row gap-2 justify-center md:justify-start">
              <img src={bm.logo} alt="1xbet" className="w-[64px] h-[64px] md:w-[128px] md:h-[128px] object-contain" />
              <div className="flex flex-col justify-center items-center">
                <span className="text-[20px] font-semibold">{bm.name}</span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
            <div className="px-2 flex-1 flex items-center justify-center text-[14px] font-semibold text-gray-300">
              <span className="line-clamp-3">{bm.description}</span>
            </div>
            <div className="flex-shrink-0 flex flex-row md:flex-col justify-center gap-2">
              <a
                className="bg-blue-500 text-white font-semibold rounded-[8px] px-3 py-1.5 text-[14px] hover:bg-blue-600 transition-colors duration-200"
                href={bm.href}
              >
                Xem chi tiết
              </a>
              <a
                className="bg-yellow-500 text-black font-semibold rounded-[8px] px-3 py-1.5 text-[14px] hover:bg-yellow-600 transition-colors duration-200"
                href={bm.href}
              >
                Đặt cược
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default BookmakersPage;
