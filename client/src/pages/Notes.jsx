import { useState, useEffect, useMemo, useCallback } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Pin,
  Filter,
  Layers,
  Sparkles,
  Bookmark,
  Code2,
  FolderOpen,
  ArrowUpDown,
  Tag,
  CheckCircle2,
  X,
} from "lucide-react";
import AppShell from "../components/layout/AppShell";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  DEFAULT_CURATED_NOTES,
  DEFAULT_NOTE_CATEGORIES,
} from "../data/defaultNotes";
import NoteCard from "../components/notes/NoteCard";
import NoteModal from "../components/notes/NoteModal";
import toast from "react-hot-toast";

const LOCAL_STORAGE_KEY = "watchflow_user_categorized_notes";

export default function NotesPage() {
  const { isAuthenticated } = useAuth();

  // Notes state
  const [userNotes, setUserNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPinnedOnly, setFilterPinnedOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // "recent" | "pinned" | "alphabetical"

  // Modal states
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "view", // "view" | "create" | "edit"
    note: null,
  });

  // Load user notes from API or LocalStorage
  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    let loadedFromApi = false;

    if (isAuthenticated) {
      try {
        const res = await api.get("/notes-hub");
        if (res.data?.success && Array.isArray(res.data.notes)) {
          setUserNotes(res.data.notes);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res.data.notes));
          loadedFromApi = true;
        }
      } catch (err) {
        console.warn("[NotesHub] API fetch failed, falling back to local storage:", err.message);
      }
    }

    if (!loadedFromApi) {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          setUserNotes(JSON.parse(stored));
        }
      } catch (err) {
        console.error("[NotesHub] Failed reading local storage notes:", err);
      }
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Combine user notes + curated starter notes
  const allNotes = useMemo(() => {
    // Avoid duplicates if user modified or added default notes
    const userIds = new Set(userNotes.map((n) => n._id || n.id));
    const nonDuplicatedDefaults = DEFAULT_CURATED_NOTES.filter(
      (dn) => !userIds.has(dn.id)
    );
    return [...userNotes, ...nonDuplicatedDefaults];
  }, [userNotes]);

  // Dynamically extract all available categories
  const categories = useMemo(() => {
    const catSet = new Set(DEFAULT_NOTE_CATEGORIES.filter((c) => c !== "All"));
    allNotes.forEach((n) => {
      if (n.category) catSet.add(n.category);
    });
    return ["All", ...Array.from(catSet)];
  }, [allNotes]);

  // Compute category note counts for bifurcation tabs
  const categoryCounts = useMemo(() => {
    const counts = { All: allNotes.length };
    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = allNotes.filter((n) => n.category === cat).length;
      }
    });
    return counts;
  }, [allNotes, categories]);

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    return allNotes
      .filter((note) => {
        // Category filter
        if (selectedCategory !== "All" && note.category !== selectedCategory) {
          return false;
        }

        // Pinned only filter
        if (filterPinnedOnly && !note.isPinned) {
          return false;
        }

        // Tag filter
        if (selectedTag && (!note.tags || !note.tags.includes(selectedTag))) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = note.title?.toLowerCase().includes(q);
          const matchesContent = note.content?.toLowerCase().includes(q);
          const matchesCategory = note.category?.toLowerCase().includes(q);
          const matchesTags = note.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesContent && !matchesCategory && !matchesTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "pinned") {
          if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
          return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
        }

        if (sortBy === "alphabetical") {
          return (a.title || "").localeCompare(b.title || "");
        }

        // Default: "recent" (pinned notes prioritized, then newest)
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      });
  }, [allNotes, selectedCategory, filterPinnedOnly, selectedTag, searchQuery, sortBy]);

  // Handlers for modal
  const handleOpenNote = (note) => {
    setModalState({
      isOpen: true,
      mode: "view",
      note,
    });
  };

  const handleCreateNote = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      note: null,
    });
  };

  const handleEditNote = (note) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      note,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      mode: "view",
      note: null,
    });
  };

  // CRUD Operations with dual API and LocalStorage sync
  const handleSaveNote = async (noteData) => {
    const isEdit = Boolean(noteData._id || (noteData.id && !String(noteData.id).startsWith("default-")));

    if (isAuthenticated) {
      try {
        if (isEdit && noteData._id) {
          const res = await api.put(`/notes-hub/${noteData._id}`, noteData);
          if (res.data?.success) {
            setUserNotes((prev) =>
              prev.map((n) => (n._id === noteData._id ? res.data.note : n))
            );
            return;
          }
        } else {
          const res = await api.post("/notes-hub", noteData);
          if (res.data?.success) {
            setUserNotes((prev) => [res.data.note, ...prev]);
            return;
          }
        }
      } catch (err) {
        console.warn("[NotesHub] API save error, saving locally:", err.message);
      }
    }

    // Local / Offline fallback
    if (isEdit) {
      const targetId = noteData._id || noteData.id;
      const updated = userNotes.map((n) =>
        (n._id === targetId || n.id === targetId)
          ? { ...n, ...noteData, updatedAt: new Date().toISOString() }
          : n
      );
      setUserNotes(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } else {
      const newNote = {
        ...noteData,
        id: `local-note-${Date.now()}`,
        isDefault: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updated = [newNote, ...userNotes];
      setUserNotes(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleDeleteNote = async (note) => {
    const noteId = note._id || note.id;

    if (isAuthenticated && note._id) {
      try {
        await api.delete(`/notes-hub/${note._id}`);
      } catch (err) {
        console.warn("[NotesHub] API delete error:", err.message);
      }
    }

    const updated = userNotes.filter((n) => (n._id || n.id) !== noteId);
    setUserNotes(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    toast.success("Note removed from vault");
  };

  const handleTogglePin = async (note) => {
    const noteId = note._id || note.id;
    const nextPinned = !note.isPinned;

    if (isAuthenticated && note._id) {
      try {
        await api.patch(`/notes-hub/${note._id}/pin`);
      } catch (err) {
        console.warn("[NotesHub] API pin error:", err.message);
      }
    }

    const updated = userNotes.map((n) =>
      (n._id || n.id) === noteId ? { ...n, isPinned: nextPinned } : n
    );
    setUserNotes(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    toast.success(nextPinned ? "Note pinned to top!" : "Note unpinned");
  };

  const pinnedCount = useMemo(
    () => allNotes.filter((n) => n.isPinned).length,
    [allNotes]
  );

  return (
    <AppShell title="Notes Hub">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
        {/* Header Hero Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-slate-200 dark:border-neutral-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-[#E04D4D] dark:text-red-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Notes Hub & Resource Vault
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-2xl">
              Curate, store, and bifurcate high-yield notes, algorithmic cheat sheets, and external reference links across distinct categories.
            </p>
          </div>

          {/* Action buttons & Stats */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-medium text-slate-600 dark:text-neutral-400">
              <span>{allNotes.length} notes</span>
              <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-neutral-600" />
              <span>{categories.length - 1} categories</span>
            </div>

            <button
              onClick={handleCreateNote}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all hover:scale-102 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Store New Note
            </button>
          </div>
        </div>

        {/* Category Bifurcation Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Bifurcated Categories
            </span>

            {selectedTag && (
              <button
                onClick={() => setSelectedTag("")}
                className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
              >
                Filtered by #{selectedTag} <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 shadow-sm"
                      : "bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-neutral-700"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                      active
                        ? "bg-red-500/20 text-red-600 dark:text-red-300"
                        : "bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Filtering Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, code templates, topics, or #tags..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Pinned filter button */}
            <button
              onClick={() => setFilterPinnedOnly((prev) => !prev)}
              title="Filter pinned notes"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filterPinnedOnly
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                  : "bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Pin className={`w-3.5 h-3.5 ${filterPinnedOnly ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">Pinned</span>
              {pinnedCount > 0 && (
                <span className="font-mono text-[10px]">({pinnedCount})</span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-slate-400 dark:text-neutral-500 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs font-medium text-slate-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 cursor-pointer"
              >
                <option value="recent">Recently Updated</option>
                <option value="pinned">Pinned First</option>
                <option value="alphabetical">Title (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id || note.id}
                note={note}
                onOpen={handleOpenNote}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
                onSelectTag={(tag) => setSelectedTag(tag)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-neutral-900/40 border border-slate-200 dark:border-neutral-800 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-neutral-800 text-slate-400 dark:text-neutral-500 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No notes match your criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-sm mx-auto">
                {searchQuery || selectedTag || filterPinnedOnly
                  ? "Try resetting your search query or filters to view all stored notes."
                  : "No notes stored in this category yet. Add your first note now!"}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              {(searchQuery || selectedTag || filterPinnedOnly) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("");
                    setFilterPinnedOnly(false);
                    setSelectedCategory("All");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
              <button
                onClick={handleCreateNote}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20 transition-colors"
              >
                + Create Note in {selectedCategory === "All" ? "Vault" : selectedCategory}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Note View / Create / Edit Modal */}
      <NoteModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        mode={modalState.mode}
        note={modalState.note}
        categories={categories}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
        onTogglePin={handleTogglePin}
      />
    </AppShell>
  );
}
