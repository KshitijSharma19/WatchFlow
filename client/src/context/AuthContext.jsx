import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Automatically fetch fresh user profile whenever token exists and user is missing or incomplete
  useEffect(() => {
    if (token) {
      api
        .get("/settings/profile")
        .then((res) => {
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
        })
        .catch((err) => {
          console.warn("[Auth] Could not fetch profile with current token:", err?.message);
        });
    }
  }, [token]);

  const login = async (jwtToken, userData = null) => {
    localStorage.setItem("token", jwtToken);
    localStorage.removeItem("watchflow_logged_out");
    setToken(jwtToken);

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      try {
        const res = await api.get("/settings/profile", {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("[Auth] Failed to load user profile on login", err);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("watchflow_logged_out", "true");
    localStorage.removeItem("watchflow_recent_playlist");
    localStorage.removeItem("watchflow_recent_player");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      setUser,
      login,
      logout,
      isAuthenticated: !!token,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Keep the ESLint ignore rule here to keep the dev environment quiet
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
