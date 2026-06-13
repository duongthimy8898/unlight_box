import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

interface ExtraProps extends React.HTMLProps<HTMLDivElement> {
  additionalClassName?: string;
}

const navItems = [
  { label: "Lịch thi đấu", to: "/lich-thi-dau" },
  { label: "Tin tức", to: "/tin-tuc" },
  { label: "TOP nhà cái", to: "/top-nha-cai" },
  // { label: "Liên hệ", to: "/lien-he" },
];

const Main = React.forwardRef<HTMLDivElement, ExtraProps>((props, ref) => {
  return (
    <div ref={ref} className={clsx(props.additionalClassName, "w-full bg-black h-[52px] px-1.5 py-1.5", "tb:h-[64px] tb:px-2 tb:py-2")}>
      <div className="w-full h-full flex justify-between items-center">
        <a className="h-full" href="/">
          <img className="h-full" src="/logo-x.png" alt="" />
        </a>
        <nav className="hidden tb:flex items-center gap-6">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => clsx("text-white font-semibold text-sm uppercase transition-colors duration-200", isActive && "text-green-500")}
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <a
          className={clsx(
            "text-white inline-flex items-center space-x-1 font-semibold text-sm py-1 px-3 rounded-lg border border-white",
            "bg-gradient-to-r from-[#243F0D] to-[#5EA523]",
            "tb:py-2 tb:px-4"
          )}
          href="https://6789x.site/ad9namei200" target="_blank"
        >
          {/* <Dices className="animate-pulse" /> */}
          <span className="animate-pulse">Đặt Cược</span>
        </a>
      </div>
    </div>
  );
});

export default Main;
