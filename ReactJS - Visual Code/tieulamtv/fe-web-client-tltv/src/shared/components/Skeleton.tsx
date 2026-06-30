const Skeleton = () => {
  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-120px)] xl:min-h-[calc(100vh-132px)] flex items-center justify-center animate-[page-pulse_2s_ease-in-out_infinite] bg-[#0a0a0f]">
      <div className="flex gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="block h-2 w-2 rounded-full bg-[#c8a84b]"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
