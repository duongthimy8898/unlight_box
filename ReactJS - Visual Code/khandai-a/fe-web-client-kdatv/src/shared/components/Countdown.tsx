import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate?: Date | string | number;
};

const pad = (n: number) => n.toString().padStart(2, "0");

const Countdown = ({ targetDate }: CountdownProps) => {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const glassValueClass =
    "relative w-full text-center bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(8,30,60,0.18))] border border-white/10 backdrop-blur-sm text-white text-xl sm:text-2xl font-mono font-semibold sm:font-bold tracking-tight px-4 py-3 rounded-2xl overflow-hidden truncate shadow-[0_12px_36px_rgba(14,165,233,0.14)]";

  const unitContainerClass = "flex flex-col items-center min-w-[64px] sm:min-w-[96px]";

  if (!targetDate) {
    return (
      <div className="inline-flex items-center gap-2 flex-wrap justify-center max-w-full">
        <div className="px-3 py-2 rounded-xl bg-[linear-gradient(135deg,rgba(10,25,41,0.6),rgba(6,40,60,0.35))] border border-white/10 backdrop-blur-sm text-white text-sm shadow-[0_8px_24px_rgba(29,78,216,0.08)]">
          Chưa phát sóng, vui lòng chờ
        </div>
      </div>
    );
  }

  const target = typeof targetDate === "string" || typeof targetDate === "number" ? new Date(targetDate) : targetDate;
  let diff = Math.max(0, target.getTime() - now);

  if (diff <= 0) {
    return <div className="text-center text-sm font-semibold">Đang phát</div>;
  }

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const units = [
    { label: "Ngày", value: String(days) },
    { label: "Giờ", value: pad(hours) },
    { label: "Phút", value: pad(minutes) },
    { label: "Giây", value: pad(seconds) },
  ];

  return (
    <div className="inline-flex items-center gap-3 flex-wrap justify-center max-w-full">
      {units.map((u) => (
        <div key={u.label} className={unitContainerClass}>
          <div className={glassValueClass}>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25))" }}
            />
            <div className="relative z-10">{u.value}</div>
          </div>
          <div className="text-[10px] sm:text-xs text-white/70 mt-1 uppercase tracking-wide font-medium">{u.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
