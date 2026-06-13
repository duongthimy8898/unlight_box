import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import adButtons from "../../config/adButton";

export function Header() {
  const NAV_ITEMS = [
    {
      text: "Trang chủ",
      path: "/",
    },
    {
      text: "Soi kèo",
      path: "/soi-keo",
    },
    {
      text: "Highlight",
      path: "/highlight",
    },
    {
      text: "Top nhà cái",
      path: "/top-nha-cai",
    },
  ];
  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0",
        "flex items-center justify-between shrink-0",
        "bg-[#101727] border-b border-[#2a2a2e]",
        "h-16 py-2 px-2 md:px-3 lg:px-5 2xl:px-58",
      )}
    >
      <Link to="/" className="h-full w-auto">
        <img src="/logo-x.png" alt="SAOMAI TV" className="w-auto h-full" />
      </Link>

      <nav className="hidden sm:flex gap-0.5 items-center">
        {NAV_ITEMS.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            activeOptions={{ exact: true }}
            className={clsx("px-3.5 py-1.5 rounded-sm text-[14px] text-zinc-200 uppercase font-semibold cursor-pointer transition-colors", "hover:bg-white/5")}
            activeProps={{
              className: "bg-linear-to-r from-[#FF6800] to-[#DD2934] text-white!",
            }}
          >
            {item.text}
          </Link>
        ))}
      </nav>

      {/* desktop: buttons — mobile: chỉ avatar */}
      <div className="flex items-center gap-2">
        <a
          href={adButtons.GLOBAL.href}
          target="_blank"
          className="px-3.5 py-1.5 rounded-md bg-linear-180 from-[#00A742] to-[#005D25] text-[13px] hover:bg-linear-90 transition-all cursor-pointer"
        >
          Đặt cược
        </a>
        {/* <button className="px-3.5 py-1.5 rounded-md border border-[#2a2a2e] text-zinc-400 text-[13px] hover:bg-white/5 transition-colors">Tài khoản</button> */}
      </div>
    </header>
  );
}
