interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorScreen = ({
  title = "Đã xảy ra lỗi",
  message = "Không thể tải nội dung. Vui lòng thử lại.",
  onRetry,
}: ErrorScreenProps) => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-76px)] flex-col items-center justify-center bg-[#0a0a0f] px-6">
      {/* Icon */}
      <div className="relative mb-4 flex items-center justify-center">
        <div className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle,#7a5c1e_0%,transparent_70%)] blur-2xl opacity-40" />
        <svg
          className="relative h-20 w-20 text-[#a10f0f]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          />
        </svg>
      </div>

      {/* Text */}
      <h1 className="mb-3 text-center text-2xl font-bold text-white/90">{title}</h1>
      <p className="mb-10 max-w-sm text-center text-sm leading-relaxed text-white/40">{message}</p>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg bg-[#c8a84b]/10 px-6 py-2.5 text-sm font-medium text-[#c8a84b] ring-1 ring-[#c8a84b]/30 transition hover:bg-[#c8a84b]/20"
          >
            Thử lại
          </button>
        )}
        <a
          href="/"
          className="rounded-lg bg-white/5 px-6 py-2.5 text-sm font-medium text-white/60 ring-1 ring-white/10 transition hover:bg-white/10"
        >
          Về trang chủ
        </a>
      </div>
    </div>
  );
};

export default ErrorScreen;
