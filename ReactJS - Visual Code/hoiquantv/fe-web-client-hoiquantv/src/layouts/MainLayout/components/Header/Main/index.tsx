import clsx from "clsx";
import { forwardRef } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import adButtons from "../../../../../data/adButtons";

interface AddtionalProps extends React.HTMLProps<HTMLDivElement> {
  additionalClassName?: string;
}

const Main = forwardRef<HTMLDivElement, AddtionalProps>((props, ref) => {
  return (
    <div ref={ref} className={clsx(props.additionalClassName, "w-full bg-inherit flex justify-between items-center py-2 px-2")}>
      <Link to="/trang-chu" className={clsx("flex-shrink-0 w-fit max-w-[144px] h-full max-h-[60px]")}>
        <img src="/logo.png" alt="" className="block w-auto max-w-[144px] h-full max-h-[60px] object-contain" />
      </Link>
      <div className={clsx("hidden space-x-2 items-center", "lt:flex")}>
        <NavLink
          to="/trang-chu"
          end
          className={({ isActive }) =>
            clsx("block w-fit py-1 px-3 transition-colors text-white", isActive && "!text-blue-500", !isActive && "hover:!text-blue-400")
          }
        >
          <span className="font-bold text-sm">TRANG CHỦ</span>
        </NavLink>
        <NavLink
          to="/lich-thi-dau"
          className={({ isActive }) =>
            clsx("block w-fit py-1 px-3 transition-colors text-white", isActive && "!text-blue-500", !isActive && "hover:!text-blue-400")
          }
        >
          <span className="font-bold text-sm">LỊCH THI ĐẤU</span>
        </NavLink>
        <NavLink
          to="/ket-qua"
          className={({ isActive }) =>
            clsx("block w-fit py-1 px-3 transition-colors text-white", isActive && "!text-blue-500", !isActive && "hover:!text-blue-400")
          }
        >
          <span className="font-bold text-sm">KẾT QUẢ</span>
        </NavLink>
        <NavLink
          to="/xem-lai"
          className={({ isActive }) =>
            clsx("block w-fit py-1 px-3 transition-colors text-white", isActive && "!text-blue-500", !isActive && "hover:!text-blue-400")
          }
        >
          <span className="font-bold text-sm">XEM LẠI</span>
        </NavLink>
      </div>
      <div className="flex justify-center items-stretch space-x-2">
        <div className="flex justify-center items-center space-x-1">
          <a
            href="mailto:ads.hoiquantv@hotmail.com"
            target="_blank"
            className={clsx(
              "hidden tb:flex w-fit flex-shrink-0 bg-gradient-to-r from-[#124783] to-[#1A62B3] rounded-full text-white items-center font-semibold"
            )}
          >
            <span className="flex-shrink-0 h-8 aspect-square flex justify-center items-center rounded-full bg-red-500 text-md border border-white">Ad</span>
            <span className={clsx("hidden flex-shrink-0 text-sm px-3 whitespace-nowrap", "tb:block")}>ads.hoiquantv@hotmail.com</span>
          </a>

          <a
            href={adButtons.GLOBAL.href}
            target="_blank"
            className={clsx(
              "w-fit flex-shrink-0",
              "bg-gradient-to-r from-yellow-600 to-yellow-500",
              "rounded-full text-white flex justify-start items-center font-semibold"
            )}
          >
            <span className="flex-shrink-0 h-8 aspect-square flex justify-center items-center rounded-full bg-green-600 text-md border border-white">
              <FaSackDollar size={16} />
            </span>
            <span className={clsx("flex-shrink-0 text-sm px-3 whitespace-nowrap", "tb:block")}>Cược Uy Tín</span>
          </a>
        </div>
        <ProfileMenu />
      </div>
    </div>
  );
});

export default Main;
