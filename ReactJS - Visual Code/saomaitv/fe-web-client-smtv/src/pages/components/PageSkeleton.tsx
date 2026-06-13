import { LucideVolleyball } from "lucide-react";

export default function PageSkeleton() {
  return (
    <div className="flex h-[calc(100vh-128px)] lg:h-[calc(100vh-64px)] items-center justify-center bg-background" role="status" aria-live="polite" aria-label="Loading">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl" />

        {/* 3D spinning ring */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-orange-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-400 animate-spin shadow-[0_0_30px_rgba(249,115,22,0.45)]" />

          {/* Inner rotating ring */}
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-orange-300 border-l-orange-400 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />

          {/* Center icon */}
          <div className="rounded-full bg-linear-to-br from-orange-400 to-orange-600 p-3 shadow-2xl shadow-orange-500/40">
            <LucideVolleyball className="h-6 w-6 animate-spin text-white [animation-duration:2s]" />
          </div>
        </div>
      </div>
    </div>
  );
}
