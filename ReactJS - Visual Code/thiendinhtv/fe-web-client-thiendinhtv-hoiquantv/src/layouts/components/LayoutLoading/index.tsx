// SportLoading.tsx
const LayoutLoading = () => {
  return (
    <div className="absolute z-50 inset-0 flex items-center justify-center">
      <div className="relative w-[100px] h-[100px]">
        {/* Vòng tròn quay */}
        <div className="absolute inset-0 rounded-full border-[6px] border-green-500/40 border-t-green-500 animate-spin" />

        {/* Quả bóng ở giữa */}
        <div className="absolute inset-[28%] rounded-full bg-green-500 flex items-center justify-center shadow-lg">
          <div className="w-[60%] h-[60%] rounded-full border-2 border-white border-t-transparent border-l-transparent rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default LayoutLoading;
