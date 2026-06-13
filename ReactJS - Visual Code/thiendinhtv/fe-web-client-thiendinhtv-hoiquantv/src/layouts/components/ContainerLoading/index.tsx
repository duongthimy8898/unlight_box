import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ContainerLoading = () => {
  return (
    <div className="absolute z-30 top-0 right-0 w-full h-full bg-[#141414] px-4">
      <Skeleton borderRadius={20} height={400} width="100%" baseColor="#2a2a2a" highlightColor="#3a3a3a" />
      <div className="mt-4 w-full flex flex-col gap-6">
        {/* Title */}
        <Skeleton count={1} height={40} baseColor="#2a2a2a" highlightColor="#3a3a3a" />

        {/* Grid 5 */}
        <div className={clsx("grid gap-4", "grid-cols-1", "tb:grid-cols-2", "lt:grid-cols-3", "dt:grid-cols-4")}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={200} baseColor="#2a2a2a" highlightColor="#3a3a3a" />
          ))}
        </div>
      </div>
      <div className="mt-4 w-full flex flex-col gap-6">
        {/* Title */}
        <Skeleton count={1} height={40} baseColor="#2a2a2a" highlightColor="#3a3a3a" />

        {/* Grid 5 */}
        <div className={clsx("grid gap-4", "grid-cols-1", "tb:grid-cols-2", "lt:grid-cols-3", "dt:grid-cols-4")}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={200} baseColor="#2a2a2a" highlightColor="#3a3a3a" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContainerLoading;
