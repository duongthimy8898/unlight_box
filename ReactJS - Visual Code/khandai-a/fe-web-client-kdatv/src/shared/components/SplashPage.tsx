

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
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />

        {/* 3D spinning ring */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" /> */}
          {/* <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin shadow-[0_0_30px_rgba(0,0,255,0.45)]" /> */}

          {/* Inner rotating ring */}
          {/* <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-blue-300 border-l-blue-400 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" /> */}

          {/* Center icon */}
          <div className="rounded-full bg-linear-to-br from-blue-400 to-blue-600 p-3 shadow-2xl shadow-blue-500/40 animate-ping">
            <img src="/favicon.svg" alt="" className="block size-5 object-contain rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
