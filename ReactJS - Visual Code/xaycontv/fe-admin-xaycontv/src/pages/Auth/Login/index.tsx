import axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import sleep from "../../../utils/Sleep";
import { useAuth } from "../../../hooks/useAuth.hook";
const env = import.meta.env;
const LoginPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { login } = useAuth();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(toast.loading);
    setIsProcessing(true);
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const toastId = toast.loading("Đang đăng nhập...");
    try {
      //   console.log(env.VITE_SERVER_API_BASE_URL);
      const res = await axios.post(`${env.VITE_SERVER_API_BASE_URL}/auth/login`, payload);
      await sleep(500);
      const { code, message, data } = res.data;

      if (code !== 200) throw new Error(message || "Có lỗi xảy ra");
      // localStorage.setItem("accessToken", data.access_token);
      // localStorage.setItem("user", data.user);
      console.log(data.access_token, data.user)
      login(data.access_token, data.user);
      toast.update(toastId, {
        render: message || "Đăng nhập thành công!",
        type: "success",
        isLoading: false,
        autoClose: 500,
        onClose: () => window.location.reload(),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.update(toastId, {
        render: err.message || "Lỗi không xác định",
        type: "error",
        isLoading: false,
        autoClose: 1500,
        onClose: () => {
          setIsProcessing(false);
        },
      });
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl px-8 py-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h1>
        <div className="flex justify-center mb-6">
          <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
        </div>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập hoặc Email
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="your_email@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="rawPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              id="rawPassword"
              name="rawPassword"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-500"
            disabled={isProcessing}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
