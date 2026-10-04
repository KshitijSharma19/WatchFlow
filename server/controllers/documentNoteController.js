const axios = require("axios");
const DocumentNote = require("../models/DocumentNote");

/**
 * Get all document notes for the authenticated user with optional filtering
 */
exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryType, categoryName, fileType, search } = req.query;

    const filter = { userId };

    if (categoryType && ["tools", "technologies", "subjects"].includes(categoryType)) {
      filter.categoryType = categoryType;
    }

    if (categoryName && categoryName !== "all") {
      filter.categoryName = new RegExp(`^${categoryName}$`, "i");
    }

    if (fileType && ["pdf", "excel", "note"].includes(fileType)) {
      filter.fileType = fileType;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { description: regex },
        { categoryName: regex },
        { tags: regex },
        { fileName: regex },
      ];
    }

    // Exclude heavy base64 fileData from list responses for fast load times
    const notes = await DocumentNote.find(filter)
      .select("-fileData")
      .sort({ updatedAt: -1 })
      .lean();

    // Also get distinct categories for quick filter pills
    const allUserNotes = await DocumentNote.find({ userId }).select("categoryType categoryName fileType").lean();

    const categoryStats = {
      tools: [...new Set(allUserNotes.filter((n) => n.categoryType === "tools").map((n) => n.categoryName))],
      technologies: [...new Set(allUserNotes.filter((n) => n.categoryType === "technologies").map((n) => n.categoryName))],
      subjects: [...new Set(allUserNotes.filter((n) => n.categoryType === "subjects").map((n) => n.categoryName))],
      counts: {
        all: allUserNotes.length,
        tools: allUserNotes.filter((n) => n.categoryType === "tools").length,
        technologies: allUserNotes.filter((n) => n.categoryType === "technologies").length,
        subjects: allUserNotes.filter((n) => n.categoryType === "subjects").length,
        pdf: allUserNotes.filter((n) => n.fileType === "pdf").length,
        excel: allUserNotes.filter((n) => n.fileType === "excel").length,
        note: allUserNotes.filter((n) => n.fileType === "note").length,
      },
    };

    return res.status(200).json({
      success: true,
      data: notes,
      stats: categoryStats,
    });
  } catch (error) {
    console.error("Error fetching document notes:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch document notes",
    });
  }
};

/**
 * Get single note by ID (includes fileData for downloading/previewing)
 */
exports.getNoteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const note = await DocumentNote.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Error fetching note by id:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch note",
    });
  }
};

/**
 * Create a new document note (supports PDF/Excel file uploads or text notes)
 */
exports.createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      description = "",
      categoryType = "technologies",
      categoryName,
      fileType = "note",
      fileName = "",
      fileSize = 0,
      fileData = "",
      extractedText = "",
      tags = [],
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const safePillar = ["tools", "technologies", "subjects"].includes(categoryType)
      ? categoryType
      : "technologies";

    const resolvedCategoryName = (categoryName && categoryName.trim())
      ? categoryName.trim()
      : (safePillar.charAt(0).toUpperCase() + safePillar.slice(1));

    const note = await DocumentNote.create({
      userId,
      title: title.trim(),
      description: description.trim(),
      categoryType: safePillar,
      categoryName: resolvedCategoryName,
      fileType: ["pdf", "excel", "note"].includes(fileType) ? fileType : "note",
      fileName: fileName.trim(),
      fileSize: Number(fileSize) || 0,
      fileData: fileData || "",
      extractedText: extractedText || "",
      tags: Array.isArray(tags) ? tags.map((t) => String(t).trim().toLowerCase()) : [],
    });

    return res.status(201).json({
      success: true,
      data: note,
      message: "Note saved successfully",
    });
  } catch (error) {
    console.error("Error creating note:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to save note",
    });
  }
};

/**
 * Update an existing note
 */
exports.updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updates = req.body;

    const note = await DocumentNote.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const allowed = [
      "title",
      "description",
      "categoryType",
      "categoryName",
      "tags",
      "extractedText",
      "isFavorite",
    ];

    allowed.forEach((field) => {
      if (updates[field] !== undefined) {
        note[field] = updates[field];
      }
    });

    if (updates.fileData) {
      note.fileData = updates.fileData;
      if (updates.fileName) note.fileName = updates.fileName;
      if (updates.fileSize) note.fileSize = updates.fileSize;
      if (updates.fileType) note.fileType = updates.fileType;
    }

    await note.save();

    return res.status(200).json({
      success: true,
      data: note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update note",
    });
  }
};

/**
 * Delete a note
 */
exports.deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const note = await DocumentNote.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete note",
    });
  }
};

/**
 * Seed starter sample curated notes if the user has no documents
 */
exports.seedSampleNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await DocumentNote.countDocuments({ userId });

    if (count > 0) {
      return res.status(200).json({
        success: true,
        message: "User already has documents",
        count,
      });
    }

    const sampleNotes = [
      {
        userId,
        title: "Docker Essential Commands & Container Architecture",
        description: "Quick reference guide for Dockerfile, docker compose, volume mounts, and network inspection.",
        categoryType: "tools",
        categoryName: "Docker",
        fileType: "pdf",
        fileName: "Docker_Cheat_Sheet.pdf",
        fileSize: 142850,
        extractedText: `Docker Architecture & Cheat Sheet:
1. Containers vs Images: An image is an immutable template; a container is a running instance.
2. Key Commands:
   - docker run -d -p 8080:80 --name my-app nginx: Runs Nginx in detached mode mapping host 8080 to container 80.
   - docker ps -a: Lists all running and stopped containers.
   - docker exec -it <container_id> sh: Open interactive shell inside running container.
   - docker-compose up -d: Start multi-container application defined in docker-compose.yml.
   - docker volume create / docker volume ls: Manage persistent data volumes.
3. Multi-stage Builds: Minimize production image sizes by separating compile stage from runtime image.`,
        tags: ["docker", "devops", "containers", "cheatsheet"],
      },
      {
        userId,
        title: "Git Workflow, Branching & Merge Conflicts",
        description: "Complete guide to rebase vs merge, cherry-pick, stash, and team Git branching strategies.",
        categoryType: "tools",
        categoryName: "Git",
        fileType: "note",
        fileName: "Git_Mastery_Notes.txt",
        fileSize: 45200,
        extractedText: `Git Best Practices & Command Reference:
- git checkout -b feature/xyz: Create and switch to new branch.
- git commit -m "feat: description": Conventional commit syntax.
- git stash push -m "work in progress" / git stash pop: Temporarily shelve changes.
- git rebase main: Re-apply commits on top of another base tip for a linear history.
- git cherry-pick <commit-hash>: Apply a specific commit from another branch.
- Resolving conflicts: Search for <<<<<<< HEAD, edit manually, git add, and git rebase --continue.`,
        tags: ["git", "version-control", "tools", "workflow"],
      },
      {
        userId,
        title: "React 19 Hooks, Lifecycle & Server Actions",
        description: "Summary sheet covering useState, useEffect, useMemo, useCallback, and React 19 use() hook.",
        categoryType: "technologies",
        categoryName: "React",
        fileType: "pdf",
        fileName: "React19_Deep_Dive.pdf",
        fileSize: 215400,
        extractedText: `React 19 & Modern Hooks Guide:
1. Core Hooks:
   - useState: Local state management.
   - useEffect: Side effects (synchronizing with external systems).
   - useMemo & useCallback: Performance optimizations to memoize computed values and callback references.
   - useRef: Mutable values that persist across renders without triggering a re-render.
2. React 19 Additions:
   - useActionState & useFormStatus: First-class handling of async form submissions.
   - useOptimistic: Render speculative UI while async network requests are in flight.
   - use() API: Read promises or contexts inside control flow and conditions.`,
        tags: ["react", "frontend", "javascript", "hooks"],
      },
      {
        userId,
        title: "Node.js & Express Production Architecture Guide",
        description: "Excel matrix comparing middleware patterns, error handling, rate limiting, and JWT auth.",
        categoryType: "technologies",
        categoryName: "Node.js",
        fileType: "excel",
        fileName: "Backend_Architecture_Matrix.xlsx",
        fileSize: 98400,
        extractedText: `Node.js & Express Production Checklist (Spreadsheet Matrix):
Layer | Component | Best Practice
Security | helmet & cors | Enable strict CORS origin whitelist and security headers.
Auth | JWT & bcrypt | Sign tokens with RS256 or HS256, hash passwords with salt rounds >= 10.
Database | Mongoose Connection | Enable connection pooling, bufferCommands: false in serverless.
Validation | Joi or Zod | Validate req.body and req.params before passing to controllers.
Logging | Morgan & Winston | Structured JSON logging with request IDs for observability.`,
        tags: ["nodejs", "express", "backend", "spreadsheet"],
      },
      {
        userId,
        title: "DBMS Indexing, Normalization & SQL Queries Sheet",
        description: "Excel cheat-sheet mapping 1NF through BCNF, B-Trees vs Hash Indexing, and ACID properties.",
        categoryType: "subjects",
        categoryName: "DBMS",
        fileType: "excel",
        fileName: "DBMS_Formulas_And_Queries.xlsx",
        fileSize: 112300,
        extractedText: `DBMS Normalization & Indexing Spreadsheet:
Normal Form | Rule | Eliminates
1NF | Atomic values only (no repeating groups) | Multi-valued attributes
2NF | In 1NF + No partial dependencies on candidate keys | Partial functional dependencies
3NF | In 2NF + No transitive dependencies (X -> Y, Y -> Z) | Transitive dependencies
BCNF | For every functional dependency X -> Y, X must be a super key | Anomalies from overlapping candidate keys

Indexing:
- B+ Tree: O(log N) search, insertion, and deletion; optimal for range queries.
- Hash Index: O(1) average lookup; does NOT support range queries.`,
        tags: ["dbms", "sql", "normalization", "indexing", "database"],
      },
      {
        userId,
        title: "Operating Systems Process Scheduling & Memory Management",
        description: "Comprehensive PDF on Round Robin, Deadlock prevention, Virtual Memory, and Paging.",
        categoryType: "subjects",
        categoryName: "Operating Systems",
        fileType: "pdf",
        fileName: "OS_Core_Concepts.pdf",
        fileSize: 189000,
        extractedText: `Operating Systems Core Revision:
1. Process Scheduling Algorithms:
   - FCFS: Non-preemptive, suffers from Convoy Effect.
   - SJF / SRTF: Shortest Job First; provably optimal average turnaround time, can cause starvation.
   - Round Robin (RR): Preemptive with time quantum Q; fair and responsive.
2. Deadlock:
   - 4 Necessary Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.
   - Banker's Algorithm: Resource allocation graph analysis for safe vs unsafe states.
3. Memory Management:
   - Paging: Virtual address space divided into Pages; Physical memory into Frames. Eliminates external fragmentation.
   - TLB (Translation Lookaside Buffer): Hardware cache to accelerate virtual-to-physical address translation.`,
        tags: ["os", "operating-systems", "cs-core", "scheduling"],
      },
      {
        userId,
        title: "Data Structures & Algorithms Complexity Cheat Sheet",
        description: "Big-O time and space complexity matrix for Arrays, Trees, Graphs, Sorting and Dynamic Programming.",
        categoryType: "subjects",
        categoryName: "DSA",
        fileType: "excel",
        fileName: "DSA_Complexity_Matrix.xlsx",
        fileSize: 125000,
        extractedText: `Data Structures & Algorithms Complexity Matrix:
Algorithm / Structure | Average Time | Worst Time | Space Complexity
Array Access | O(1) | O(1) | O(1)
Binary Search Tree | O(log N) | O(N) (unbalanced) | O(N)
AVL / Red-Black Tree | O(log N) | O(log N) | O(N)
QuickSort | O(N log N) | O(N^2) | O(log N)
MergeSort | O(N log N) | O(N log N) | O(N)
Dijkstra (Min-Heap) | O((V + E) log V) | O((V + E) log V) | O(V)
Dynamic Programming (Knapsack 0/1) | O(N * W) | O(N * W) | O(N * W) or O(W)`,
        tags: ["dsa", "algorithms", "complexity", "interview", "sheet"],
      },
    ];

    const inserted = await DocumentNote.insertMany(sampleNotes);

    return res.status(201).json({
      success: true,
      message: "Curated starter notes seeded successfully",
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    console.error("Error seeding sample notes:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to seed sample notes",
    });
  }
};

/**
 * AI PDF & Study Assistant Chatbot
 * Answers questions about attached PDF, Excel, or subject notes using Google Gemini
 */
exports.askPdfChatbot = async (req, res) => {
  try {
    const userId = req.user.id;
    const { query, noteId, categoryType, history = [] } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question or query is required",
      });
    }

    let targetNote = null;
    let contextText = "";
    let inlinePdfPart = null;

    if (noteId) {
      targetNote = await DocumentNote.findOne({ _id: noteId, userId });
      if (targetNote) {
        contextText += `Document Title: ${targetNote.title}\n`;
        contextText += `Category: ${targetNote.categoryType.toUpperCase()} > ${targetNote.categoryName}\n`;
        contextText += `File Type: ${targetNote.fileType.toUpperCase()}\n`;
        if (targetNote.description) contextText += `Description: ${targetNote.description}\n`;
        if (targetNote.extractedText) contextText += `Document Content / Notes:\n"""\n${targetNote.extractedText}\n"""\n\n`;

        // If the document is a PDF and has base64 fileData, we can optionally pass it as inlineData to Gemini!
        if (targetNote.fileType === "pdf" && targetNote.fileData && targetNote.fileData.includes("base64,")) {
          const rawBase64 = targetNote.fileData.split("base64,")[1];
          // Limit inline base64 to ~8MB to ensure smooth API transmission
          if (rawBase64 && rawBase64.length < 10000000) {
            inlinePdfPart = {
              inlineData: {
                mimeType: "application/pdf",
                data: rawBase64,
              },
            };
          }
        }
      }
    } else {
      // Gather relevant notes in category
      const filter = { userId };
      if (categoryType && ["tools", "technologies", "subjects"].includes(categoryType)) {
        filter.categoryType = categoryType;
      }
      const notes = await DocumentNote.find(filter).limit(8).lean();
      if (notes.length > 0) {
        contextText += `Context from ${notes.length} available study notes:\n`;
        notes.forEach((n, idx) => {
          contextText += `[Note ${idx + 1}] ${n.title} (${n.categoryType} / ${n.categoryName}): ${n.description || ""}\n${n.extractedText ? n.extractedText.slice(0, 800) : ""}\n---\n`;
        });
      }
    }

    const systemInstruction = `You are WatchFlow's Minimal AI PDF & Study Assistant. 
You help students master tools, technologies, and academic subjects by providing clear, concise, accurate explanations from their stored PDFs, Excel sheets, and notes.

Guidelines:
1. Be direct, clear, and structured. Use bullet points and code blocks where helpful.
2. Directly answer the user's question based on the document context provided.
3. If the document has code, formulas, or tables, explain them cleanly.
4. Keep the tone professional, encouraging, and minimal (avoid fluff, intro greetings, or filler words).`;

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API is available, invoke it
    if (apiKey) {
      const parts = [];

      if (inlinePdfPart) {
        parts.push(inlinePdfPart);
      }

      const promptMessage = `${systemInstruction}\n\n${contextText ? `DOCUMENT CONTEXT:\n${contextText}` : ""}\n\nSTUDENT QUESTION:\n${query.trim()}`;
      parts.push({ text: promptMessage });

      // Try modern Gemini models with fallback
      const modelsToTry = ["gemini-1.5-flash", "gemini-2.5-flash", "gemini-flash-latest"];
      let aiResponseText = null;

      for (const model of modelsToTry) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
          const response = await axios.post(
            geminiUrl,
            {
              contents: [{ parts }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 2048,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey,
              },
              timeout: 25000,
            }
          );

          aiResponseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiResponseText) break;
        } catch (apiErr) {
          console.warn(`Model ${model} call failed:`, apiErr?.response?.data?.error?.message || apiErr.message);
        }
      }

      if (aiResponseText) {
        return res.status(200).json({
          success: true,
          answer: aiResponseText.trim(),
          source: targetNote ? targetNote.title : "Study Hub Context",
        });
      }
    }

    // High quality intelligent offline fallback when API key is unavailable or throttled
    const fallbackAnswer = generateIntelligentFallback(query, targetNote, contextText);

    return res.status(200).json({
      success: true,
      answer: fallbackAnswer,
      source: targetNote ? targetNote.title : "Study Hub Offline Engine",
    });
  } catch (error) {
    console.error("AI PDF Chatbot Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to answer query",
    });
  }
};

/**
 * Deterministic study assistant fallback engine
 */
function generateIntelligentFallback(query, targetNote, contextText) {
  const q = query.toLowerCase();

  if (targetNote && targetNote.extractedText) {
    const lines = targetNote.extractedText.split("\n").filter((l) => l.trim().length > 0);

    if (q.includes("summar") || q.includes("overview") || q.includes("key point")) {
      return `### Summary: ${targetNote.title}\n\n` +
        `**Category**: ${targetNote.categoryName} (${targetNote.categoryType})\n` +
        `**File Type**: ${targetNote.fileType.toUpperCase()}\n\n` +
        `**Key Highlights**:\n` +
        lines.slice(0, 6).map((l) => `* ${l.replace(/^[-*•\d.]+\s*/, "")}`).join("\n");
    }

    // Search for keywords in the document text
    const matchedLines = lines.filter((l) =>
      q.split(" ").some((word) => word.length > 3 && l.toLowerCase().includes(word))
    );

    if (matchedLines.length > 0) {
      return `Based on **${targetNote.title}**:\n\n` +
        matchedLines.slice(0, 5).map((l) => `* ${l}`).join("\n") +
        `\n\n*Tip: Ask for specific formulas, commands, or concepts to extract deeper details.*`;
    }

    return `Here is the relevant information from **${targetNote.title}** regarding your query:\n\n` +
      lines.slice(0, 4).join("\n\n");
  }

  return `### Quick Answer\n\n` +
    `To answer your question about "${query}":\n` +
    `* Ensure your study document is selected from the dropdown above.\n` +
    `* Upload or add your specific PDF or Excel sheet to get deep contextual answers.\n` +
    `* You can also ask for cheat sheets, practice interview questions, or concept comparisons across Tools, Technologies, and Subjects!`;
}
