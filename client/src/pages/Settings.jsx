import { User, Palette, Info, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useCallback } from "react";
import useSettings from "../hooks/useSettings";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";

import AppShell from "../components/layout/AppShell";
import SettingsSection from "../components/settings/SettingsSection";
import SettingsItem from "../components/settings/SettingsItem";

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "about", label: "About", icon: Info },
  { id: "danger", label: "Danger Zone", icon: LogOut, isDanger: true },
];

import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");

  const { user, loading, updateProfile, updatePassword } = useSettings();

  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSecurityChange = useCallback((e) => {
    const { name, value } = e.target;
    setSecurity((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleUpdateProfile = useCallback(
    async (e) => {
      e.preventDefault();
      setProfileSaving(true);
      try {
        const targetName = profile.name.trim();
        const targetEmail = profile.email.trim();

        await updateProfile(targetName, targetEmail);
      } catch (error) {
        console.error(
          "[Settings] Update Profile Failure:",
          error.message || error,
        );
      } finally {
        setProfileSaving(false);
      }
    },
    [profile, updateProfile],
  );

  const handleUpdatePassword = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !security.currentPassword ||
        !security.newPassword ||
        !security.confirmPassword
      ) {
        toast.error("All password fields are required.");
        return;
      }

      if (security.newPassword !== security.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      setPasswordSaving(true);
      try {
        const passwordUpdated = await updatePassword(
          security.currentPassword,
          security.newPassword,
        );

        if (passwordUpdated) {
          setSecurity({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error(
          "[Settings] Update Password Failure:",
          error.message || error,
        );
      } finally {
        setPasswordSaving(false);
      }
    },
    [security, updatePassword],
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  useEffect(() => {
    if (user) {
      const displayName = user.name || user.username || "";
      const displayEmail = user.email || "";
      queueMicrotask(() => {
        setProfile((prev) => {
          if (prev.name === displayName && prev.email === displayEmail) return prev;
          return { name: displayName, email: displayEmail };
        });
      });
    }
  }, [user]);

  if (loading) {
    return (
      <Loader
        text="Loading Settings..."
        subtitle="Fetching your profile."
        fullscreen
      />
    );
  }

  return (
    <AppShell title="Settings">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0 flex flex-col gap-1.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left border cursor-pointer ${
                  isActive
                    ? tab.isDanger
                      ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-950/40 dark:border-red-600/40 dark:text-red-400 font-semibold shadow-xs"
                      : "bg-red-50 border-red-200 text-red-600 dark:bg-[#BA3C3C]/15 dark:border-[#BA3C3C]/30 dark:text-red-400 font-semibold shadow-xs"
                    : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-200"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isActive
                      ? tab.isDanger
                        ? "text-red-600 dark:text-red-500"
                        : "text-red-600 dark:text-red-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                  }`}
                />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8">
          {activeTab === "account" && (
            <>
              {/* Profile Section */}
              <SettingsSection
                title="Profile Information"
                description="Update your account name and email settings."
              >
                <form
                  onSubmit={handleUpdateProfile}
                  className="divide-y divide-slate-100 dark:divide-zinc-800/60"
                >
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-zinc-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none transition-all shadow-2xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-zinc-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none transition-all shadow-2xs"
                        required
                      />
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-slate-50/80 dark:bg-zinc-900/20 border-t border-slate-100 dark:border-zinc-800/60 flex justify-end">
                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="px-5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 text-xs font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      {profileSaving && (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      <span>
                        {profileSaving ? "Saving..." : "Save Profile"}
                      </span>
                    </button>
                  </div>
                </form>
              </SettingsSection>

              {/* Password Section */}
              <SettingsSection
                title="Change Password"
                description="Change your security credentials to secure your session."
              >
                <form
                  onSubmit={handleUpdatePassword}
                  className="divide-y divide-slate-100 dark:divide-zinc-800/60"
                >
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5 max-w-md">
                      <label className="text-xs font-medium text-slate-700 dark:text-zinc-400">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        autoComplete="current-password"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none transition-all shadow-2xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700 dark:text-zinc-400">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          autoComplete="new-password"
                          value={security.newPassword}
                          onChange={handleSecurityChange}
                          className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none transition-all shadow-2xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-700 dark:text-zinc-400">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          autoComplete="new-password"
                          value={security.confirmPassword}
                          onChange={handleSecurityChange}
                          placeholder="Re-enter password"
                          className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none transition-all shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-slate-50/80 dark:bg-zinc-900/20 border-t border-slate-100 dark:border-zinc-800/60 flex justify-end">
                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="px-5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/30 text-xs font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      {passwordSaving && (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      <span>
                        {passwordSaving ? "Updating..." : "Update Password"}
                      </span>
                    </button>
                  </div>
                </form>
              </SettingsSection>
            </>
          )}

          {activeTab === "appearance" && (
            <SettingsSection
              title="Appearance"
              description="Customize the look and feel of WatchFlow."
            >
              <SettingsItem
                icon={Palette}
                title="Theme Mode"
                subtitle="System theme preferences"
                right={
                  <div className="flex bg-slate-100 dark:bg-zinc-950 p-1 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs gap-1">
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        theme === "dark"
                          ? "bg-white dark:bg-[#BA3C3C]/20 border border-slate-300 dark:border-[#BA3C3C]/30 text-red-600 dark:text-red-400 font-semibold shadow-xs"
                          : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        theme === "light"
                          ? "bg-white dark:bg-[#BA3C3C]/20 border border-slate-300 dark:border-[#BA3C3C]/30 text-red-600 dark:text-red-400 font-semibold shadow-xs"
                          : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                    >
                      Light
                    </button>
                  </div>
                }
              />
            </SettingsSection>
          )}

          {activeTab === "about" && (
            <SettingsSection
              title="About"
              description="Project environment details."
            >
              <SettingsItem
                icon={Info}
                title="Version Control"
                subtitle="WatchFlow Build System"
                right={
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">
                      v1.0.0
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-red-50 dark:bg-[#BA3C3C]/20 border border-red-200 dark:border-[#BA3C3C]/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-lg">
                      Latest
                    </span>
                  </div>
                }
              />
            </SettingsSection>
          )}

          {activeTab === "danger" && (
            <SettingsSection
              title="Danger Zone"
              description="Irreversible operations. Proceed with care."
            >
              <SettingsItem
                icon={LogOut}
                title="Logout"
                subtitle="Sign out of your active terminal session"
                danger
                onClick={handleLogout}
              />
            </SettingsSection>
          )}
        </main>
      </div>
    </AppShell>
  );
}
