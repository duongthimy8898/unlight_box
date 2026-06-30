

export default function SplashPage() {
  return (
    <div
      className="flex h-[calc(100vh-128px)] lg:h-[calc(100vh-64px)] items-center justify-center bg-inherit"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-2xl glow-peach" />

        {/* 3D spinning ring */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* <div className="absolute inset-0 rounded-full border-4 border-pink-500/20" /> */}
          {/* <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500 border-r-pink-400 animate-spin shadow-[0_0_30px_rgba(0,0,255,0.45)]" /> */}

          {/* Inner rotating ring */}
          {/* <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-pink-300 border-l-pink-400 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" /> */}

          {/* Center icon */}
          <div className="rounded-full bg-linear-to-br from-pink-400 to-pink-600 p-3 shadow-2xl shadow-pink-500/40 animate-ping">
            <img src="/favicon.svg" alt="" className="block size-5 object-contain rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
