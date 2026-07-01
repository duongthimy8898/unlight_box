export default function LoadingContainerElm() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 -z-1">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <img
          className="w-[32px] h-[32px] shrink-0 animate-spin"
          src="/assets/images/ball.png"
          alt=""
        />
        <p className="text-sm text-gray-300">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}
