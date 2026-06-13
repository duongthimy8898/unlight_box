// features/fixtures/components/FixturesSkeleton.tsx
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";

export function LiveSkeleton() {
  return (
    <div className="px-2 lg:px-0">
      <div className="w-full flex items-center lg:items-start mt-2">
        <Skeleton containerClassName="flex-1" className="h-6 md:h-7 rounded-md" />
      </div>
      <Skeleton width="100%" className="rounded-lg mt-2 h-63" />
      <div className="mt-2">
        <Skeleton height={40} width="50%" className="mb-2" />
      </div>
      <div className="mt-2">
        <section className={clsx("flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-2")}>
          <Skeleton className="w-full aspect-video"></Skeleton>
          <Skeleton className="w-full h-full"></Skeleton>
        </section>
      </div>
    </div>
  );
}
