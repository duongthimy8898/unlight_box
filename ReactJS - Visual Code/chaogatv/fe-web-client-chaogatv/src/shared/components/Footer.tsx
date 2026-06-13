// shared/components/Footer.tsx
const footerLinks = [
  { title: "Thể thao", links: ["Bóng đá", "Bóng chuyền", "Billiards", "Cầu lông"] },
  { title: "Hỗ trợ", links: ["Hướng dẫn", "Liên hệ", "Báo lỗi"] },
  { title: "Pháp lý", links: ["Điều khoản", "Bảo mật"] },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-[#2a2a2e] px-5 pt-6 pb-4 shrink-0">
      <div className="w-full mx-auto flex justify-between gap-6">
        <div>
          <p className="text-[14px] font-bold text-brand mb-1.5">CHÁOGÀ.TV</p>
          <p className="text-[12px] text-zinc-600 leading-relaxed max-w-60">Xem trực tiếp bóng đá miễn phí, chất lượng Full HD.</p>
        </div>
        <div className="flex gap-2 sm:gap-5 md:gap-10">
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">{col.title}</h4>
              {col.links.map((link) => (
                <a key={link} className="block text-[12px] text-zinc-500 hover:text-zinc-300 mb-1.5 cursor-pointer transition-colors">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-4 pt-4 border-t border-[#1f1f22] flex justify-between items-center">
        <span className="text-[12px] text-zinc-700">© 2026 Chaogate. Bảo lưu mọi quyền.</span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-surface text-zinc-600 border border-[#2a2a2e]">v2.0.0</span>
      </div>
    </footer>
  );
}
