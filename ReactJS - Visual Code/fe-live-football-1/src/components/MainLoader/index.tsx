const MainLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <img loading="lazy" className="w-[32px] h-[32px] shrink-0 animate-spin" src="/ball-1.png" alt="" />
        <p className="text-sm text-gray-300">Vui lòng chờ...</p>
      </div>
    </div>
  );
}

export default MainLoader;