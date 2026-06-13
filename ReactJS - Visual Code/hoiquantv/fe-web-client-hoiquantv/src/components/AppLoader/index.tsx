function AppLoader({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 flex flex-col space-y-1 items-center justify-center bg-black z-50">
      <div className="w-12 h-12 border-4 border-gray-500 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-xs text-gray-500">{text}</p>
    </div>
  );
}

export default AppLoader;
