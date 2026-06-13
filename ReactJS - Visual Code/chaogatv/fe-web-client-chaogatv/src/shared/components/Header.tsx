// shared/components/Header.tsx

import { Link, useLoaderData } from "@tanstack/react-router";
import clsx from "clsx";

export function Header() {
  const sports = useLoaderData({
    from: "__root__",
  });
  const NAV_ITEMS = [
    {
      text: "Trang chủ",
      path: "/",
    },
    {
      text: "Lịch thi đấu",
      path: `/lich-thi-dau/${sports.at(0)?.slug}/${sports.at(0)?.id}`,
    },
    {
      text: "Kết quả",
      path: "/ket-qua",
    },
    {
      text: "Top nhà cái",
      path: "/top-nha-cai",
    },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-[#2a2a2e] px-2 md:px-5 lg:px-34 py-2 flex items-center justify-between shrink-0">
      <Link to="/" className="h-full w-auto">
        <img src="/logo-x.png" alt="Cháo Gà TV" className="w-auto h-full" />
      </Link>

      <nav className="hidden sm:flex gap-0.5 items-center">
        {NAV_ITEMS.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            activeOptions={{ exact: true }}
            className={clsx(
              "px-3.5 py-1.5 rounded-sm text-[14px] text-zinc-200 uppercase font-semibold cursor-pointer transition-colors",
              "hover:bg-white/5 hover:border-b-3 border-transparent hover:border-brand hover:text-brand",
            )}
            activeProps={{
              className: "text-brand! border-b-3 border-brand! bg-white/5",
            }}
          >
            {item.text}
          </Link>
        ))}
      </nav>

      {/* desktop: buttons — mobile: chỉ avatar */}
      <div className="flex items-center gap-2">
        <a href="https://www.bwing20.com/vn?affCode=22187" target="_blank" className="px-3.5 py-1.5 rounded-md bg-brand text-black text-[13px] hover:bg-amber-400 transition-colors">
          Đặt cược
        </a>
        <button className="px-3.5 py-1.5 rounded-md border border-[#2a2a2e] text-zinc-400 text-[13px] hover:bg-white/5 transition-colors">Tài khoản</button>
      </div>
    </header>
  );
}
