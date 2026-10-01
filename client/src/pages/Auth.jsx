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
  const [error, setError] = useState("");

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  // Handle GitHub OAuth callback parameters (?token=... or ?code=... or ?error=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const code = params.get("code");
    const errorParam = params.get("error");

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      return;
    }

    if (token) {
      // Backend OAuth redirect callback with generated token
      login(token);
      navigate("/dashboard", { replace: true });
      return;
    }

    if (code) {
      // Direct frontend callback with code, exchange via backend
      const exchangeOAuthCode = async () => {
        setGithubLoading(true);
        setError("");
        try {
          const response = await api.post("/auth/github", { code });
          if (response.data?.token) {
            login(response.data.token, response.data.user);
            navigate("/dashboard", { replace: true });
          } else {
            setError("Failed to retrieve authentication token from GitHub");
          }
        } catch (err) {
          console.error("GitHub Auth Error:", err);
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "GitHub authentication failed. Please try again.",
          );
        } finally {
          setGithubLoading(false);
        }
      };

      exchangeOAuthCode();
    }
  }, [location.search, login, navigate]);

  const handleGitHubLogin = () => {
    setError("");
    setGithubLoading(true);

    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    window.location.href = `${apiBase}/auth/github`;
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
                  disabled={loading || githubLoading}
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
                  disabled={loading || githubLoading}
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
                  disabled={loading || githubLoading}
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
              disabled={loading || githubLoading}
              className={`group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] border border-red-400/20 py-3 rounded-xl font-bold text-sm text-white shadow-[0_4px_20px_rgba(224,77,77,0.2)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer ${
                loading || githubLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:brightness-110 active:scale-[0.99]"
              }`}
            >
              {loading
                ? "Loading..."
                : isLogin
                  ? "Sign In"
                  : "Get Started"}

              {!loading && !githubLoading && (
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

          {/* Continue with GitHub Button Under Sign In Option */}
          <button
            type="button"
            onClick={handleGitHubLogin}
            disabled={loading || githubLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-neutral-950 hover:bg-neutral-100 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-[0_0_24px_rgba(224,77,77,0.22)] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border border-slate-200 dark:border-neutral-700/60 hover:border-red-500/30 group"
          >
            {githubLoading ? (
              <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
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
