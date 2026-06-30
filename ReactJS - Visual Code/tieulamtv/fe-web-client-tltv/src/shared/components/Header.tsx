import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { Mail } from "lucide-react";

const Header = () => {
  return (
    <header
      className={clsx("sticky top-0 left-0 z-50", "h-16 xl:h-19 bg-[#131313] flex justify-between items-center py-2 px-4")}
    >
      <a href={"/trang-chu"} className="h-full">
        <img src="/logo-x.png" alt="Logo" className="h-full" />
      </a>
      <nav className={clsx("hidden lg:flex", "flex-row gap-0")}>
        <li>
          <Link
            to={"/trang-chu"}
            activeOptions={{
              exact: true,
              includeSearch: false,
            }}
            activeProps={{
              className: "text-[#ffd000]!",
            }}
            className={clsx(
              "py-3 px-4",
              "text-sm text-white uppercase font-bold",
              "hover:bg-white/10 active:bg-white/10",
              "transition-colors duration-200 ease-in-out",
            )}
          >
            Trang chủ
          </Link>
        </li>
        <li>
          <Link
            to={"/lich-thi-dau"}
            activeOptions={{
              exact: true,
              includeSearch: false,
            }}
            activeProps={{
              className: "text-[#ffd000]!",
            }}
            className={clsx(
              "py-3 px-4",
              "text-sm text-white uppercase font-bold",
              "hover:bg-white/10 active:bg-white/10",
              "transition-colors duration-200 ease-in-out",
            )}
          >
            Lịch thi đấu
          </Link>
        </li>
        <li>
          <Link
            to={"/top-nha-cai"}
            activeOptions={{
              exact: true,
              includeSearch: false,
            }}
            activeProps={{
              className: "text-[#ffd000]!",
            }}
            className={clsx(
              "py-3 px-4",
              "text-sm text-white uppercase font-bold",
              "hover:bg-white/10 active:bg-white/10",
              "transition-colors duration-200 ease-in-out",
            )}
          >
            Top nhà cái
          </Link>
        </li>
      </nav>
      <div className="flex items-center gap-1">
        <a
          href="#!mailto:info@tltv.com"
          className={clsx(
            "bg-[#ffd000]",
            "gap-1 items-center",
            "hidden md:flex",
            "rounded-full px-2 py-1",
            "text-sm text-black font-semibold",
          )}
        >
          <Mail />
          <span>ads.tieulamtv@hotmail.com</span>
        </a>
        <a
          href="#!"
          className={clsx(
            "bg-[#ffd000]",
            "shrink-0 flex gap-1 items-center",
            "rounded-full px-2 py-1",
            "text-sm text-black font-semibold",
          )}
        >
          <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 3.3 1.35-.95c1.82.56 3.37 1.76 4.38 3.34l-.39 1.34-1.35.46L13 6.7zm-3.35-.95L11 5.3v1.4L7.01 9.49l-1.35-.46-.39-1.34c1.01-1.57 2.56-2.77 4.38-3.34M7.08 17.11l-1.14.1C4.73 15.81 4 13.99 4 12c0-.12.01-.23.02-.35l1-.73 1.38.48 1.46 4.34zm7.42 2.48c-.79.26-1.63.41-2.5.41s-1.71-.15-2.5-.41l-.69-1.49.64-1.1h5.11l.64 1.11zM14.27 15H9.73l-1.35-4.02L12 8.44l3.63 2.54zm3.79 2.21-1.14-.1-.79-1.37 1.46-4.34 1.39-.47 1 .73c.01.11.02.22.02.34 0 1.99-.73 3.81-1.94 5.21" />
          </svg>
          <span>CƯỢC NGAY</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
