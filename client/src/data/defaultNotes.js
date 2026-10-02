export const DEFAULT_NOTE_CATEGORIES = [
  "All",
  "DSA & Algorithms",
  "Web Development",
  "Backend & Systems",
  "Core CS",
  "Interview Cheatsheets",
  "Personal Vault",
];

export const CATEGORY_COLORS = {
  "DSA & Algorithms": "emerald",
  "Web Development": "cyan",
  "Backend & Systems": "purple",
  "Core CS": "amber",
  "Interview Cheatsheets": "rose",
  "Personal Vault": "blue",
};

export const DEFAULT_CURATED_NOTES = [
  {
    id: "default-dsa-1",
    isDefault: true,
    title: "Binary Search Mastery & The Invariant Template",
    category: "DSA & Algorithms",
    tags: ["binary-search", "arrays", "template", "dsa"],
    resourceLink: "https://leetcode.com/discuss/general-discussion/786126/python-powerful-ultimate-binary-search-template-solved-many-problems",
    resourceType: "cheatsheet",
    isPinned: true,
    color: "emerald",
    updatedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    content: `### Binary Search Invariant Template
To eliminate off-by-one errors in binary search, use the standard boundary approach:

\`\`\`javascript
function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1; // Not found
}
\`\`\`

**Key Rules:**
1. \`mid = low + Math.floor((high - low) / 2)\` avoids 32-bit integer overflow.
2. Condition \`low <= high\` ensures you inspect single-element intervals.
3. For Lower Bound (first index with value \`>= target\`), return \`low\` when interval collapses.`,
  },
  {
    id: "default-dsa-2",
    isDefault: true,
    title: "Dynamic Programming: 5 Core Patterns Cheatsheet",
    category: "DSA & Algorithms",
    tags: ["dynamic-programming", "memoization", "optimization", "patterns"],
    resourceLink: "https://github.com/ashishps1/awesome-leetcode-resources",
    resourceType: "doc",
    isPinned: true,
    color: "emerald",
    updatedAt: new Date(Date.now() - 3600000 * 24 * 4).toISOString(),
    content: `### 5 High-Yield Dynamic Programming Patterns
Every DP question is fundamentally state transitions over subproblems:

1. **0/1 Knapsack Pattern**: Pick or don't pick. Iterate backwards in space-optimized 1D arrays to prevent overwriting past states.
2. **Unbounded Knapsack**: Items can be picked infinite times (e.g., Coin Change, Rod Cutting). Iterate forwards.
3. **Longest Common Subsequence (LCS)**: String matching on prefixes. If \`s1[i-1] === s2[j-1]\`, \`dp[i][j] = 1 + dp[i-1][j-1]\`.
4. **Longest Increasing Subsequence (LIS)**: Can be solved in $O(N^2)$ using standard DP or $O(N \\log N)$ using Patience Sorting (Binary Search on tails array).
5. **Interval DP / Matrix Chain**: Solve for smaller sub-lengths first (\`len = 2\` to \`n\`).`,
  },
  {
    id: "default-web-1",
    isDefault: true,
    title: "React 19 & State Memoization Architecture",
    category: "Web Development",
    tags: ["react", "frontend", "performance", "hooks"],
    resourceLink: "https://react.dev/reference/react",
    resourceType: "link",
    isPinned: false,
    color: "cyan",
    updatedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    content: `### When to Memoize vs When NOT to Memoize
Avoid premature optimization with \`useMemo\` and \`useCallback\`:

* **Use \`useMemo\` when**:
  - Computing an expensive transformation over arrays (e.g. filtering & sorting 5,000 items).
  - Passing an object/array reference into a dependency array of a hook (like \`useEffect\`).
* **Use \`useCallback\` when**:
  - Passing callback functions down to heavily optimized child components wrapped in \`React.memo\`.
* **Avoid when**:
  - Simple calculations (e.g. \`items.length > 0\`) — memoization overhead exceeds calculation cost.`,
  },
  {
    id: "default-backend-1",
    isDefault: true,
    title: "System Design: Cache-Aside vs Write-Through Patterns",
    category: "Backend & Systems",
    tags: ["system-design", "caching", "redis", "scalability"],
    resourceLink: "https://github.com/donnemartin/system-design-primer",
    resourceType: "cheatsheet",
    isPinned: true,
    color: "purple",
    updatedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    content: `### Cache-Aside (Lazy Loading) Architecture
1. Application reads from Cache (Redis/Memcached).
2. If Cache Hit: Return data immediately ($< 2ms$).
3. If Cache Miss: Read from Primary Database, write back to Cache with TTL, and return.

\`\`\`
Client ---> App Server ---> Redis (Cache)
                  | (on miss)
                  v
             PostgreSQL / MongoDB
\`\`\`

**Mitigating Cache Stampede / Dog-piling**:
- Set randomized TTL expiration (\`baseTTL + random(0, 60s)\`) so all cache keys don't expire simultaneously.
- Use distributed mutex locks (e.g. Redlock) when re-populating heavy aggregated views.`,
  },
  {
    id: "default-backend-2",
    isDefault: true,
    title: "MongoDB Indexing Rules & Aggregation Optimization",
    category: "Backend & Systems",
    tags: ["mongodb", "database", "indexing", "performance"],
    resourceLink: "https://www.mongodb.com/docs/manual/indexes/",
    resourceType: "doc",
    isPinned: false,
    color: "purple",
    updatedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    content: `### The ESR (Equality, Sort, Range) Rule for Compound Indexes
When designing compound indexes in MongoDB, structure keys in this exact order:

1. **E - Equality**: Fields queried with exact matches (\`{ userId: req.user.id }\`).
2. **S - Sort**: Fields by which you sort the result (\`{ createdAt: -1 }\`).
3. **R - Range**: Fields queried with \`$gt\`, \`$lt\`, or \`$in\`.

\`\`\`javascript
// Schema Index Example:
NoteSchema.index({ userId: 1, isPinned: -1, createdAt: -1 });
\`\`\`
This index fulfills both exact user scoping and sorting without requiring in-memory sorting ($> 32MB$ crash).`,
  },
  {
    id: "default-cs-1",
    isDefault: true,
    title: "Operating Systems: Process vs Thread & Deadlock Conditions",
    category: "Core CS",
    tags: ["operating-systems", "concurrency", "cs-fundamentals"],
    resourceLink: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    resourceType: "doc",
    isPinned: false,
    color: "amber",
    updatedAt: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
    content: `### Coffman's 4 Conditions for Deadlock
A system can deadlock if and only if all four conditions hold simultaneously:

1. **Mutual Exclusion**: At least one resource is held in non-shareable mode.
2. **Hold and Wait**: A process holds one resource while requesting another.
3. **No Preemption**: Resources cannot be forcibly seized; only released voluntarily.
4. **Circular Wait**: Process $P_0$ waits for $P_1$, which waits for $P_2$, ..., which waits for $P_0$.

**Prevention**:
- Acquire locks in strict global hierarchical order (eliminates circular wait).
- Use timeouts when requesting locks (\`tryLock\`).`,
  },
  {
    id: "default-interview-1",
    isDefault: true,
    title: "Behavioral Interview Mastery: The STAR Method",
    category: "Interview Cheatsheets",
    tags: ["interview-prep", "behavioral", "career", "leadership"],
    resourceLink: "https://www.thebalancecareers.com/what-is-the-star-interview-response-technique-2061629",
    resourceType: "doc",
    isPinned: false,
    color: "rose",
    updatedAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    content: `### The STAR Response Framework
Every behavioral question ("Tell me about a time when...") should follow this 4-step structure:

* **S - Situation**: Set the stage concisely ($15\\%$ of time). Context, team size, tech stack, and objective.
* **T - Task**: What was your specific responsibility? What challenge arose? ($15\\%$ of time).
* **A - Action**: What specific actions did YOU take? Explain trade-offs, technologies chosen, and leadership ($50\\%$ of time).
* **R - Result**: Quantifiable outcomes ($20\\%$ of time). E.g., *"Reduced latency by 38%, boosted uptime to 99.95%, and saved $1,200/month."*`,
  },
];
