// features/fixtures/components/FixturesSkeleton.tsx
import Skeleton from "react-loading-skeleton";

export function HomeSkeleton() {
  return (
    <div className="px-2 lg:px-0">
      <div className="w-full flex items-center lg:items-start mt-2">
        <Skeleton containerClassName="flex-1" className="h-12 md:h-7 rounded-md" />
      </div>
      <Skeleton width="100%" className="rounded-lg mt-2 aspect-1365/354" />
      <div className="mt-4">
        <Skeleton height={24} width="50%" className="mb-2" />
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <Skeleton height={228} borderRadius={8} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
