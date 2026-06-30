const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0a0a0f] overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-[120px] bg-[radial-gradient(circle,#7a5c1e_0%,#3d2e0a_50%,transparent_70%)] animate-[glow-pulse_2.4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-100 h-100 rounded-full opacity-10 blur-[100px] bg-[radial-gradient(circle,#5a3e10_0%,transparent_70%)]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* Logo + loading */}
      <div className="relative flex flex-col items-center gap-6 w-full px-10">
        <img
          src="/logo-x.png"
          alt="TLTV"
          className="w-full max-w-60 sm:max-w-xs md:max-w-sm object-contain animate-[logo-pulse_2.4s_ease-in-out_infinite]"
        />

        <p className="-mt-2 text-xs font-medium uppercase tracking-[0.35em] text-[#8a6a28] [text-shadow:0_0_12px_rgba(138,106,40,0.4)]">
          Xem thể thao trực tiếp
        </p>

        <div className="mt-2 w-full max-w-60 sm:max-w-xs md:max-w-sm h-0.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-[linear-gradient(90deg,#a07830,#f5d67a,#c8a84b)] animate-[loading-bar_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
