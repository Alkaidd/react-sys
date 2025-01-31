import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function ModernLogin() {
  // 登录表单状态
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 微信扫码状态
  const [showWechatQR, setShowWechatQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrStatus, setQrStatus] = useState("loading");
  const [qrId, setQrId] = useState("");

  // 模拟获取微信二维码
  const fetchWechatQR = async () => {
    try {
      setQrStatus("loading");
      const mockRes = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              qrcode_url: "https://example.com/wechat-qr.png",
              qr_id: "123" + Date.now(),
            }),
          800
        )
      );
      setQrCodeUrl(mockRes.qrcode_url);
      setQrId(mockRes.qr_id);
      startPolling(mockRes.qr_id);
      setQrStatus("waiting");
    } catch {
      setQrStatus("expired");
    }
  };

  // 模拟轮询状态
  const startPolling = (id) => {
    const timer = setInterval(async () => {
      if (qrStatus === "confirmed") {
        clearInterval(timer);
        return;
      }

      try {
        const mockStatus = await new Promise((resolve) =>
          setTimeout(
            () => resolve(Math.random() > 0.7 ? "confirmed" : "waiting"),
            1500
          )
        );

        if (mockStatus === "confirmed") {
          clearInterval(timer);
          handleLoginSuccess();
        }
      } catch {
        clearInterval(timer);
        setQrStatus("expired");
      }
    }, 2000);
  };

  // 登录成功处理
  const handleLoginSuccess = () => {
    setShowWechatQR(false);
    setError("");
    // 实际登录逻辑...
  };

  // 传统登录提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!email || !password) throw new Error("请填写完整信息");
      // 实际登录逻辑...
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* 左侧背景图区域 */}
      <div className="hidden lg:block w-1/2 relative">
        <div
          className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080?abstract')] bg-cover bg-center"
          style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.3)" }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>
        <div className="absolute bottom-8 left-8 text-white z-10 space-y-2">
          <h2 className="text-4xl font-bold">欢迎回来</h2>
          <p className="opacity-90">开启您的数字体验之旅</p>
        </div>
      </div>

      {/* 右侧登录区域 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800 pb-2">用户登录</h1>
            <p className="text-gray-600">选择您的登录方式</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* 传统登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                电子邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all placeholder-gray-400 text-black"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all placeholder-gray-400 text-black"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-600">记住我</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                忘记密码？
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-blue-600/90 hover:bg-blue-700/90 text-white font-medium rounded-xl transition-all hover:shadow-lg disabled:opacity-50 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "立即登录"
              )}
            </button>
          </form>

          {/* 第三方登录 */}
          <div className="mt-8 space-y-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-transparent text-sm text-gray-500">
                  快速登录
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowWechatQR(true);
                fetchWechatQR();
              }}
              className="w-full flex items-center justify-center p-3 space-x-2 rounded-xl bg-white/50 border border-gray-300/50 hover:bg-gray-50/50 transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  d="M15.324 3.997H8.676c-2.517 0-4.56 2.043-4.56 4.56v6.647c0 2.517 2.043 4.56 4.56 4.56h6.647c2.517 0 4.56-2.043 4.56-4.56V8.557c0-2.517-2.043-4.56-4.56-4.56zm1.647 8.044l-1.955 1.955 1.955 1.956v.778c0 .428-.35.778-.778.778h-.778l-1.956-1.955-1.955 1.955h-.778a.779.779 0 0 1-.778-.778v-.778l1.955-1.956-1.955-1.955v-.778c0-.428.35-.778.778-.778h.778l1.955 1.955 1.956-1.955h.778c.428 0 .778.35.778.778v.778z"
                  fill="#07C160"
                />
              </svg>
              <span className="text-gray-700">微信扫码登录</span>
            </button>
          </div>
        </div>
      </div>

      {/* 微信扫码弹窗 */}
      <Dialog
        open={showWechatQR}
        onClose={() => setShowWechatQR(false)}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      >
        <DialogPanel className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-xs w-full shadow-2xl border border-white/20">
          <div className="text-center space-y-4">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {
                {
                  loading: "加载中...",
                  waiting: "微信扫码登录",
                  scanned: "已扫码 ✔️",
                  expired: "二维码已过期",
                }[qrStatus]
              }
            </DialogTitle>

            {qrStatus !== "expired" ? (
              <div className="relative aspect-square">
                {qrCodeUrl && (
                  <img
                    src={qrCodeUrl}
                    alt="微信二维码"
                    className="w-full h-full object-contain rounded-lg border"
                  />
                )}
                {qrStatus === "loading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={fetchWechatQR}
                className="w-full py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
              >
                获取新二维码
              </button>
            )}

            <p className="text-sm text-gray-600">
              {qrStatus === "scanned"
                ? "请在手机端确认登录"
                : "打开微信扫一扫登录"}
            </p>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
