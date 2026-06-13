function DataLoader() {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black">
      <div className="w-1/2 max-w-md h-1 bg-gray-500 overflow-hidden relative rounded">
        <div className="absolute h-1 bg-white animate-loading-bar"></div>
      </div>
    </div>
  );
}

export default DataLoader;
