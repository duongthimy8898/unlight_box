import { LucideClock } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div
      className="relative flex h-[calc(100vh-128px)] lg:h-[calc(100vh-64px)] mx-auto items-center justify-center overflow-hidden bg-background scale-90 rounded-xl"
      
    >
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-background to-orange-600/5" />

      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl perspective-distant">
        <div className="rounded-3xl bg-card/80 p-10 text-center shadow-2xl backdrop-blur-xl transform-[rotateX(6deg)_rotateY(-4deg)]">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-orange-600 shadow-2xl shadow-orange-500/40 ring-1 ring-orange-300/30">
            <LucideClock className="h-12 w-12 text-white" />
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">Coming Soon</h1>

          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            We're crafting something special for you. This feature is currently under development and will be available soon.
          </p>

          <div className="mt-10 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.7)]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
