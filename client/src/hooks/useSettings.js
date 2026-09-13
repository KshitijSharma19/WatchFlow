import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";

export default function useSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/settings/profile");
      setUser(res.data.user);
    } catch (error) {
      console.error("[Settings] Fetch Profile", error.message);
      toast.error(error.response?.data?.message ?? "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (name, email) => {
    try {
      setSaving(true);

      const res = await api.put("/settings/profile", {
        username: name,
        email: email,
      });

      setUser(res.data.user);
      toast.success(res.data.message || "Profile updated successfully!");
      return true;
    } catch (error) {
      console.error("[Settings] Update Profile", error.message);
      toast.error(error.response?.data?.message ?? "Failed to update profile.");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  const updatePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      setSaving(true);

      const res = await api.put("/settings/password", {
        currentPassword,
        newPassword,
      });

      toast.success(res.data.message || "Password updated successfully!");
      return true;
    } catch (error) {
      console.error("[Settings] Update Password", error.message);
      toast.error(
        error.response?.data?.message ?? "Failed to update password.",
      );
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchProfile();
    };
    init();
  }, [fetchProfile]);

  return {
    user,
    setUser,
    loading,
    saving,
    fetchProfile,
    updateProfile,
    updatePassword,
  };
}
