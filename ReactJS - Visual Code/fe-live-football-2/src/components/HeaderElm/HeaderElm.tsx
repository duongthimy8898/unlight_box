// import { Link, NavLink } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useState } from "react";
import { Gamepad2 } from "lucide-react";
function HeaderElm() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-md flex items-center justify-between gap-4 px-2 md:px-8"
      style={{
        backgroundImage: `url('/assets/images/bg-header.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo */}
      <Link to="/" className="h-full py-2">
        <img loading="lazy" className="block h-full object-contain" src="/assets/images/logo.png" alt="" />
      </Link>
      {/* Desktop menu */}
      <nav className="hidden md:flex gap-6 text-[#fdb400] font-semibold">
        <Link to="/trang-chu" className="hover:text-gray-500">
          TRANG CHỦ
        </Link>
        <Link to="/soi-keo" className="hover:text-gray-500">
          SOI KÈO
        </Link>
        <Link to="/highlight" className="hover:text-gray-500">
          HIGH LIGHT
        </Link>
        <Link to="/top-nha-cai" className="hover:text-gray-500">
          TOP NHÀ CÁI
        </Link>
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <a
          className="text-sm font-medium text-white bg-gradient-to-r from-[#FFBF00] to-[#B1381A] px-4 py-2 rounded hidden lg:flex items-center gap-1"
          href="https://6789x.site/ad9namei159"
          target="_blank"
        >
          <Gamepad2 />
          <span>ĐẶT CƯỢC</span>
        </a>

        {/* <a
          className="text-xs truncate font-medium text-white bg-gradient-to-r from-[#008a1e] to-[#dab514] px-3 py-1 rounded flex lg:hidden items-center gap-1"
          href="https://www.fb88alo.com/vi-VN/Account/Register?affiliateId=8627"
          target="_blank"
        >
          <Gamepad2 />
          <span>ĐẶT CƯỢC</span>
        </a> */}

        {/* Mobile toggle button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none text-[#dab979]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`
    absolute top-16 left-0 w-full bg-black border-t border-[#fdb400] md:hidden
    transition-all duration-300 ease-in-out overflow-hidden
    ${menuOpen ? "max-h-96 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"}
  `}
      >
        <nav className="flex flex-col gap-3 p-4 text-[#fdb400] font-semibold">
          <Link to="/trang-chu" className="hover:text-gray-500">
            TRANG CHỦ
          </Link>
          <Link to="/soi-keo" className="hover:text-gray-500">
            SOI KÈO
          </Link>
          <Link to="/highlight" className="hover:text-gray-500">
            HIGH LIGHT
          </Link>
          <Link to="/top-nha-cai" className="hover:text-gray-500">
            TOP NHÀ CÁI
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default HeaderElm;
