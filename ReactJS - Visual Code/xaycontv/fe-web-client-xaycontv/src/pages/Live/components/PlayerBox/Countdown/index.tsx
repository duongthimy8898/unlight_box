import { useCallback, useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string | Date;
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
    <div
      className="
        flex flex-col items-center justify-center
        bg-gradient-to-b from-zinc-600 to-zinc-800
        border-2 border-zinc-700
        rounded-md
        shadow-[inset_0_-4px_0_rgba(0,0,0,0.5)]
        transition-all duration-300

        w-14 h-14
        sm:w-16 sm:h-16
        md:w-20 md:h-20
        lg:w-24 lg:h-24
      "
    >
      <span
        className="
          font-extrabold tracking-wider text-yellow-400
          text-base
          sm:text-lg
          md:text-2xl
          lg:text-3xl
        "
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="
          uppercase font-bold tracking-widest text-zinc-300
          text-[9px]
          sm:text-[10px]
          md:text-xs
          lg:text-sm
          mt-1
        "
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="
        w-full
        flex flex-col items-center
        gap-2 sm:gap-4
        py-3 sm:py-4
        px-3 sm:px-6
        bg-gradient-to-b from-zinc-900/75 to-black/75
        border border-zinc-800
        rounded-xl
        shadow-xl
      "
    >
      <p
        className="
          text-yellow-400 font-extrabold uppercase tracking-widest text-center
          text-[11px]
          sm:text-sm
          md:text-base
        "
      >
        Trận đấu sẽ bắt đầu sau
      </p>

      <div
        className="
          flex items-center justify-center
          gap-2 sm:gap-3 md:gap-4 lg:gap-6
          flex-wrap sm:flex-nowrap
        "
      >
        {renderTimeBox(timeLeft.days, "Ngày")}
        <Colon />
        {renderTimeBox(timeLeft.hours, "Giờ")}
        <Colon />
        {renderTimeBox(timeLeft.minutes, "Phút")}
        <Colon />
        {renderTimeBox(timeLeft.seconds, "Giây")}
      </div>
    </div>
  );
};

const Colon = () => (
  <span
    className="
      text-yellow-500 font-extrabold
      text-lg
      sm:text-xl
      md:text-2xl
      lg:text-3xl
      pb-2
    "
  >
    :
  </span>
);

export default Countdown;
