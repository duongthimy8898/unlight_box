import clsx from "clsx";
import { FaFutbol } from "react-icons/fa";
const ContainerLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center rounded-[12px] bg-[url('/bg-web.png')] bg-repeat bg-contain">
      <div className="animate-bounce">
        <div className="text-4xl text-yellow-500 animate-spin">
          <FaFutbol />
        </div>
      </div>
      <span className={clsx("text-gray-500", "text-xs", "lt:text-sm")}>Đang tải...</span>
    </div>
  );
};

export default ContainerLoading;
