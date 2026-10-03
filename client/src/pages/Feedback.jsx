import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import AppShell from "../components/layout/AppShell";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const SUBJECT_OPTIONS = [
  "General Feedback",
  "Feature Request & Suggestions",
  "Bug Report or Issue",
  "Playlist & Video Tracking",
  "Sheets & Roadmap Feedback",
  "Other Inquiry",
];

export default function Feedback() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || user.username || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/feedback", formData);
      if (response.data?.success) {
        toast.success("Thank you! Your feedback has been received.");
        setSubmitted(true);
        setFormData({
          name: user?.name || user?.username || "",
          email: user?.email || "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(response.data?.message || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Feedback Submission Error:", err);
      toast.error(
        err?.response?.data?.message ||
        "Failed to submit feedback. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell title="Feedback">
      <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center min-h-[calc(100vh-140px)]">
        {/* Page Header */}
        <div className="text-center mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1.5">
            Feedback
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
            We value your insights and are dedicated to making WatchFlow better for your learning journey. Share your reviews, ideas or reach out for support.
          </p>
        </div>

        {/* Success Confirmation Card */}
        {submitted && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-600 dark:text-emerald-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-xs sm:text-sm font-medium">
                Thank you! Your feedback was successfully submitted.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold underline hover:opacity-80 cursor-pointer"
            >
              Send Another
            </button>
          </div>
        )}

        {/* Feedback Form Card */}
        <div className="bg-white/80 dark:bg-[#121215] border border-slate-200 dark:border-neutral-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            {/* Name & Email 2-column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800 dark:text-neutral-200">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full bg-slate-50 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-[#E04D4D] focus:ring-1 focus:ring-[#E04D4D]/30 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800 dark:text-neutral-200">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-slate-50 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-[#E04D4D] focus:ring-1 focus:ring-[#E04D4D]/30 transition"
                />
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-800 dark:text-neutral-200">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#E04D4D] focus:ring-1 focus:ring-[#E04D4D]/30 transition cursor-pointer"
              >
                <option value="" disabled className="text-slate-400 dark:text-neutral-500">
                  Select subject
                </option>
                {SUBJECT_OPTIONS.map((subj) => (
                  <option
                    key={subj}
                    value={subj}
                    className="bg-white dark:bg-neutral-900 text-slate-900 dark:text-white"
                  >
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Textarea */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-800 dark:text-neutral-200">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Share your feedback, reviews, suggestions, or questions..."
                required
                className="w-full bg-slate-50 dark:bg-neutral-900/90 border border-slate-200 dark:border-neutral-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-[#E04D4D] focus:ring-1 focus:ring-[#E04D4D]/30 transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-1 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-xs sm:text-sm transition shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
