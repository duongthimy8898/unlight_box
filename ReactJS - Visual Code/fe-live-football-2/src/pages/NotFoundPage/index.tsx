import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-yellow-900 flex items-center justify-center animate-fade-in px-4">
      <div className="bg-yellow-50/5 backdrop-blur-lg border border-yellow-500/20 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center animate-floating">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-glow mb-4">
          Coming Soon!
        </h1>
        <p className="text-yellow-100 text-base md:text-lg opacity-90 mb-6">
          Chức năng đang được phát triển, hãy quay lại sau nhé!
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-sm font-semibold bg-yellow-400 text-black rounded-lg shadow hover:bg-yellow-300 transition duration-300"
        >
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
