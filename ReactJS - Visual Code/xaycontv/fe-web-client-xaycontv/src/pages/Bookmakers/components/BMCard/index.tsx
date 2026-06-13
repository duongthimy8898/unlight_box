const BMCard = ({ bookmaker }: { bookmaker: any }) => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-zinc-900 to-black p-5 border border-zinc-800 shadow-lg hover:-translate-y-1 transition-all">
      {/* Logo */}
      <div className="flex justify-center">
        <img src={bookmaker.src} alt="logo" className="h-14 object-contain" />
      </div>

      {/* Rate */}
      <div className="mt-4 text-center text-yellow-400 font-semibold">⭐ 5/5</div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        {/* Primary button */}
        <a
          href={bookmaker.href}
          target="_blank"
          className="relative flex-1 flex justify-center overflow-hidden rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-300 py-2 text-black font-semibold
          transition-all hover:scale-105 hover:shadow-[0_0_18px_rgba(250,204,21,0.8)] active:scale-95"
        >
          <span className="relative z-10">Cược ngay</span>
          <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-500 hover:translate-x-full" />
        </a>

        {/* Detail button */}
        <a
          href={bookmaker.href}
          target="_blank"
          className="flex-1 flex justify-center rounded-lg border border-yellow-400 py-2 text-yellow-400 font-semibold transition-all
          hover:bg-yellow-400 hover:text-black"
        >
          Chi tiết
        </a>
      </div>
    </div>
  );
};

export default BMCard;
