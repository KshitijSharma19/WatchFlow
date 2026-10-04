import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  // Handle OAuth callback parameters (?token=... or ?code=... or ?error=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const code = params.get("code");
    const errorParam = params.get("error");
    const provider = params.get("provider"); // 'google' | 'github'

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      return;
    }

    if (token) {
      // Backend OAuth redirect callback with generated token
      login(token);
      navigate("/sheets", { replace: true });
      return;
    }

    if (code) {
      // Direct frontend callback with code, exchange via backend
      const exchangeOAuthCode = async () => {
        const isGoogle = provider === "google";
        if (isGoogle) {
          setGoogleLoading(true);
        } else {
          setGithubLoading(true);
        }
        setError("");
        try {
          const endpoint = isGoogle ? "/auth/google" : "/auth/github";
          const response = await api.post(endpoint, { code });
          if (response.data?.token) {
            login(response.data.token, response.data.user);
            navigate("/sheets", { replace: true });
          } else {
            setError(`Failed to retrieve authentication token from ${isGoogle ? "Google" : "GitHub"}`);
          }
        } catch (err) {
          console.error("OAuth Exchange Error:", err);
          setError(
            err?.response?.data?.message ||
            err?.message ||
            `${isGoogle ? "Google" : "GitHub"} authentication failed. Please try again.`,
          );
        } finally {
          setGoogleLoading(false);
          setGithubLoading(false);
        }
      };

      exchangeOAuthCode();
    }
  }, [location.search, login, navigate]);

  const handleGitHubLogin = () => {
    setError("");
    setGithubLoading(true);

    const apiBase =
      import.meta.env.VITE_API_URL ||
      (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");
    window.location.href = `${apiBase}/auth/github`;
  };

  const handleGoogleLogin = () => {
    setError("");
    setGoogleLoading(true);

    const apiBase =
      import.meta.env.VITE_API_URL ||
      (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");
    window.location.href = `${apiBase}/auth/google`;
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
      const user = response.data.user;

      login(token, user);
      navigate("/sheets");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Authentication failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030005] text-slate-900 dark:text-white overflow-hidden font-sans antialiased flex flex-col justify-center items-center select-none px-4 py-12 transition-colors duration-200">
      <BackgroundGlow />

      {/* Top Left Branding: Watch in white, Flow in red with transparent custom logo */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-8 flex items-center justify-between z-20 pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto flex items-center gap-3 group transition-transform active:scale-95"
          aria-label="WatchFlow Home"
        >
          <img
            src="/watchflow-logo.png"
            alt="WatchFlow Logo"
            className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-xl sm:text-2xl font-bold tracking-tight select-none">
            <span className="text-slate-900 dark:text-white">Watch</span>
            <span className="text-[#E04D4D]">Flow</span>
          </span>
        </Link>
      </header>

      {/* Central Login / Register Card */}
      <div className="relative z-10 w-full max-w-md mt-6 sm:mt-0">
        <div className="w-full bg-white/95 dark:bg-[#0c0c11]/85 border border-slate-200 dark:border-neutral-800/80 rounded-2xl p-7 sm:p-8 backdrop-blur-xl shadow-xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-neutral-500 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all outline-none focus-visible:ring-2 focus-visible:ring-red-500/30 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Heading without caption */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 dark:text-white tracking-tight">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>

                <input
                  type="text"
                  autoFocus
                  disabled={loading || githubLoading || googleLoading}
                  autoComplete="username"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/30 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-neutral-600 outline-none transition-all duration-200 disabled:opacity-50"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />

                <input
                  type="email"
                  autoFocus={isLogin}
                  disabled={loading || githubLoading || googleLoading}
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/30 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-neutral-600 outline-none transition-all duration-200 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  disabled={loading || githubLoading || googleLoading}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/30 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder-neutral-600 outline-none transition-all duration-200 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:text-neutral-500 dark:hover:text-neutral-300 outline-none focus-visible:text-neutral-300 cursor-pointer"
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
              <div
                role="alert"
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || githubLoading || googleLoading}
              className={`group w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-[#E04D4D] dark:text-red-400 py-3 rounded-xl font-bold text-sm shadow-xs transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer ${loading || githubLoading || googleLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "active:scale-[0.99]"
                }`}
            >
              {loading
                ? "Loading..."
                : isLogin
                  ? "Sign In"
                  : "Get Started"}

              {!loading && !githubLoading && !googleLoading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-neutral-800" />
            </div>
            <span className="relative bg-white dark:bg-[#0c0c11] px-3 text-xs text-slate-400 dark:text-neutral-500 font-medium">
              or
            </span>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-3">
            {/* Continue with Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || githubLoading || googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-neutral-900 hover:bg-neutral-50 dark:bg-[#13131a] dark:text-white dark:hover:bg-[#1a1a24] py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-[0_0_24px_rgba(66,133,244,0.18)] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border border-slate-200 dark:border-neutral-700/60 hover:border-blue-500/40 group"
            >
              {googleLoading ? (
                <div className="w-4 h-4 border-2 border-neutral-900 dark:border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>
                {googleLoading
                  ? "Connecting to Google..."
                  : "Continue with Google"}
              </span>
            </button>

            {/* Continue with GitHub Button */}
            <button
              type="button"
              onClick={handleGitHubLogin}
              disabled={loading || githubLoading || googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-neutral-900 hover:bg-neutral-50 dark:bg-[#13131a] dark:text-white dark:hover:bg-[#1a1a24] py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-[0_0_24px_rgba(224,77,77,0.18)] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border border-slate-200 dark:border-neutral-700/60 hover:border-red-500/40 group"
            >
              {githubLoading ? (
                <div className="w-4 h-4 border-2 border-neutral-900 dark:border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              )}
              <span>
                {githubLoading
                  ? "Connecting to GitHub..."
                  : "Continue with GitHub"}
              </span>
            </button>
          </div>
        </div>

        {/* Switch Link */}
        <p className="text-center text-sm text-slate-500 dark:text-neutral-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              resetForm();
              navigate(isLogin ? "/signup" : "/login");
            }}
            className="text-red-600 hover:text-red-700 dark:text-[#F26464] dark:hover:text-[#E04D4D] font-medium transition-colors outline-none focus-visible:underline cursor-pointer"
          >
            {isLogin ? "Sign up now" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
