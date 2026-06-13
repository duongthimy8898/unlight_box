const MainLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      {/* Shadow */}
      <div className="relative h-32 flex items-end justify-center">
        <div className="absolute bottom-0 w-16 h-3 bg-black rounded-full blur-sm opacity-30 animate-shadow-scale" />

        {/* Ball */}
        <div
          className="w-12 h-12 rounded-full animate-bounce-advanced shadow-lg overflow-hidden relative"
          style={{
            background: "radial-gradient(circle at 30% 30%, #e2e2e2, #991b1b 50%, #450a0a)",
          }}
        >
          {/* Sọc quay */}
          <div className="absolute inset-0 animate-spin-pattern">
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white bg-opacity-50 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white bg-opacity-50 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      {/* Text */}
      <p className="text-[#991b1b] text-xs mt-6 animate-pulse">Vui lòng chờ...</p>
    </div>
  );
};

export default MainLoader;
