// shared/components/BottomNav.tsx
import { Link, useLoaderData } from "@tanstack/react-router";

export function BottomNav() {
  const sports = useLoaderData({
    from: "__root__",
  });
  const NAV_ITEMS = [
    {
      text: "Trang chủ",
      path: "/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      text: "Lịch thi đấu",
      path: `/lich-thi-dau/${sports.at(0)?.slug}/${sports.at(0)?.id}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      text: "Kết quả",
      path: "/ket-qua",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      text: "Top nhà cái",
      path: "/top-nha-cai",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];
  return (
    // sm:hidden — chỉ hiện trên mobile
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-s z-90 border-t border-[#2a2a2e] pb-safe backdrop-blur-md">
      <div className="flex justify-around items-center py-2">
        {NAV_ITEMS.map((item) => {
          return (
            <Link
              to={item.path}
              key={item.path}
              activeOptions={{ exact: true }}
              activeProps={{
                className: "text-brand! bg-white/5",
              }}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors`}
            >
              {item.icon}
              <span className="text-[10px]">{item.text}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
