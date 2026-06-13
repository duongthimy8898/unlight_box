// shared/components/SplashScreen.tsx
export function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-zinc-900 dark:bg-white" />
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div className="h-full w-1/2 animate-[slide_1.2s_ease-in-out_infinite] rounded-full bg-zinc-900 dark:bg-orange-500" />
        </div>
      </div>
    </div>
  )
}

export function SplashScreen2() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-zinc-900 dark:bg-white" />
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div className="h-full w-1/2 animate-[slide_1.2s_ease-in-out_infinite] rounded-full bg-zinc-900 dark:bg-red-500" />
        </div>
      </div>
    </div>
  )
}