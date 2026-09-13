import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundGlow from "../components/common/BackgroundGlow";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const isLogin = location.pathname === "/login";
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    if (!isLogin && !username.trim()) {
      setError("Username is required");
      return;
    }

    setLoading(true);

    const authConfig = {
      endpoint: isLogin ? "/auth/login" : "/auth/register",
      payload: isLogin
        ? {
            email: email.trim(),
            password,
          }
        : {
            username: username.trim(),
            email: email.trim(),
            password,
          },
    };

    try {
      const response = await api.post(authConfig.endpoint, authConfig.payload);
      const token = response.data.token;

      login(token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Authentication failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030005] text-white overflow-hidden font-sans antialiased flex flex-col justify-center items-center select-none px-4">
      <BackgroundGlow />

      <div className="relative z-10 w-full max-w-md">
        <div className="w-full bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-neutral-500 hover:text-white hover:bg-white/10 transition-all outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-1.5">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>

            <p className="text-xs text-neutral-400">
              {isLogin
                ? "Distraction-free learning is waiting."
                : "Start organizing your playlists today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>

                <input
                  type="text"
                  autoFocus
                  disabled={loading}
                  autoComplete="username"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200 disabled:opacity-50"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />

                <input
                  type="email"
                  autoFocus={isLogin}
                  disabled={loading}
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/30 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 outline-none focus-visible:text-neutral-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="text-red-400 text-sm text-center font-medium"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] border border-red-400/20 py-3 rounded-xl font-bold text-sm text-white shadow-[0_4px_20px_rgba(224,77,77,0.2)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:brightness-110 active:scale-[0.99]"
              }`}
            >
              {loading ? "Loading..." : isLogin ? "Sign In" : "Get Started"}

              {!loading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-neutral-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              resetForm();
              navigate(isLogin ? "/signup" : "/login");
            }}
            className="text-[#F26464] hover:text-[#E04D4D] font-medium transition-colors outline-none focus-visible:underline"
          >
            {isLogin ? "Sign up now" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
