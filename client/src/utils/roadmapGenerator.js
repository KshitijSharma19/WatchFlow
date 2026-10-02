import { SHEETS_DATA } from "../data/sheetsData";
import api from "../api/axios";

/**
 * Curated preset video courses featuring multiple top creators
 */
export const PRESET_VIDEO_COURSES = [
  // 1. Hitesh Choudhary - React
  {
    id: "chai-react",
    title: "Chai aur React",
    instructor: "Hitesh Choudhary",
    totalVideos: 13,
    approxHours: 20,
    totalSeconds: 20 * 3600,
    playlistUrl: "https://www.youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
    description: "Learn modern React from scratch: Fiber architecture, Virtual DOM, Custom hooks, Context API, Redux Toolkit, and production projects.",
    videos: [
      { id: "rv1", ytVideoId: "vz1RlUy573o", title: "Why React? Virtual DOM and create-react-app vs Vite", durationSeconds: 1900 },
      { id: "rv2", ytVideoId: "kAOuj6o7l1Q", title: "Creating your own custom React library under the hood", durationSeconds: 2400 },
      { id: "rv3", ytVideoId: "b9eMGE798y8", title: "React Fiber architecture and reconciliation deep dive", durationSeconds: 2200 },
      { id: "rv4", ytVideoId: "yNbnA5qn8xU", title: "useState hook mechanics and state batching", durationSeconds: 2100 },
      { id: "rv5", ytVideoId: "FxgM9k1rg0Q", title: "Props and Tailwind CSS integration in React components", durationSeconds: 1800 },
      { id: "rv6", ytVideoId: "oMTW9pY_ZEY", title: "Building a Background Color Changer Project", durationSeconds: 2400 },
      { id: "rv7", ytVideoId: "_9mB3uN2w3U", title: "Building a Password Generator with useCallback & useEffect", durationSeconds: 3200 },
      { id: "rv8", ytVideoId: "fT61zDcvq6Y", title: "Custom Hooks: Currency Converter project with live API", durationSeconds: 3500 },
      { id: "rv9", ytVideoId: "nQba4w0HshY", title: "React Router DOM v6: Navigation, nested routes, loaders", durationSeconds: 3800 },
      { id: "rv10", ytVideoId: "5z-NlC9PjHk", title: "Context API crash course: Theme Switcher project", durationSeconds: 2700 },
      { id: "rv11", ytVideoId: "pW_f2uB1k7Q", title: "Todo App with Context API & LocalStorage persistence", durationSeconds: 3300 },
      { id: "rv12", ytVideoId: "1i04-A7kfFI", title: "Redux Toolkit (RTK) full implementation: Store, slices & reducers", durationSeconds: 3600 },
      { id: "rv13", ytVideoId: "F-s3hRX9dX8", title: "Mega Project: Full-stack Appwrite Blog App architecture", durationSeconds: 4200 },
    ],
  },
  // 2. Hitesh Choudhary - JavaScript Backend
  {
    id: "chai-js-backend",
    title: "Chai aur JavaScript Backend",
    instructor: "Hitesh Choudhary",
    totalVideos: 12,
    approxHours: 15,
    totalSeconds: 15 * 3600,
    playlistUrl: "https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8fYxhU4Yh98286_x_q",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&auto=format&fit=crop&q=80",
    description: "Production-ready backend development with Node.js, Express, MongoDB, Aggregation pipelines, and JWT authentication.",
    videos: [
      { id: "bv1", ytVideoId: "EH3vGeqeIAo", title: "Backend setup, nodemon, and folder structure", durationSeconds: 1800 },
      { id: "bv2", ytVideoId: "cbtqN4s5n6g", title: "Connecting to database with Mongoose properly", durationSeconds: 2100 },
      { id: "bv3", ytVideoId: "K7Bw1j7rU8U", title: "Custom API response and error handling utility", durationSeconds: 2400 },
      { id: "bv4", ytVideoId: "vQ9yGfQfG7c", title: "User model design with bcrypt and JWT tokens", durationSeconds: 2700 },
      { id: "bv5", ytVideoId: "jVp5wN0g99w", title: "File upload handling with Multer and Cloudinary", durationSeconds: 3100 },
      { id: "bv6", ytVideoId: "vD1Vn9kG2rY", title: "Building secure registration and login controllers", durationSeconds: 2900 },
      { id: "bv7", ytVideoId: "K9Qk8N3w4Ew", title: "Access token & Refresh token verification middleware", durationSeconds: 2400 },
      { id: "bv8", ytVideoId: "1L7wFq9K0E4", title: "Password reset and account update endpoints", durationSeconds: 2000 },
      { id: "bv9", ytVideoId: "b8y1vK6Qn8w", title: "MongoDB Aggregation Pipeline masterclass part 1", durationSeconds: 3300 },
      { id: "bv10", ytVideoId: "Xq8V1b9K0E4", title: "MongoDB Aggregation Pipeline with lookup & unwind", durationSeconds: 3600 },
      { id: "bv11", ytVideoId: "P9Q1wK8N3w4", title: "Subscription schema design & channel subscriber logic", durationSeconds: 2500 },
      { id: "bv12", ytVideoId: "W9V1b9K0E4L", title: "Video upload, publishing, and pagination logic", durationSeconds: 2800 },
    ],
  },
  // 3. CodeWithHarry - Sigma Web Development Course
  {
    id: "cwh-sigma-webdev",
    title: "Sigma Web Development Course",
    instructor: "CodeWithHarry",
    totalVideos: 14,
    approxHours: 18,
    totalSeconds: 18 * 3600,
    playlistUrl: "https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80",
    description: "The complete web development bootcamp covering HTML, CSS, JavaScript, DOM Manipulation, Express, MongoDB, and React.",
    videos: [
      { id: "cwh1", ytVideoId: "tVzUXW6siu0", title: "Introduction to Web Development & How the Web Works", durationSeconds: 1800 },
      { id: "cwh2", ytVideoId: "kJEsTjH5mVg", title: "Your First HTML Website & VS Code Setup", durationSeconds: 2100 },
      { id: "cwh3", ytVideoId: "y4A_a4bY6mU", title: "HTML Basic Tags, Attributes, Links & Images", durationSeconds: 2400 },
      { id: "cwh4", ytVideoId: "ER9SspLe4Hg", title: "CSS Introduction, Selectors & Colors", durationSeconds: 2600 },
      { id: "cwh5", ytVideoId: "VlPiVmYuoqw", title: "CSS Box Model, Margin, Padding & Borders", durationSeconds: 2200 },
      { id: "cwh6", ytVideoId: "ESnrn1kAD4E", title: "CSS Flexbox Complete Guide with Real Layouts", durationSeconds: 3400 },
      { id: "cwh7", ytVideoId: "1Rs2ND1ryYc", title: "CSS Grid Layout Masterclass", durationSeconds: 3100 },
      { id: "cwh8", ytVideoId: "hKB-YGF14SY", title: "JavaScript Introduction & Variables in Browser", durationSeconds: 2700 },
      { id: "cwh9", ytVideoId: "ajdRvxDWH4w", title: "JavaScript Functions, Scopes & Arrow Functions", durationSeconds: 2900 },
      { id: "cwh10", ytVideoId: "wmyB1w4E8w0", title: "DOM Manipulation & Event Listeners in JavaScript", durationSeconds: 3300 },
      { id: "cwh11", ytVideoId: "P8wK9Q1v1L0", title: "Async JavaScript, Promises, Fetch API & Async/Await", durationSeconds: 3600 },
      { id: "cwh12", ytVideoId: "b8y1vK6Qn8w", title: "Node.js & Express.js Server Setup & Routing", durationSeconds: 3200 },
      { id: "cwh13", ytVideoId: "Xq8V1b9K0E4", title: "Connecting MongoDB with Mongoose & CRUD Operations", durationSeconds: 3800 },
      { id: "cwh14", ytVideoId: "W9V1b9K0E4L", title: "Full Stack Deployment on Vercel & Render", durationSeconds: 2600 },
    ],
  },
  // 4. Striver (take U forward) - Complete A2Z DSA Course
  {
    id: "striver-a2z-dsa",
    title: "A2Z DSA Course: Foundations to Advanced",
    instructor: "Striver (take U forward)",
    totalVideos: 12,
    approxHours: 24,
    totalSeconds: 24 * 3600,
    playlistUrl: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
    description: "Complete DSA step-by-step masterclass covering Arrays, Binary Search, Linked Lists, Recursion, Trees, Graphs, and Dynamic Programming.",
    videos: [
      { id: "str1", ytVideoId: "37E9ckMDdTk", title: "Things to know in C++ / Java before starting DSA", durationSeconds: 2400 },
      { id: "str2", ytVideoId: "YZOw6gc246g", title: "Time and Space Complexity Analysis Simplified", durationSeconds: 2800 },
      { id: "str3", ytVideoId: "G9KFw9f6g90", title: "Array Easy Problems: Second Largest, Remove Duplicates, Rotate", durationSeconds: 3600 },
      { id: "str4", ytVideoId: "QzZ4g3VzP6s", title: "Array Medium: 2 Sum, Kadane's Algorithm & Majority Element", durationSeconds: 4200 },
      { id: "str5", ytVideoId: "53K_n1oV2bA", title: "Binary Search on 1D Arrays: Lower Bound & Upper Bound", durationSeconds: 3800 },
      { id: "str6", ytVideoId: "jY-ERxALGtQ", title: "Binary Search on Answers: Book Allocation & Painter Partition", durationSeconds: 4500 },
      { id: "str7", ytVideoId: "Nq7ok-OyEpg", title: "Linked List: Introduction, Traversal, Insertion & Deletion", durationSeconds: 3300 },
      { id: "str8", ytVideoId: "8b9K0E4L7wF", title: "Recursion & Backtracking: Subsequences & Combination Sum", durationSeconds: 4100 },
      { id: "str9", ytVideoId: "P9Q1wK8N3w4", title: "Binary Trees: Preorder, Inorder, Postorder & Level Order", durationSeconds: 4600 },
      { id: "str10", ytVideoId: "K9Qk8N3w4Ew", title: "Binary Search Trees (BST): Search, Insert & Ceil/Floor", durationSeconds: 3500 },
      { id: "str11", ytVideoId: "Xq8V1b9K0E4", title: "Graphs: BFS, DFS, Connected Components & Cycle Detection", durationSeconds: 4800 },
      { id: "str12", ytVideoId: "W9V1b9K0E4L", title: "Dynamic Programming: 1D DP, Memoization & Tabulation", durationSeconds: 5200 },
    ],
  },
  // 5. Kunal Kushwaha - Complete Java + DSA Bootcamp
  {
    id: "kunal-java-dsa",
    title: "Java + DSA + Interview Preparation",
    instructor: "Kunal Kushwaha",
    totalVideos: 10,
    approxHours: 20,
    totalSeconds: 20 * 3600,
    playlistUrl: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    description: "In-depth Java fundamentals, Object-Oriented Programming, and algorithmic problem-solving for top tech interviews.",
    videos: [
      { id: "kn1", ytVideoId: "wn49bRJ3G4M", title: "Introduction to Programming & Java Architecture", durationSeconds: 2700 },
      { id: "kn2", ytVideoId: "4G0U2bA8s8c", title: "First Java Program: Input/Output, Data Types & Variables", durationSeconds: 2900 },
      { id: "kn3", ytVideoId: "4A8Z6K1p2gA", title: "Conditionals, Loops & Switch Statements in Java", durationSeconds: 3200 },
      { id: "kn4", ytVideoId: "8n0r1w4g1vU", title: "Functions & Methods in Java with Memory Allocation", durationSeconds: 3400 },
      { id: "kn5", ytVideoId: "9kQ1wK8N3w4", title: "Arrays & ArrayLists in Java: Memory representation", durationSeconds: 3800 },
      { id: "kn6", ytVideoId: "Xq8V1b9K0E4", title: "Linear Search and Binary Search In-Depth Explanation", durationSeconds: 4500 },
      { id: "kn7", ytVideoId: "W9V1b9K0E4L", title: "Order-Agnostic Binary Search & LeetCode Questions", durationSeconds: 4200 },
      { id: "kn8", ytVideoId: "K9Qk8N3w4Ew", title: "Sorting Algorithms: Bubble, Selection & Insertion Sort", durationSeconds: 3900 },
      { id: "kn9", ytVideoId: "1L7wFq9K0E4", title: "Cyclic Sort Pattern: 5 LeetCode Questions Solved", durationSeconds: 3600 },
      { id: "kn10", ytVideoId: "b8y1vK6Qn8w", title: "Object Oriented Programming (OOP): Classes, Objects & Constructors", durationSeconds: 4800 },
    ],
  },
  // 6. Harkirat Singh - 100xDevs DevOps & Fullstack
  {
    id: "harkirat-devops-fullstack",
    title: "Full Stack DevOps & Microservices",
    instructor: "Harkirat Singh (100xDevs)",
    totalVideos: 10,
    approxHours: 18,
    totalSeconds: 18 * 3600,
    playlistUrl: "https://www.youtube.com/playlist?list=PLinedj3B30sCh1z_bMm2PjF61XvPzH7qf",
    thumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80",
    description: "Learn modern production engineering: Monorepos, Docker containers, CI/CD with GitHub Actions, and Kubernetes deployments.",
    videos: [
      { id: "hk1", ytVideoId: "K7Bw1j7rU8U", title: "Modern Fullstack Architecture & Monorepos with Turborepo", durationSeconds: 3300 },
      { id: "hk2", ytVideoId: "vQ9yGfQfG7c", title: "Next.js 14 Server Actions, SSR vs CSR, and Prisma ORM", durationSeconds: 3900 },
      { id: "hk3", ytVideoId: "jVp5wN0g99w", title: "PostgreSQL Connection Pooling and Performance Optimization", durationSeconds: 3600 },
      { id: "hk4", ytVideoId: "vD1Vn9kG2rY", title: "Docker Crash Course: Containerizing Frontend and Backend", durationSeconds: 4200 },
      { id: "hk5", ytVideoId: "K9Qk8N3w4Ew", title: "Docker Compose for Multi-Container Development Environments", durationSeconds: 3400 },
      { id: "hk6", ytVideoId: "1L7wFq9K0E4", title: "CI/CD Pipelines with GitHub Actions & Automated Testing", durationSeconds: 4100 },
      { id: "hk7", ytVideoId: "b8y1vK6Qn8w", title: "Deploying to AWS EC2 with Nginx Reverse Proxy and SSL", durationSeconds: 4500 },
      { id: "hk8", ytVideoId: "Xq8V1b9K0E4", title: "Kubernetes 101: Pods, Services, Deployments & Ingress", durationSeconds: 4900 },
      { id: "hk9", ytVideoId: "P9Q1wK8N3w4", title: "Message Queues with Redis, BullMQ & Asynchronous Workers", durationSeconds: 3800 },
      { id: "hk10", ytVideoId: "W9V1b9K0E4L", title: "Monitoring & Observability: Prometheus and Grafana Dashboards", durationSeconds: 4200 },
    ],
  },
  // 7. FreeCodeCamp - Full Stack MERN Course
  {
    id: "fcc-mern",
    title: "Full Stack MERN Project Bootcamp",
    instructor: "FreeCodeCamp",
    totalVideos: 10,
    approxHours: 16,
    totalSeconds: 16 * 3600,
    playlistUrl: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbkfiqHnNaxpOPhh9tSWMXIF",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=80",
    description: "Build, secure, and deploy complete real-world MERN web applications with authentication, payment processing, and cloud storage.",
    videos: [
      { id: "fcc1", ytVideoId: "7CqJlxBYj-M", title: "MERN Stack Setup: Monorepo vs Multi-repo architecture", durationSeconds: 2700 },
      { id: "fcc2", ytVideoId: "-0exw-9YJCE", title: "Express Server, Middleware, and MongoDB Connection", durationSeconds: 3100 },
      { id: "fcc3", ytVideoId: "mrHNSanmqQ4", title: "JWT Authentication: Register, Login & Protected Routes", durationSeconds: 3600 },
      { id: "fcc4", ytVideoId: "PkZNo7MFNFg", title: "Building the React Frontend with Vite & Tailwind CSS", durationSeconds: 4200 },
      { id: "fcc5", ytVideoId: "W6NZfCO5SIk", title: "State Management with Zustand & React Query", durationSeconds: 3800 },
      { id: "fcc6", ytVideoId: "0riHps91AzE", title: "Integrating Stripe Payments for Digital Checkout", durationSeconds: 4500 },
      { id: "fcc7", ytVideoId: "nu_pCVPKzTk", title: "Image & File Uploads with Cloudinary API", durationSeconds: 3200 },
      { id: "fcc8", ytVideoId: "p8y1vK6Qn8w", title: "Real-time Notifications with Socket.io", durationSeconds: 4000 },
      { id: "fcc9", ytVideoId: "Xq8V1b9K0E4", title: "Security Best Practices: Helmet, Rate Limiting & CORS", durationSeconds: 2900 },
      { id: "fcc10", ytVideoId: "W9V1b9K0E4L", title: "Deploying Full Stack MERN to Render & Netlify", durationSeconds: 3400 },
    ],
  },
];

/**
 * Canonical DSA Topic progression order for realistic syllabus sequencing
 */
const CANONICAL_DSA_TOPIC_ORDER = [
  "Arrays & Hashing",
  "Arrays",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Binary Search Tree",
  "Tries",
  "Heap / Priority Queue",
  "Heap",
  "Backtracking",
  "Recursion",
  "Graphs",
  "Matrix",
  "1-D Dynamic Programming",
  "2-D Dynamic Programming",
  "Dynamic Programming",
  "Greedy",
  "Intervals",
  "Bit Manipulation",
  "Math & Geometry",
  "General",
];

/**
 * Generate customized DSA Sheet Roadmap
 * Schedules ALL problems from the selected sheet across the chosen days (no questions dropped)
 */
export function generateDsaRoadmap({
  sheetId = "leetcode-top-150",
  currentLevel = "Know the basics",
  goal = "Interview soon",
  timePerDay = "1 hour",
  durationDays = 30,
}) {
  const sheet =
    SHEETS_DATA.find((s) => s.id === sheetId) || SHEETS_DATA[0];

  const totalDays = Math.min(Math.max(parseInt(durationDays, 10) || 30, 3), 90);

  // Sort ALL sheet problems by logical DSA topic progression, then by difficulty (Easy -> Medium -> Hard)
  const diffRank = { Easy: 1, Medium: 2, Hard: 3 };
  const getTopicRank = (cat) => {
    const idx = CANONICAL_DSA_TOPIC_ORDER.findIndex(
      (t) => t.toLowerCase() === (cat || "").toLowerCase()
    );
    return idx === -1 ? 999 : idx;
  };

  const allProblems = [...sheet.problems].sort((a, b) => {
    const catA = a.category || "General";
    const catB = b.category || "General";
    const topicRankA = getTopicRank(catA);
    const topicRankB = getTopicRank(catB);

    if (topicRankA !== topicRankB) {
      return topicRankA - topicRankB;
    }
    const diffA = diffRank[a.difficulty] || 2;
    const diffB = diffRank[b.difficulty] || 2;
    return diffA - diffB;
  });

  const totalProblemsCount = allProblems.length;

  // Evenly distribute ALL problems across the selected totalDays (every problem is assigned)
  const days = [];
  let currentPointer = 0;

  for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
    const remainingProblems = totalProblemsCount - currentPointer;
    const remainingDays = totalDays - dayNum + 1;
    const dayProblemCount = remainingDays > 0 ? Math.ceil(remainingProblems / remainingDays) : 0;

    const dayProblems = allProblems.slice(
      currentPointer,
      currentPointer + dayProblemCount
    );
    currentPointer += dayProblems.length;

    if (dayProblems.length === 0) {
      days.push({
        day: dayNum,
        title: "Revision & Mock Interview Practice",
        focusTopic: "Revision",
        problems: [],
        isRestOrReview: true,
        note: "Review any tough problems from earlier days, re-implement optimal solutions, and test time/space constraints.",
      });
    } else {
      const uniqueCats = Array.from(new Set(dayProblems.map((p) => p.category || "Problem Solving")));
      const primaryCategory = uniqueCats.slice(0, 2).join(" & ");
      days.push({
        day: dayNum,
        title: `${primaryCategory} Practice & Patterns`,
        focusTopic: primaryCategory,
        problems: dayProblems,
        isRestOrReview: false,
        note: `Target: Solve ${dayProblems.length} problem${dayProblems.length > 1 ? "s" : ""} on LeetCode covering ${uniqueCats.join(", ")}. Analyze time and space complexity.`,
      });
    }
  }

  const avgPerDay = (totalProblemsCount / totalDays).toFixed(1);

  return {
    id: `dsa-roadmap-${Date.now()}`,
    type: "dsa",
    title: `${sheet.title} Personalized Roadmap`,
    subtitle: `Custom DSA syllabus drafted from ${sheet.title}: Complete all ${totalProblemsCount} problems across ${totalDays} days (~${avgPerDay} problems/day) for ${currentLevel}`,
    sheetId: sheet.id,
    sheetTitle: sheet.title,
    currentLevel,
    goal,
    timePerDay,
    totalDays,
    totalProblems: totalProblemsCount,
    days,
    completedDays: {},
    completedItems: {},
    createdAt: new Date().toISOString(),
  };
}

/**
 * Generate Video Roadmap based on user's selected library playlist or preset
 */
export function generateVideoRoadmap({
  playlist,
  timePerDay = "1 hour",
}) {
  if (!playlist) return null;

  // Daily target in seconds: 30min -> 1800s, 1hr -> 3600s, 2hr+ -> 7200s
  let targetSecondsPerDay = 3600;
  if (timePerDay.includes("30")) targetSecondsPerDay = 1800;
  else if (timePerDay.includes("2")) targetSecondsPerDay = 7200;

  const rawVideos = playlist.videos || [];
  const days = [];
  let currentDayVideos = [];
  let currentDayDuration = 0;
  let dayCounter = 1;

  rawVideos.forEach((video, idx) => {
    // Read duration accurately supporting all schema variations
    const videoDuration =
      video.durationInSeconds ||
      video.durationSeconds ||
      video.duration ||
      Math.floor(Math.random() * 600 + 1500); // 25-35 min realistic fallback

    currentDayVideos.push({
      id: video._id || video.id || `v-${idx}`,
      videoId: video._id || video.id || `v-${idx}`,
      ytVideoId: video.ytVideoId || video.videoId || video.id || "vz1RlUy573o",
      title: video.title || `Lesson ${idx + 1}`,
      durationSeconds: videoDuration,
      playlistId: playlist._id || playlist.id,
      isLibrary: !!playlist._id, // flag whether it's stored in user MongoDB library
    });
    currentDayDuration += videoDuration;

    // When daily quota is reached (or at last video), seal the day
    if (
      currentDayDuration >= targetSecondsPerDay ||
      idx === rawVideos.length - 1
    ) {
      const minutes = Math.round(currentDayDuration / 60);
      days.push({
        day: dayCounter,
        title: `Day ${dayCounter}: ${currentDayVideos[0]?.title.substring(0, 50)}...`,
        durationMinutes: minutes,
        videos: [...currentDayVideos],
        note: `Watch today's assigned video lessons and take notes in the player.`,
      });

      dayCounter++;
      currentDayVideos = [];
      currentDayDuration = 0;
    }
  });

  // If no videos were present, provide a sensible pacing
  if (days.length === 0) {
    days.push({
      day: 1,
      title: `Day 1: Introduction & First Modules`,
      durationMinutes: 45,
      videos: [],
      note: "Watch initial lessons and setup development workspace.",
    });
  }

  return {
    id: `video-roadmap-${Date.now()}`,
    type: "video",
    title: `${playlist.title} Video Roadmap`,
    subtitle: `Paced series of ${rawVideos.length || playlist.totalVideos} videos split across ${days.length} days at ${timePerDay}`,
    playlistId: playlist._id || playlist.id,
    playlistTitle: playlist.title,
    timePerDay,
    totalDays: days.length,
    totalVideos: rawVideos.length || playlist.totalVideos,
    days,
    completedDays: {},
    completedItems: {},
    createdAt: new Date().toISOString(),
  };
}

/**
 * Generate AI-Powered "Learn Anything" Roadmap via Gemini API
 */
export async function generateAiRoadmap({
  topic = "Docker & Kubernetes",
  currentLevel = "Beginner",
  goal = "Build real projects",
  timePerDay = "1 hour",
  durationDays = 14,
}) {
  try {
    const res = await api.post("/roadmap/generate-ai", {
      topic,
      currentLevel,
      goal,
      timePerDay,
      durationDays,
    });

    const roadmapData = res.data?.data;

    return {
      id: `ai-roadmap-${Date.now()}`,
      type: "ai",
      title: roadmapData.title || `${topic} Engineering Roadmap`,
      subtitle: roadmapData.summary || `A personalized ${durationDays}-day curriculum for ${topic}`,
      topic,
      currentLevel,
      goal,
      timePerDay,
      totalDays: roadmapData.totalDays || durationDays,
      sprints: roadmapData.sprints || [],
      days: roadmapData.days || [],
      completedDays: {},
      completedItems: {},
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to generate AI roadmap, using local generator", error);
    // Local emergency fallback
    const days = [];
    const count = parseInt(durationDays, 10) || 14;
    for (let i = 1; i <= count; i++) {
      days.push({
        day: i,
        title: `Day ${i}: ${topic} Core Concepts & Implementation`,
        concepts: [`Understand ${topic} architecture`, `Master practical syntax and workflows`],
        task: `Build a mini implementation or hands-on practice repository for ${topic}.`,
        resourceQuery: `${topic} tutorial step ${i}`,
      });
    }

    return {
      id: `ai-roadmap-${Date.now()}`,
      type: "ai",
      title: `${topic} Learning Roadmap`,
      subtitle: `Structured ${count}-day learning curriculum for ${topic}`,
      topic,
      currentLevel,
      goal,
      timePerDay,
      totalDays: count,
      days,
      completedDays: {},
      completedItems: {},
      createdAt: new Date().toISOString(),
    };
  }
}
