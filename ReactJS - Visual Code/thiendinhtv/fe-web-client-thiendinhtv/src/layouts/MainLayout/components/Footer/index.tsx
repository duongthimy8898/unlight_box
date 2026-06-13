export default function Footer() {
  return (
    <footer className="mb-[52px] lt:mb-0 w-full text-gray-300 px-2 lt:px-4">
      <div className="bg-black w-full rounded-t-[20px] mx-auto px-4 lt:px-16 py-8 lt:py-12 flex flex-col gap-x-4 gap-y-4">
        {/* Logo + Description */}
        <div className="flex flex-col items-start gap-6">
          <img src="/logo.png" alt="ThienDinhTV" className="h-14 w-auto" />
          <p className="leading-relaxed text-sm md:text-base">
            ThienDinhTV – Phát sóng trực tiếp các trận đấu thể thao (bóng đá, bóng rổ, bóng chuyền, billiards... ) tất các giải đấu lớn nhỏ trên thế giới. Hệ thống link
            ThienDinhTV cung cấp đầy đủ link xem bóng đá, bóng rổ, bóng chuyền, billiards, ... online đường truyền tốc độ cao và bình luận tiếng Việt miễn phí.
            Ngoài việc xem thể thao trực tuyến tại ThienDinhTV còn mang đến lịch thi đấu đầy đủ nhất, video xem lại các trận đấu mới nhất, tin soi kèo từ chuyên
            gia, bảng tỷ lệ kèo nhà cái, kết quả bóng rổ, bóng chuyền nhanh nhất, cẩm nang tips, livescore, đội ngũ phóng viên đưa tin 24h.
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium">
          <a className="hover:text-white cursor-pointer underline">Hỏi - Đáp</a>
          <a className="hover:text-white cursor-pointer underline">Chính sách bảo mật</a>
          <a className="hover:text-white cursor-pointer underline">Điều khoản sử dụng</a>
          <a className="hover:text-white cursor-pointer underline">Giới thiệu</a>
          <a className="hover:text-white cursor-pointer underline">Liên hệ</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400">Copyright © ThienDinhTV reserved.</div>
      </div>
    </footer>
  );
}
