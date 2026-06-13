import clsx from "clsx";
import { LuCalendarRange, LuClub, LuEarth, LuFlag, LuLayoutDashboard, LuLayoutTemplate, LuUser, LuUsers, LuVideo } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth.hook";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    "relative flex flex-row items-center h-11 focus:outline-none",
    "hover:bg-white/10 active:bg-white/10",
    "text-white-600 hover:text-white-800",
    "border-l-4 pr-6",
    // mặc định border trong suốt
    !isActive && "border-transparent hover:border-blue-500/50",
    // khi active
    isActive && "bg-white/10 border-blue-500 text-white"
  );

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-black h-full text-white transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <NavLink to="/dashboard" className={navLinkClass} end>
              <span className="inline-flex justify-center items-center ml-4">
                <LuLayoutDashboard />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Bảng quản trị</span>
            </NavLink>
          </li>

          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">QUICK</div>
            </div>
          </li>

          <li>
            {user?.role === "administrator" && (
              <>
                <NavLink to="/dashboard/sports" className={navLinkClass}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <LuEarth />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Môn thể thao</span>
                </NavLink>
                <NavLink to="/dashboard/leagues" className={navLinkClass}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <LuFlag />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Giải đấu</span>
                </NavLink>
                <NavLink to="/dashboard/teams" className={navLinkClass}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <LuClub />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Đội tuyển</span>
                </NavLink>
              </>
            )}
            <NavLink to="/dashboard/fixtures" className={navLinkClass}>
              <span className="inline-flex justify-center items-center ml-4">
                <LuCalendarRange />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Lịch thi đấu</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/replays" className={navLinkClass}>
              <span className="inline-flex justify-center items-center ml-4">
                <LuVideo />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Xem lại</span>
            </NavLink>
          </li>

          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center mt-5 h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">ADVANCE</div>
            </div>
          </li>
          {user?.role === "administrator" && (
            <>
              <li>
                <NavLink to="/dashboard/internal-users" className={navLinkClass}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <LuUsers />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Tài khoản nội bộ</span>
                </NavLink>
              </li>

              <li>
                <NavLink hidden to="/dashboard/external-sites" className={navLinkClass}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <LuEarth />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Tên miền liên kết</span>
                </NavLink>
              </li>

              <li>
                <NavLink hidden to="/dashboard/external-ad-settings" className={navLinkClass}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <LuLayoutTemplate />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Thiết lập Banner QC</span>
                </NavLink>
              </li>

              <li>
                <NavLink hidden to="/dashboard/external-accounts" className={navLinkClass}>
                  <span className="inline-flex justify-center items-center ml-4">
                    <LuUsers />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">Tài khoản người dùng</span>
                </NavLink>
              </li>

              <li className="px-5 hidden md:block">
                <div className="flex flex-row items-center mt-5 h-8">
                  <div className="text-sm font-light tracking-wide text-gray-400 uppercase">ME</div>
                </div>
              </li>
            </>
          )}
          <li hidden>
            <NavLink to="/dashboard/me" className={navLinkClass}>
              <span className="inline-flex justify-center items-center ml-4">
                <LuUser />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Cập nhật hồ sơ</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
