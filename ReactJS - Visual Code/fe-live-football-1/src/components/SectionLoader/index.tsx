const SectionLoader = () => {
  return (
    <div className="fixed inset-0 top-[96px] flex items-center justify-center bg-gray-900 z-[100]">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <img loading="lazy" className="w-[32px] h-[32px] shrink-0 animate-spin" src="/ball-2.png" alt="" />
        <p className="text-sm text-gray-300">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
};

export default SectionLoader;
