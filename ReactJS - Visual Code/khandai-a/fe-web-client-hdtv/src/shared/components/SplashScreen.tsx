// shared/components/SplashScreen.tsx
export function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-white" />
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-1/2 animate-[slide_1.2s_ease-in-out_infinite] rounded-full bg-pink-500" />
        </div>
      </div>
    </div>
  );
}
