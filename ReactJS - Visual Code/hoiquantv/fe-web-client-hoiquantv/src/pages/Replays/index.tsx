import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffect, useMemo } from "react";
import ReplayCard from "./components/ReplayCard";
// import ReplayCard from "./components/ReplayCard";

const ReplaysPage = () => {
  const navigate = useNavigate();
  const { sports, replays } = useDataContext();
  const { sportSlug } = useParams();
  const pageSport = useMemo(() => {
    console.log("page-sportchaned");
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  useEffect(() => {
    if (sports.data && !pageSport) {
      navigate("/trang-chu"); // quay về trang chủ nếu slug không hợp lệ
    }
  }, [sports.data, pageSport, navigate]);
  return (
    <div className="w-full">
      <Breadcrumb
        segments={[
          { text: "🔁 Xem lại", path: "xem-lai" },
          { text: pageSport?.name || "undefined", path: `xem-lai/${pageSport?.slug}` },
        ]}
      />
      <div className="w-full px-2 flex flex-col gap-6">
        <div className="w-full space-y-1">
          <p className="text-xl font-bold text-yellow-400">XEM LẠI NHỮNG TRẬN ĐẤU ĐỈNH CAO TRÊN HOIQUANTV TV MỚI NHẤT, CẬP NHẬT LIÊN TỤC</p>
          <p className="text-sm text-gray-300">
            Trang Hoiquan TV cập nhật đầy đủ các video bóng đá, thể thao chất lượng nhất, được bình luận bằng tiếng Việt. Thêm vào đó còn có các tin tức thể
            thao mới nhất được cập nhật liên tục.
          </p>
        </div>
        <div className="w-full">
          <div className="w-full flex">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên trận, đội tuyển, bình luận viên,..."
              className="flex-1 py-2 px-2 text-sm border-none bg-blue-500/10 outline outline-1 outline-blue-500/25 focus:outline-2 focus:outline-blue-500"
            />
            <button className="bg-blue-500 text-sm border-none outline outline-1 outline-blue-500 hover:outline-2 hover:outline-blue-500 px-3">Tìm kiếm</button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 tb:grid-cols-2 lt:grid-cols-3 dt:grid-cols-4 gap-4">
          {replays.data
            ?.filter((o) => o.sport.id === pageSport?.id)
            .map((o, idx) => (
              <div key={idx} className="w-full">
                <ReplayCard replay={o} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReplaysPage;
