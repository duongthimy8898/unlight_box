// shared/components/Header.tsx

import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { sportQueries } from "../../features/sports/queries";
import { LucideBarChartBig, LucideCalendar, LucideHome, LucidePlay } from "lucide-react";

export function Header() {
  const { data: sports } = useSuspenseQuery(sportQueries.list());
  const NAV_ITEMS = [
    {
      icon: <LucideHome size={18} />,
      text: "Trang chủ",
      path: "/",
    },
    {
      icon: <LucideCalendar size={18} />,
      text: "Lịch thi đấu",
      path: `/lich-thi-dau/${sports.at(0)?.slug}`,
    },
    {
      icon: <LucideBarChartBig size={18} />,
      text: "Kết quả",
      path: "/ket-qua",
    },
    {
      icon: <LucidePlay size={18} />,
      text: "Xem lại",
      path: "/xem-lai",
    },
  ];
  return (
    <header className="fixed z-50 top-0 left-0 right-0 h-16 bg-surface border-b bg-[#191919] border-[#2a2a2e] px-2 md:px-5 lg:px-34 py-2 flex items-center justify-between shrink-0">
      <a href="/" className="h-full w-auto">
        <img src="/logo-x.png" alt="Cầu Thủ TV" className="w-auto h-full" />
      </a>

      <nav className="hidden sm:flex gap-0.5 items-center">
        {NAV_ITEMS.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            activeOptions={{ exact: true }}
            className={clsx(
              "flex items-center gap-1",
              "px-3.5 py-1.5 rounded-sm text-[14px] text-zinc-200 uppercase font-semibold cursor-pointer transition-colors",
              "hover:bg-blue-500/25",
            )}
            activeProps={{
              className: "text-white! bg-[#0084ff]! shadow-[inset_0_-2px_0_0_#FFC107]",
            }}
          >
            {item.icon} {item.text}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <a
          href="https://www.olabet.today/register?affiliateCode=khandaia"
          target="_blank"
          className="flex space-x-1 px-3.5 py-1.5 rounded-md bg-linear-to-r from-[#0084ff] to-[#FFC107] hover:from-[#0084ff] hover:to-[#ffd454] hover:shadow-[0_0_14px_#FFC10766] transition-all duration-300"
        >
          <img src="/icons/coin.png" width={20} height={20} alt="" />
          <span className="text-white text-[13px] uppercase font-semibold">Cược uy tín</span>
        </a>
      </div>
    </header>
  );
}
