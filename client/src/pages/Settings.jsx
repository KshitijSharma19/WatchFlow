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
      queueMicrotask(() => {
        setProfile((prev) => {
          if (prev.name === user.name && prev.email === user.email) return prev;
          return { name: user.name || "", email: user.email || "" };
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
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left border ${
                  isActive
                    ? tab.isDanger
                      ? "bg-red-950/40 border-red-600/40 text-red-400"
                      : "bg-[#BA3C3C]/15 border-[#BA3C3C]/30 text-red-400"
                    : "border-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isActive
                      ? tab.isDanger
                        ? "text-red-500"
                        : "text-red-400"
                      : "text-zinc-500 group-hover:text-zinc-300"
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
                  className="divide-y divide-zinc-800/60"
                >
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-zinc-900/20 flex justify-end">
                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-xs font-semibold text-white hover:opacity-90 transition outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
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
                  className="divide-y divide-zinc-800/60"
                >
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5 max-w-md">
                      <label className="text-xs font-medium text-zinc-400">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        autoComplete="current-password"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        placeholder="••••••••"
                        className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          autoComplete="new-password"
                          value={security.newPassword}
                          onChange={handleSecurityChange}
                          className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          autoComplete="new-password"
                          value={security.confirmPassword}
                          onChange={handleSecurityChange}
                          placeholder="Re-enter password"
                          className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-[#BA3C3C] focus:ring-1 focus:ring-[#BA3C3C]/30 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-zinc-900/20 flex justify-end">
                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#BA3C3C] to-[#E04D4D] text-xs font-semibold text-white hover:opacity-90 transition outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
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
                  <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs gap-1">
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        theme === "dark"
                          ? "bg-[#BA3C3C]/20 border border-[#BA3C3C]/30 text-red-400"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        theme === "light"
                          ? "bg-[#BA3C3C]/20 border border-[#BA3C3C]/30 text-red-400"
                          : "text-zinc-400 hover:text-white"
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
                    <span className="font-mono text-xs text-zinc-400">
                      v1.0.0
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-[#BA3C3C]/20 border border-[#BA3C3C]/30 text-red-400 px-2 py-0.5 rounded-lg">
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
