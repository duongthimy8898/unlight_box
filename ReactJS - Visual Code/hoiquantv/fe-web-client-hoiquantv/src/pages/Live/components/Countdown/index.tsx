import { useCallback, useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string | Date; // ngày kết thúc
};

const Countdown = ({ targetDate }: CountdownProps) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const renderTimeBox = (value: number, label: string) => (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-900 to-blue-700 text-white rounded-xl shadow-lg px-4 py-2 w-16 md:w-20 lg:w-24 transition-all duration-300 transform hover:scale-105">
      <span className="text-xl md:text-2xl lg:text-4xl font-extrabold tracking-wide animate-pulse">{String(value).padStart(2, "0")}</span>
      <span className="uppercase text-xs md:text-sm text-blue-300 font-semibold mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2 lt:gap-4 p-4 bg-black/10 rounded-2xl backdrop-blur">
      <p className="text-sm lt:text-lg font-semibold uppercase">Trận đấu sẽ bắt đầu sau</p>
      <div className="flex justify-center gap-3 md:gap-4 lg:gap-6">
        {renderTimeBox(timeLeft.days, "Ngày")}
        <span className="text-base md:text-2xl lg:text-4xl font-extrabold text-blue-500 flex items-center">:</span>
        {renderTimeBox(timeLeft.hours, "Giờ")}
        <span className="text-base md:text-2xl lg:text-4xl font-extrabold text-blue-500 flex items-center">:</span>
        {renderTimeBox(timeLeft.minutes, "Phút")}
        <span className="text-base md:text-2xl lg:text-4xl font-extrabold text-blue-500 flex items-center">:</span>
        {renderTimeBox(timeLeft.seconds, "Giây")}
      </div>  
    </div>
  );
};

export default Countdown;
