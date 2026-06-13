import { LuLogOut } from "react-icons/lu";
import { logout } from "../../../../services/authServices";

const Header = () => {
  const handleLogout = async () => {
    await logout();
    location.reload();
  };
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between h-14 text-white z-10">
      <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-black border-none">
        <img className="hidden md:block md:w-full md:h-10 mr-2 rounded-md overflow-hidden object-contain" src="/logo.png" />
        <img className="w-7 h-7 md:hidden object-contain" src="/favicon.png" alt="" />
      </div>
      <div className="flex justify-end items-center h-14 bg-black flex-1">
        <ul className="flex items-center">
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center mr-4 text-red-600 hover:text-red-200 hover:bg-red-600 transaction duration-100 bg-white/5 px-3 py-2 rounded"
            >
              <LuLogOut size={20} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
