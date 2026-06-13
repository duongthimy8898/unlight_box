import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto bg-linear-to-b from-[#09111F] via-[#0D1628] to-[#09111F] text-white border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl text-sm leading-7 text-slate-300 md:text-base"
        >
          Phát sóng trực tiếp bóng đá tất cả giải đấu lớn nhỏ trên thế giới tại SaoMai TV. Hệ thống link saomai.tv cung cấp đầy đủ link xem bóng đá online đường
          truyền tốc độ cao và bình luận tiếng Việt miễn phí. Ngoài việc xem bóng đá trực tuyến tại Sao Mai TV còn mang đến lịch thi đấu đầy đủ nhất, video
          highlight bóng đá mới, tin soi kèo từ chuyên gia, bảng tỷ lệ kèo nhà cái, kết quả bóng đá nhanh nhất, cẩm nang tips, livescore, đội ngũ phóng viên đưa
          tin 24h. Xin chúc quý bạn đọc có những giờ phút xem bóng đá vui vẻ và đồng hành cùng chúng tôi SaoMai TV!
        </motion.p>

        <div className="mt-6">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            src="/logo-x.png"
            alt="Saomai TV"
            className="h-24 w-auto object-contain drop-shadow-[0_6px_18px_rgba(255,184,0,0.25)]"
          />
        </div>

        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["Về chúng tôi", "Chính sách bảo mật", "Điều khoản", "Liên hệ"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-base font-semibold text-white/90 underline decoration-white/70 underline-offset-4 transition-all duration-300 hover:text-white hover:decoration-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="mt-8 text-sm text-slate-400 md:text-base">Copyright © 2026 Saomai TV. All rights reserved</p>
      </div>
    </footer>
  );
};

export { Footer };
