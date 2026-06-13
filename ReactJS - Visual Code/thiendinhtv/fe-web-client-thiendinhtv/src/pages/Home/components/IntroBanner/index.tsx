const IntroBanner = () => {
  return (
    <div
      className="w-full bg-[#C4E456] flex flex-col rounded-[20px] py-6 px-6 lt:py-16 lt:px-16"
      style={{
        backgroundImage: "url('/home-banner.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row">
        <div className="flex-1 flex flex-col items-center lt:items-start gap-2 text-black">
          <img src="/favicon.png" alt="" className="w-[100px] lt:w-[200px]" />
          <h1 className="text-[18px] lt:text-[24px] text-center lt:text-start font-bold">ThienDinhTV xem trực tiếp bóng đá, bóng chuyền, bóng rổ, billiards online nhanh nhất</h1>
          <p className="hidden lt:block text-[14px] font-semibold">
            ThienDinhTV là kênh cập nhật link xem trực tiếp bóng đá, bóng chuyền, bóng rổ và các môn thể thao khác cho Fan hâm mộ Việt Nam và Quốc tế qua kết
            nối Internet. Xem thể thao trực tuyến với trên Robong đường truyền tốc độ cao, không lag giật tất cả các trận đấu lớn nhỏ trên toàn cầu tại Robong
          </p>
        </div>
        <div className="hidden lt:flex flex-1 flex-col items-center">
          <img src="/players-in-home-banner.png" alt="" className="w-[380px]" />
        </div>
      </div>
      <h3 className="hidden lt:block text-[24px] text-black font-bold text-center">ThienDinhTV - Thương Hiệu Sắp Nổi Tiếng</h3>
    </div>
  );
};

export default IntroBanner;
