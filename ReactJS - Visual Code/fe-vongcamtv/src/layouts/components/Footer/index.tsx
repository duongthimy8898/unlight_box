const Footer = () => {
  return (
    <footer className="w-full bg-[#1A1D23] py-6">
      <div className="w-full py-6 px-4 border-y border-[#96C05266] flex flex-col space-y-2">
        <div className="w-full max-w-[1024px] mx-auto flex flex-col items-center space-y-2 lt:flex-row lt:space-y-0 lt:space-x-2">
          <a className="flex-shrink-0 block w-fit mx-auto h-12 opacity-75" href="/">
            <img className="h-full" src="/logo-x.png" alt="" />
          </a>
          <p className="text-white opacity-75 text-center text-balance text-sm">
            Mọi trận đấu cho dù giải nhỏ cho tới các giải đấu lớn thì VongCamTV đều cung cấp đầy đủ link xem trực tiếp bóng đá online với độ phân giải và chất
            lượng cao nhất. Ngoài việc xem bóng đá trực tuyến, chúng tôi còn gửi tới bạn đọc lịch thi đấu bóng đá, kết quả bóng đá và soi kèo bóng đá với tỷ lệ
            chiến thắng cao. Chúc bạn đọc xem bóng đá vui vẻ và luôn ủng hộ VongCamTV.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
