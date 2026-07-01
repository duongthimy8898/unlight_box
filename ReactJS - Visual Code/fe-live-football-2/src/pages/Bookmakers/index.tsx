import { Star } from "lucide-react";
import MarqueeElm from "../../components/MarqueeElm";
import bookmakers from "../../data/bookmakers";

const BookmakersPage = () => {
  return (
    <>
      <MarqueeElm />
      <div className="px-[8px] max-w-[1280px] min-h-[629px] mx-auto">
        <h1
          className="text-[32px] font-bold text-yellow-400 text-center my-4"
          style={{
            WebkitTextStroke: "1px black",
            WebkitTextStrokeColor: "1px black", // cho Firefox (tùy trình duyệt)
          }}
        >
          Top Nhà Cái Uy Tín
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {bookmakers.map((item, index) => (
            <div key={index} className="bg-[#111] border border-yellow-500 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <img src={item.logo} alt={item.name} className="w-20 h-20 object-contain mb-4 rounded-full border border-yellow-500 p-1" />
              <h2 className="text-xl font-semibold text-white mb-2">{item.name}</h2>
              <div className="flex justify-center mb-2">
                {Array(item.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
              </div>
              <p className="text-sm text-gray-300 mb-4">{item.description}</p>
              <a className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl transition" href={item.href} target="_blank">
                Đặt cược ngay
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookmakersPage;
