import { useState, useEffect, useMemo, useRef } from "react";
import {
  FileText,
  FileSpreadsheet,
  BookOpen,
  Upload,
  Plus,
  Bot,
  Sparkles,
  Download,
  Trash2,
  ExternalLink,
  X,
  Send,
  Loader2,
  Wrench,
  Cpu,
  GraduationCap,
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";
import BackgroundGlow from "../components/common/BackgroundGlow";
import api from "../api/axios";

const CATEGORY_TABS = [
  { id: "all", label: "All Hub", icon: BookOpen },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "technologies", label: "Technologies", icon: Cpu },
  { id: "subjects", label: "Subjects", icon: GraduationCap },
];

const QUICK_PROMPTS = [
  "⚡ 3-bullet summary",
  "💡 Key cheat-sheet",
  "❓ Top interview questions",
  "🛠️ Practical use cases",
];

export default function NotesHub() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [stats, setStats] = useState({ tools: [], technologies: [], subjects: [], counts: {} });
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  // Modals & Panels
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [previewNote, setPreviewNote] = useState(null);

  // Chatbot State
  const [chatSelectedNoteId, setChatSelectedNoteId] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "👋 Ask me any questions about your stored PDFs, Excel sheets, or study notes!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Upload Form State (Streamlined & Minimal)
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategoryType, setUploadCategoryType] = useState("technologies");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFileData, setUploadFileData] = useState("");
  const [uploadFileType, setUploadFileType] = useState("pdf");
  const [uploadExtractedText, setUploadExtractedText] = useState("");
  const [uploadSaving, setUploadSaving] = useState(false);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notes-hub");
      if (res.data?.success) {
        setNotes(res.data.data || []);
        if (res.data.stats) setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Failed to load notes:", err);
      toast.error(err.response?.data?.message || "Failed to load study notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  // Seed sample notes
  const handleSeedSamples = async () => {
    try {
      setLoading(true);
      const res = await api.post("/notes-hub/seed-samples");
      if (res.data?.success) {
        toast.success("Loaded curated study templates!");
        await fetchNotes();
      }
    } catch (err) {
      toast.error("Could not load samples: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Filtered notes (by primary category & subcategory)
  const filteredNotes = useMemo(() => {
    return notes.filter((item) => {
      if (selectedCategory !== "all" && item.categoryType !== selectedCategory) return false;
      if (selectedSubCategory !== "all" && item.categoryName?.toLowerCase() !== selectedSubCategory.toLowerCase()) return false;
      return true;
    });
  }, [notes, selectedCategory, selectedSubCategory]);

  // Available tags for the current selected category
  const currentCategoryTags = useMemo(() => {
    if (selectedCategory === "all") {
      return [...new Set([...(stats.tools || []), ...(stats.technologies || []), ...(stats.subjects || [])])];
    }
    return stats[selectedCategory] || [];
  }, [selectedCategory, stats]);

  // Handle File Input Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadFile(file);
    if (!uploadTitle) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setUploadTitle(cleanName);
    }

    const lowerName = file.name.toLowerCase();
    if (lowerName.endsWith(".pdf")) {
      setUploadFileType("pdf");
    } else if (lowerName.endsWith(".xlsx") || lowerName.endsWith(".xls") || lowerName.endsWith(".csv")) {
      setUploadFileType("excel");
    } else {
      setUploadFileType("note");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadFileData(event.target.result);

      if (file.type.includes("text") || lowerName.endsWith(".csv")) {
        const textReader = new FileReader();
        textReader.onload = (te) => {
          setUploadExtractedText(te.target.result.slice(0, 10000));
        };
        textReader.readAsText(file);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit Note / Upload (Clean & Minimal)
  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      toast.error("Document title is required");
      return;
    }

    try {
      setUploadSaving(true);
      const pillarLabel = uploadCategoryType.charAt(0).toUpperCase() + uploadCategoryType.slice(1);
      const payload = {
        title: uploadTitle.trim(),
        categoryType: uploadCategoryType,
        categoryName: pillarLabel,
        description: "",
        fileType: uploadFileType,
        fileName: uploadFile ? uploadFile.name : `${uploadTitle.trim().replace(/\s+/g, "_")}.${uploadFileType === "excel" ? "xlsx" : uploadFileType === "pdf" ? "pdf" : "txt"}`,
        fileSize: uploadFile ? uploadFile.size : 1024,
        fileData: uploadFileData,
        extractedText: uploadExtractedText || uploadTitle.trim(),
        tags: [uploadCategoryType, uploadFileType],
      };

      const res = await api.post("/notes-hub", payload);
      if (res.data?.success) {
        toast.success("Document saved successfully!");
        setIsUploadOpen(false);
        resetUploadForm();
        await fetchNotes();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save document");
    } finally {
      setUploadSaving(false);
    }
  };

  const resetUploadForm = () => {
    setUploadTitle("");
    setUploadCategoryType("technologies");
    setUploadFile(null);
    setUploadFileData("");
    setUploadFileType("pdf");
    setUploadExtractedText("");
  };

  // Delete note
  const handleDeleteNote = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      const res = await api.delete(`/notes-hub/${id}`);
      if (res.data?.success) {
        toast.success("Document deleted");
        setNotes((prev) => prev.filter((n) => n._id !== id));
        if (chatSelectedNoteId === id) setChatSelectedNoteId("");
        if (previewNote?._id === id) setPreviewNote(null);
      }
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  // Preview Note modal
  const handleOpenPreview = async (note) => {
    try {
      if (!note.extractedText && !note.fileData) {
        const res = await api.get(`/notes-hub/${note._id}`);
        if (res.data?.data) {
          setPreviewNote(res.data.data);
          return;
        }
      }
      setPreviewNote(note);
    } catch (err) {
      setPreviewNote(note);
    }
  };

  // Download Note or PDF
  const handleDownload = async (note) => {
    try {
      let data = note.fileData;
      if (!data) {
        const res = await api.get(`/notes-hub/${note._id}`);
        data = res.data?.data?.fileData;
      }

      if (data && data.startsWith("data:")) {
        const a = document.createElement("a");
        a.href = data;
        a.download = note.fileName || `${note.title}.${note.fileType === "excel" ? "xlsx" : note.fileType === "pdf" ? "pdf" : "txt"}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success(`Downloaded ${note.fileName || note.title}`);
        return;
      }

      const content = note.extractedText || note.description || note.title;
      const mime = note.fileType === "excel" ? "text/csv" : "text/plain";
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${note.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.${note.fileType === "excel" ? "csv" : "txt"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Exported ${note.title}`);
    } catch (err) {
      toast.error("Download failed");
    }
  };

  // Open Chat focused on a specific note
  const handleStartChatWithNote = (note) => {
    setChatSelectedNoteId(note._id);
    setIsChatOpen(true);
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        text: `📄 Focused on **${note.title}** (${note.fileType.toUpperCase()}). What would you like to know?`,
      },
    ]);
  };

  // Send Chat message
  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || chatInput).trim();
    if (!query || chatLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      text: query,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await api.post("/notes-hub/chat", {
        query,
        noteId: chatSelectedNoteId || undefined,
        categoryType: selectedCategory !== "all" ? selectedCategory : undefined,
      });

      if (res.data?.success) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            text: res.data.answer,
            source: res.data.source,
          },
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: "⚠️ " + (err.response?.data?.message || "Could not process document query."),
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07060A] text-slate-800 dark:text-neutral-100 flex flex-col font-sans selection:bg-[#E04D4D]/20 selection:text-[#E04D4D]">
      <BackgroundGlow />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <TopBar
        title="Notes & Study Hub"
        onMenuClick={() => setSidebarOpen(true)}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col">
        {/* Minimal Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E04D4D]/10 text-[#E04D4D] border border-[#E04D4D]/20">
                <BookOpen className="w-3.5 h-3.5" />
                Resource Library
              </span>
              <span className="text-xs text-slate-500 dark:text-neutral-400">
                {notes.length} documents stored
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Notes & Docs Hub
            </h1>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-xl">
              Organize study materials in PDF and Excel formats categorized by Tools, Technologies, and Subjects.
            </p>
          </div>

          {/* Action CTA: Add Document */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/25 hover:border-red-500/40 shadow-xs transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document</span>
            </button>
          </div>
        </div>

        {/* Bifurcation Category Tabs & Subtags (Without Search Bar or Format Pills) */}
        <div className="py-5 space-y-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-neutral-900/90 rounded-2xl border border-slate-200/80 dark:border-neutral-800/80 overflow-x-auto scrollbar-none w-fit">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    setSelectedSubCategory("all");
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${active
                    ? "bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-xs font-semibold"
                    : "text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {stats.counts?.[tab.id] !== undefined && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-neutral-700/60 text-slate-600 dark:text-neutral-300">
                      {stats.counts[tab.id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subcategory / Tags Bar */}
          {currentCategoryTags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <button
                onClick={() => setSelectedSubCategory("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${selectedSubCategory === "all"
                  ? "bg-[#E04D4D]/10 text-[#E04D4D] border border-[#E04D4D]/20 font-semibold"
                  : "text-slate-500 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800"
                  }`}
              >
                All Tags
              </button>

              {currentCategoryTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedSubCategory(tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${selectedSubCategory.toLowerCase() === tag.toLowerCase()
                    ? "bg-[#E04D4D] text-white font-semibold shadow-xs"
                    : "bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800/80 text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-700"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Full-Width Notes Grid */}
        <div className="flex-1 w-full mt-2">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 dark:text-neutral-500">
              <Loader2 className="w-7 h-7 animate-spin mb-3 text-[#E04D4D]" />
              <p className="text-sm">Loading your study documents...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="py-16 px-6 text-center rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/30">
              <div className="w-12 h-12 rounded-2xl bg-[#E04D4D]/10 text-[#E04D4D] flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-white">
                No documents found
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 max-w-md mx-auto">
                You haven't added any PDF or Excel study notes in this category yet. You can upload your own or load curated templates below.
              </p>

              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/25 shadow-xs cursor-pointer transition-colors"
                >
                  Upload Document
                </button>
                <button
                  onClick={handleSeedSamples}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-200 cursor-pointer"
                >
                  Load Curated Templates (Docker, React, DBMS)
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => {
                const isPdf = note.fileType === "pdf";
                const isExcel = note.fileType === "excel";
                const isChatTarget = chatSelectedNoteId === note._id;

                return (
                  <div
                    key={note._id}
                    className={`group relative p-4 rounded-2xl bg-white dark:bg-neutral-900/70 border transition-all duration-200 hover:shadow-lg ${isChatTarget
                      ? "border-[#E04D4D] ring-2 ring-[#E04D4D]/20 shadow-md shadow-[#E04D4D]/10"
                      : "border-slate-200 dark:border-neutral-800/80 hover:border-slate-300 dark:hover:border-neutral-700"
                      }`}
                  >
                    {/* Top Meta Header */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`p-2 rounded-xl ${isPdf
                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                            : isExcel
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                              : "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                            }`}
                        >
                          {isPdf ? (
                            <FileText className="w-4 h-4" />
                          ) : isExcel ? (
                            <FileSpreadsheet className="w-4 h-4" />
                          ) : (
                            <BookOpen className="w-4 h-4" />
                          )}
                        </span>

                        <div>
                          <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300">
                            {note.categoryName}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-neutral-500 ml-1.5">
                            {note.categoryType}
                          </span>
                        </div>
                      </div>

                      {/* Format tag */}
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800/80 text-slate-500 dark:text-neutral-400">
                        {note.fileType}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#E04D4D] transition-colors">
                      {note.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 line-clamp-2 min-h-[2rem]">
                      {note.description || note.extractedText?.slice(0, 100) || "No preview description provided."}
                    </p>

                    {/* File details & Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 dark:text-neutral-500">
                        {note.fileSize ? `${Math.round(note.fileSize / 1024)} KB` : "Document"}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Ask AI Button (Original Light Red Theme Style) */}
                        <button
                          onClick={() => handleStartChatWithNote(note)}
                          title="Ask AI questions about this PDF"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/20 hover:border-red-500/35 shadow-xs cursor-pointer transition-all"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>Ask AI</span>
                        </button>

                        {/* View Preview */}
                        <button
                          onClick={() => handleOpenPreview(note)}
                          title="Preview note content"
                          className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-neutral-200 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        {/* Download */}
                        <button
                          onClick={() => handleDownload(note)}
                          title="Download file"
                          className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-neutral-200 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteNote(note._id, note.title)}
                          title="Delete note"
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Floating Bot Button on Bottom Right Corner (Light Red Theme) */}
      <button
        onClick={() => setIsChatOpen((prev) => !prev)}
        title="Open AI PDF Assistant"
        className="fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full bg-red-500/15 hover:bg-red-500/25 text-[#E04D4D] dark:text-red-400 border border-red-500/30 dark:border-red-500/40 shadow-xl shadow-red-500/20 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md"
      >
        <Bot className="w-6 h-6" />
        {chatSelectedNoteId && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-neutral-950 animate-pulse" />
        )}
      </button>

      {/* Small Rectangular AI PDF Chatbot Popup Box in Bottom Right */}
      {isChatOpen && (
        <div className="fixed bottom-22 right-6 z-50 w-[330px] sm:w-[380px] h-[480px] bg-white dark:bg-[#110f17] border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-150">
          {/* Minimal Header */}
          <div className="p-3 border-b border-slate-200 dark:border-neutral-800 bg-slate-50/80 dark:bg-neutral-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#E04D4D]/10 text-[#E04D4D] flex items-center justify-center">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                  AI PDF Chatbot
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Target Document Selector */}
          <div className="px-3 py-1.5 bg-slate-100/60 dark:bg-neutral-950/60 border-b border-slate-200/80 dark:border-neutral-800/80 flex items-center gap-2 text-xs">
            <span className="text-[11px] text-slate-400 shrink-0">Doc:</span>
            <select
              value={chatSelectedNoteId}
              onChange={(e) => setChatSelectedNoteId(e.target.value)}
              className="w-full text-xs bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-md px-2 py-0.5 text-slate-700 dark:text-neutral-200 focus:outline-hidden"
            >
              <option value="">All Materials (General)</option>
              {notes.map((n) => (
                <option key={n._id} value={n._id}>
                  [{n.fileType.toUpperCase()}] {n.title}
                </option>
              ))}
            </select>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs scrollbar-thin">
            {chatMessages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3 py-2 leading-relaxed ${isUser
                      ? "bg-red-500/15 text-slate-900 dark:text-neutral-100 border border-red-500/30 rounded-tr-xs font-medium"
                      : "bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 rounded-tl-xs border border-slate-200/60 dark:border-neutral-700/60"
                      }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    {!isUser && msg.source && (
                      <div className="mt-1 pt-1 border-t border-slate-200/50 dark:border-neutral-700/50 text-[10px] text-slate-400 flex items-center justify-between">
                        <span className="truncate max-w-[170px]">{msg.source}</span>
                        <button
                          onClick={() => copyToClipboard(msg.text)}
                          title="Copy answer"
                          className="hover:text-slate-600 dark:hover:text-white ml-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {chatLoading && (
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-neutral-500 py-1">
                <Loader2 className="w-3 h-3 animate-spin text-[#E04D4D]" />
                <span className="text-[11px]">Analyzing document...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-1.5 border-t border-slate-200/80 dark:border-neutral-800/80 bg-slate-50/50 dark:bg-neutral-950/30 flex items-center gap-1 overflow-x-auto scrollbar-none">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-2 py-0.5 text-[10px] rounded-md bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-[#E04D4D]/50 text-slate-600 dark:text-neutral-300 whitespace-nowrap cursor-pointer transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2 border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-1.5"
          >
            <input
              type="text"
              placeholder="Ask anything about this document..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 text-xs bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700/60 rounded-xl px-2.5 py-1.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-hidden focus:border-[#E04D4D]"
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || chatLoading}
              className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 disabled:opacity-50 text-[#E04D4D] dark:text-red-400 border border-red-500/25 cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Streamlined Small "Store Note / Resource" Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header: Title only, no subtitle */}
            <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E04D4D]/10 text-[#E04D4D] flex items-center justify-center">
                  <Upload className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Store Note / Resource
                </h3>
              </div>

              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="p-4 space-y-3 text-xs">
              {/* File upload drag/picker */}
              <div className="border border-dashed border-slate-300 dark:border-neutral-700 hover:border-[#E04D4D]/60 rounded-xl p-3.5 text-center cursor-pointer transition-colors relative bg-slate-50 dark:bg-neutral-900/40">
                <input
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv,.txt,.md"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <Upload className="w-5 h-5 text-[#E04D4D] mb-1" />
                  <p className="font-medium text-slate-800 dark:text-neutral-200 text-xs truncate max-w-[240px]">
                    {uploadFile ? uploadFile.name : "Click or drop your file here"}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-neutral-500 mt-0.5">
                    Supports .pdf, .xlsx, .xls, .csv, .txt
                  </p>
                </div>
              </div>

              {/* Document Title */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-neutral-300 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder=" "
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl focus:border-[#E04D4D] focus:outline-hidden text-xs"
                />
              </div>

              {/* Bifurcation Pillar */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-neutral-300 mb-1">
                  Bifurcation Pillar *
                </label>
                <select
                  value={uploadCategoryType}
                  onChange={(e) => setUploadCategoryType(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl focus:border-[#E04D4D] focus:outline-hidden text-xs"
                >
                  <option value="tools">🛠️Tools</option>
                  <option value="technologies">⚡Tech</option>
                  <option value="subjects">📚Subject</option>
                </select>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-900 cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadSaving}
                  className="px-4 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 disabled:opacity-50 text-[#E04D4D] dark:text-red-400 border border-red-500/30 hover:border-red-500/50 font-medium shadow-xs cursor-pointer flex items-center gap-1.5 text-xs transition-colors"
                >
                  {uploadSaving && <Loader2 className="w-3 h-3 animate-spin text-[#E04D4D]" />}
                  <span>Save to Hub</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Note / Document Preview Modal */}
      {previewNote && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E04D4D]">
                  {previewNote.categoryType} • {previewNote.categoryName}
                </span>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {previewNote.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(previewNote)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setPreviewNote(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs font-mono">
              {previewNote.fileType === "pdf" && previewNote.fileData && previewNote.fileData.startsWith("data:") ? (
                <div className="h-[480px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800">
                  <iframe
                    src={previewNote.fileData}
                    title={previewNote.title}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800/80 whitespace-pre-wrap leading-relaxed">
                  {previewNote.extractedText || previewNote.description || "No preview text available for this file."}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                File: {previewNote.fileName || previewNote.title} ({previewNote.fileType?.toUpperCase()})
              </span>
              <button
                onClick={() => {
                  setPreviewNote(null);
                  handleStartChatWithNote(previewNote);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[#E04D4D] dark:text-red-400 border border-red-500/25 font-medium cursor-pointer transition-colors"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI About This Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
