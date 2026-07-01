import { Link } from "react-router-dom";

function FooterElm() {
  return (
    <footer className="mt-16 bg-[#000]/80 flex flex-col lg:flex-row items-center justify-between gap-4 py-8 px-4">
      <Link to="/" className="w-full max-w-[256px] mx-auto">
        <img loading="lazy" src="/assets/images/logo.png" alt="" />
      </Link>
      <ul className="w-full flex flex-wrap gap-2 items-center justify-center text-gray-300 text-[12px] font-semibold">
        <li>Chính sách bảo mật</li>
        <li>Điều khoản</li>
        <li>Về chúng tôi</li>
        <li>Liên hệ</li>
      </ul>
      <p className="whitespace-nowrap text-[12px] font-light text-[#CF3F3F]">
        Copyright @tamquoctv 2025
      </p>
    </footer>
  );
}
export default FooterElm;
