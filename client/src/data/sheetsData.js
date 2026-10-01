export const SHEETS_DATA = [
  {
    id: "leetcode-75",
    title: "LeetCode 75",
    badge: "Essential",
    problemCount: 75,
    animatedCount: 75,
    description:
      "The gold-standard curated list of 75 interview questions covering every vital pattern: Two Pointers, Sliding Window, Graphs, Trees, and DP.",
    topics: [
      "All Topics",
      "Array / String",
      "Two Pointers",
      "Sliding Window",
      "Prefix Sum",
      "Hash Map / Set",
      "Stack",
      "Queue",
      "Linked List",
      "Binary Tree - DFS",
      "Binary Tree - BFS",
      "Binary Search",
      "Graphs",
      "Dynamic Programming",
      "Heap",
    ],
    problems: [
      {
        id: "lc75-1",
        number: "01",
        title: "Merge Strings Alternately",
        difficulty: "Easy",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n + m)", space: "O(n + m)" },
        hint: "Two pointers scanning both strings simultaneously, appending alternately.",
        leetcodeUrl: "https://leetcode.com/problems/merge-strings-alternately/",
        youtubeId: "LECWOvTo-Sc",
        solutions: {
          cpp: `class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        string result = "";
        int i = 0, j = 0;
        while (i < word1.size() || j < word2.size()) {
            if (i < word1.size()) result += word1[i++];
            if (j < word2.size()) result += word2[j++];
        }
        return result;
    }
};`,
          java: `class Solution {
    public String mergeAlternately(String word1, String word2) {
        StringBuilder result = new StringBuilder();
        int i = 0, j = 0;
        while (i < word1.length() || j < word2.length()) {
            if (i < word1.length()) result.append(word1.charAt(i++));
            if (j < word2.length()) result.append(word2.charAt(j++));
        }
        return result.toString();
    }
}`,
          python: `class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        res = []
        i, j = 0, 0
        while i < len(word1) or j < len(word2):
            if i < len(word1):
                res.append(word1[i])
                i += 1
            if j < len(word2):
                res.append(word2[j])
                j += 1
        return "".join(res)`,
          javascript: `var mergeAlternately = function(word1, word2) {
    let result = '';
    let i = 0, j = 0;
    while (i < word1.length || j < word2.length) {
        if (i < word1.length) result += word1[i++];
        if (j < word2.length) result += word2[j++];
    }
    return result;
};`,
        },
      },
      {
        id: "lc75-2",
        number: "02",
        title: "Greatest Common Divisor of Strings",
        difficulty: "Easy",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n + m)", space: "O(n + m)" },
        hint: "If str1 + str2 == str2 + str1, the GCD length substring is the answer.",
        leetcodeUrl: "https://leetcode.com/problems/greatest-common-divisor-of-strings/",
        youtubeId: "i5I_w4punnQ",
        solutions: {
          cpp: `class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        if (str1 + str2 != str2 + str1) return "";
        return str1.substr(0, std::gcd(str1.size(), str2.size()));
    }
};`,
          java: `class Solution {
    public String gcdOfStrings(String str1, String str2) {
        if (!(str1 + str2).equals(str2 + str1)) return "";
        int gcdLength = gcd(str1.length(), str2.length());
        return str1.substring(0, gcdLength);
    }
    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}`,
          python: `class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        if str1 + str2 != str2 + str1:
            return ""
        from math import gcd
        return str1[:gcd(len(str1), len(str2))]`,
          javascript: `var gcdOfStrings = function(str1, str2) {
    if (str1 + str2 !== str2 + str1) return "";
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    return str1.substring(0, gcd(str1.length, str2.length));
};`,
        },
      },
      {
        id: "lc75-3",
        number: "03",
        title: "Kids With the Greatest Number of Candies",
        difficulty: "Easy",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Find max element once, then check if candies[i] + extraCandies >= max.",
        leetcodeUrl: "https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/",
        youtubeId: "3XfK1j7W_3E",
        solutions: {
          cpp: `class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        int maxCandies = *max_element(candies.begin(), candies.end());
        vector<bool> result;
        for (int c : candies) {
            result.push_back(c + extraCandies >= maxCandies);
        }
        return result;
    }
};`,
          java: `class Solution {
    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {
        int max = 0;
        for (int c : candies) max = Math.max(max, c);
        List<Boolean> result = new ArrayList<>();
        for (int c : candies) result.add(c + extraCandies >= max);
        return result;
    }
}`,
          python: `class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        max_c = max(candies)
        return [c + extraCandies >= max_c for c in candies]`,
          javascript: `var kidsWithCandies = function(candies, extraCandies) {
    const max = Math.max(...candies);
    return candies.map(c => c + extraCandies >= max);
};`,
        },
      },
      {
        id: "lc75-4",
        number: "04",
        title: "Can Place Flowers",
        difficulty: "Easy",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Greedily place flowers where left, right, and current spot are 0.",
        leetcodeUrl: "https://leetcode.com/problems/can-place-flowers/",
        youtubeId: "ZGxqqj66Bls",
        solutions: {
          cpp: `class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        for (int i = 0; i < flowerbed.size(); i++) {
            if (flowerbed[i] == 0) {
                bool leftEmpty = (i == 0 || flowerbed[i - 1] == 0);
                bool rightEmpty = (i == flowerbed.size() - 1 || flowerbed[i + 1] == 0);
                if (leftEmpty && rightEmpty) {
                    flowerbed[i] = 1;
                    n--;
                }
            }
        }
        return n <= 0;
    }
};`,
          java: `class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        for (int i = 0; i < flowerbed.length; i++) {
            if (flowerbed[i] == 0) {
                boolean left = (i == 0 || flowerbed[i - 1] == 0);
                boolean right = (i == flowerbed.length - 1 || flowerbed[i + 1] == 0);
                if (left && right) {
                    flowerbed[i] = 1;
                    n--;
                }
            }
        }
        return n <= 0;
    }
}`,
          python: `class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        f = [0] + flowerbed + [0]
        for i in range(1, len(f) - 1):
            if f[i - 1] == 0 and f[i] == 0 and f[i + 1] == 0:
                f[i] = 1
                n -= 1
        return n <= 0`,
          javascript: `var canPlaceFlowers = function(flowerbed, n) {
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0) {
            const left = i === 0 || flowerbed[i - 1] === 0;
            const right = i === flowerbed.length - 1 || flowerbed[i + 1] === 0;
            if (left && right) {
                flowerbed[i] = 1;
                n--;
            }
        }
    }
    return n <= 0;
};`,
        },
      },
      {
        id: "lc75-5",
        number: "05",
        title: "Reverse Vowels of a String",
        difficulty: "Easy",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Two pointers from left and right swapping vowels until they cross.",
        leetcodeUrl: "https://leetcode.com/problems/reverse-vowels-of-a-string/",
        youtubeId: "_d0T_2Lk2qA",
        solutions: {
          cpp: `class Solution {
public:
    string reverseVowels(string s) {
        auto isVowel = [](char c) {
            c = tolower(c);
            return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
        };
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isVowel(s[l])) l++;
            while (l < r && !isVowel(s[r])) r--;
            if (l < r) swap(s[l++], s[r--]);
        }
        return s;
    }
};`,
          java: `class Solution {
    public String reverseVowels(String s) {
        char[] arr = s.toCharArray();
        int l = 0, r = arr.length - 1;
        String vowels = "aeiouAEIOU";
        while (l < r) {
            while (l < r && vowels.indexOf(arr[l]) == -1) l++;
            while (l < r && vowels.indexOf(arr[r]) == -1) r--;
            if (l < r) {
                char temp = arr[l];
                arr[l++] = arr[r];
                arr[r--] = temp;
            }
        }
        return new String(arr);
    }
}`,
          python: `class Solution:
    def reverseVowels(self, s: str) -> str:
        vowels = set("aeiouAEIOU")
        arr = list(s)
        l, r = 0, len(arr) - 1
        while l < r:
            while l < r and arr[l] not in vowels:
                l += 1
            while l < r and arr[r] not in vowels:
                r -= 1
            arr[l], arr[r] = arr[r], arr[l]
            l += 1
            r -= 1
        return "".join(arr)`,
          javascript: `var reverseVowels = function(s) {
    const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
    const arr = s.split('');
    let l = 0, r = arr.length - 1;
    while (l < r) {
        while (l < r && !vowels.has(arr[l])) l++;
        while (l < r && !vowels.has(arr[r])) r--;
        [arr[l], arr[r]] = [arr[r], arr[l]];
        l++;
        r--;
    }
    return arr.join('');
};`,
        },
      },
      {
        id: "lc75-6",
        number: "06",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Prefix products pass left-to-right, then suffix products pass right-to-left.",
        leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
        youtubeId: "bNvIQI2wAjk",
        solutions: {
          cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
};`,
          java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
}`,
          python: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1] * n
        prefix = 1
        for i in range(n):
            res[i] = prefix
            prefix *= nums[i]
        suffix = 1
        for i in range(n - 1, -1, -1):
            res[i] *= suffix
            suffix *= nums[i]
        return res`,
          javascript: `var productExceptSelf = function(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
};`,
        },
      },
      {
        id: "lc75-7",
        number: "07",
        title: "Move Zeroes",
        difficulty: "Easy",
        category: "Two Pointers",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Two pointers: insert non-zeros sequentially and pad the rest with zeros.",
        leetcodeUrl: "https://leetcode.com/problems/move-zeroes/",
        youtubeId: "aayNRwUN3Do",
        solutions: {
          cpp: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int insertPos = 0;
        for (int num : nums) {
            if (num != 0) nums[insertPos++] = num;
        }
        while (insertPos < nums.size()) nums[insertPos++] = 0;
    }
};`,
          java: `class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0;
        for (int num : nums) {
            if (num != 0) nums[insertPos++] = num;
        }
        while (insertPos < nums.length) nums[insertPos++] = 0;
    }
}`,
          python: `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        insert_pos = 0
        for num in nums:
            if num != 0:
                nums[insert_pos] = num
                insert_pos += 1
        for i in range(insert_pos, len(nums)):
            nums[i] = 0`,
          javascript: `var moveZeroes = function(nums) {
    let insertPos = 0;
    for (let num of nums) {
        if (num !== 0) nums[insertPos++] = num;
    }
    while (insertPos < nums.length) nums[insertPos++] = 0;
};`,
        },
      },
      {
        id: "lc75-8",
        number: "08",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Two Pointers",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Two pointers at edges. Shrink the shorter wall inwards at each step.",
        leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
        youtubeId: "UuiTKBwPgAo",
        solutions: {
          cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = height.size() - 1, maxArea = 0;
        while (l < r) {
            int h = min(height[l], height[r]);
            maxArea = max(maxArea, h * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxArea;
    }
};`,
          java: `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1, maxArea = 0;
        while (l < r) {
            int h = Math.min(height[l], height[r]);
            maxArea = Math.max(maxArea, h * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxArea;
    }
}`,
          python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        max_area = 0
        while l < r:
            h = min(height[l], height[r])
            max_area = max(max_area, h * (r - l))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return max_area`,
          javascript: `var maxArea = function(height) {
    let l = 0, r = height.length - 1, maxArea = 0;
    while (l < r) {
        const h = Math.min(height[l], height[r]);
        maxArea = Math.max(maxArea, h * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return maxArea;
};`,
        },
      },
      {
        id: "lc75-9",
        number: "09",
        title: "Maximum Average Subarray I",
        difficulty: "Easy",
        category: "Sliding Window",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Fixed-size sliding window of length k; slide by adding next and subtracting leaving element.",
        leetcodeUrl: "https://leetcode.com/problems/maximum-average-subarray-i/",
        youtubeId: "56TxHMG0m-8",
        solutions: {
          cpp: `class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        double maxSum = sum;
        for (int i = k; i < nums.size(); i++) {
            sum += nums[i] - nums[i - k];
            maxSum = max(maxSum, sum);
        }
        return maxSum / k;
    }
};`,
          java: `class Solution {
    public double findMaxAverage(int[] nums, int k) {
        double sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        double maxSum = sum;
        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, sum);
        }
        return maxSum / k;
    }
}`,
          python: `class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        curr_sum = sum(nums[:k])
        max_sum = curr_sum
        for i in range(k, len(nums)):
            curr_sum += nums[i] - nums[i - k]
            max_sum = max(max_sum, curr_sum)
        return max_sum / k`,
          javascript: `var findMaxAverage = function(nums, k) {
    let sum = 0;
    for (let i = 0; i < k; i++) sum += nums[i];
    let maxSum = sum;
    for (let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, sum);
    }
    return maxSum / k;
};`,
        },
      },
      {
        id: "lc75-10",
        number: "10",
        title: "Find Pivot Index",
        difficulty: "Easy",
        category: "Prefix Sum",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Total sum minus leftSum minus current is the right sum. Check if leftSum == rightSum.",
        leetcodeUrl: "https://leetcode.com/problems/find-pivot-index/",
        youtubeId: "u89i60lYx8U",
        solutions: {
          cpp: `class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int totalSum = accumulate(nums.begin(), nums.end(), 0);
        int leftSum = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (leftSum == totalSum - leftSum - nums[i]) return i;
            leftSum += nums[i];
        }
        return -1;
    }
};`,
          java: `class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int n : nums) total += n;
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;
    }
}`,
          python: `class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        total = sum(nums)
        left = 0
        for i, x in enumerate(nums):
            if left == total - left - x:
                return i
            left += x
        return -1`,
          javascript: `var pivotIndex = function(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        if (left === total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
};`,
        },
      },
    ],
  },
  {
    id: "leetcode-top-150",
    title: "LeetCode Top 150",
    badge: "Top Interview",
    problemCount: 150,
    animatedCount: 150,
    description:
      "The definitive collection of 150 interview questions asked by top tech firms like Google, Amazon, Meta, and Microsoft.",
    topics: [
      "All Topics",
      "Array / String",
      "Two Pointers",
      "Sliding Window",
      "Matrix",
      "Hashmap",
      "Intervals",
      "Stack",
      "Linked List",
      "Binary Tree General",
      "Binary Tree BFS",
      "Binary Search Tree",
      "Graph General",
      "Graph BFS",
      "Backtracking",
      "1D DP",
      "Multidimensional DP",
    ],
    problems: [
      {
        id: "top150-1",
        number: "01",
        title: "Remove Duplicates from Sorted Array",
        difficulty: "Easy",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Two pointers, one write index. Overwrite unique elements in place.",
        leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        youtubeId: "DEJAZBq0FDA",
        solutions: {
          cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int write = 1;
        for (int read = 1; read < nums.size(); read++) {
            if (nums[read] != nums[read - 1]) {
                nums[write++] = nums[read];
            }
        }
        return write;
    }
};`,
          java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int write = 1;
        for (int read = 1; read < nums.length; read++) {
            if (nums[read] != nums[read - 1]) {
                nums[write++] = nums[read];
            }
        }
        return write;
    }
}`,
          python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0
        write = 1
        for read in range(1, len(nums)):
            if nums[read] != nums[read - 1]:
                nums[write] = nums[read]
                write += 1
        return write`,
          javascript: `var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    let write = 1;
    for (let read = 1; read < nums.length; read++) {
        if (nums[read] !== nums[read - 1]) {
            nums[write++] = nums[read];
        }
    }
    return write;
};`,
        },
      },
      {
        id: "top150-2",
        number: "02",
        title: "Majority Element",
        difficulty: "Easy",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Boyer-Moore Voting Algorithm: maintain count and candidate.",
        leetcodeUrl: "https://leetcode.com/problems/majority-element/",
        youtubeId: "7pnhv842keE",
        solutions: {
          cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = nums[0], count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
};`,
          java: `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0], count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`,
          python: `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate, count = None, 0
        for num in nums:
            if count == 0:
                candidate = num
            count += 1 if num == candidate else -1
        return candidate`,
          javascript: `var majorityElement = function(nums) {
    let candidate = nums[0], count = 0;
    for (let num of nums) {
        if (count === 0) candidate = num;
        count += (num === candidate) ? 1 : -1;
    }
    return candidate;
};`,
        },
      },
      {
        id: "top150-3",
        number: "03",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        category: "Array / String",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Track minimum buying price seen so far and calculate max difference.",
        leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        youtubeId: "1pkOgXD63yU",
        solutions: {
          cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int p : prices) {
            minPrice = min(minPrice, p);
            maxProfit = max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
};`,
          java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int p : prices) {
            minPrice = Math.min(minPrice, p);
            maxProfit = Math.max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
}`,
          python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_p = float('inf')
        max_profit = 0
        for p in prices:
            min_p = min(min_p, p)
            max_profit = max(max_profit, p - min_p)
        return max_profit`,
          javascript: `var maxProfit = function(prices) {
    let minPrice = Infinity, maxProfit = 0;
    for (let p of prices) {
        minPrice = Math.min(minPrice, p);
        maxProfit = Math.max(maxProfit, p - minPrice);
    }
    return maxProfit;
};`,
        },
      },
      {
        id: "top150-4",
        number: "04",
        title: "Two Sum",
        difficulty: "Easy",
        category: "Hashmap",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(n)" },
        hint: "Store seen numbers and their indices in a hash map to look up target - num.",
        leetcodeUrl: "https://leetcode.com/problems/two-sum/",
        youtubeId: "KLlXCFG5TnA",
        solutions: {
          cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (mp.count(complement)) return {mp[complement], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
          java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) return new int[]{map.get(complement), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
          python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in seen:
                return [seen[diff], i]
            seen[n] = i`,
          javascript: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
    return [];
};`,
        },
      },
      {
        id: "top150-5",
        number: "05",
        title: "Valid Parentheses",
        difficulty: "Easy",
        category: "Stack",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(n)" },
        hint: "Push expected closing brackets onto stack and pop to match.",
        leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
        youtubeId: "WTzjTskDFMg",
        solutions: {
          cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else if (st.empty() || st.top() != c) return false;
            else st.pop();
        }
        return st.empty();
    }
};`,
          java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
          python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack`,
          javascript: `var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
        if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
};`,
        },
      },
    ],
  },
  {
    id: "strivers-a-z",
    title: "Strivers A-Z DSA Sheet",
    badge: "Zero to Hero",
    problemCount: 455,
    animatedCount: 455,
    description:
      "Raj Vikramaditya's (Striver) master structured curriculum from absolute basics to advanced data structures and dynamic programming.",
    topics: [
      "All Topics",
      "Step 1: Basics",
      "Step 2: Sorting",
      "Step 3: Arrays",
      "Step 4: Binary Search",
      "Step 5: Strings",
      "Step 6: LinkedList",
      "Step 7: Recursion",
      "Step 8: Bit Manipulation",
      "Step 9: Stack & Queues",
      "Step 13: Binary Trees",
      "Step 14: BST",
      "Step 15: Graphs",
      "Step 16: DP",
    ],
    problems: [
      {
        id: "striver-1",
        number: "01",
        title: "Find the Largest Element in an Array",
        difficulty: "Easy",
        category: "Step 3: Arrays",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Initialize max with first element, traverse the array and update max.",
        leetcodeUrl: "https://leetcode.com/problems/largest-number-at-least-twice-of-others/",
        youtubeId: "37E9ckMDdTk",
        solutions: {
          cpp: `class Solution {
public:
    int largestElement(vector<int>& arr) {
        int maxVal = arr[0];
        for (int i = 1; i < arr.size(); i++) {
            if (arr[i] > maxVal) maxVal = arr[i];
        }
        return maxVal;
    }
};`,
          java: `class Solution {
    public int largestElement(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }
}`,
          python: `class Solution:
    def largestElement(self, arr: List[int]) -> int:
        max_val = arr[0]
        for num in arr[1:]:
            if num > max_val:
                max_val = num
        return max_val`,
          javascript: `function largestElement(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}`,
        },
      },
      {
        id: "striver-2",
        number: "02",
        title: "Check if the Array is Sorted and Rotated",
        difficulty: "Easy",
        category: "Step 3: Arrays",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Count count of inversions (nums[i] > nums[i+1]); at most 1 drop is allowed.",
        leetcodeUrl: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
        youtubeId: "Y8Zg8jS0F_4",
        solutions: {
          cpp: `class Solution {
public:
    bool check(vector<int>& nums) {
        int drops = 0, n = nums.size();
        for (int i = 0; i < n; i++) {
            if (nums[i] > nums[(i + 1) % n]) drops++;
        }
        return drops <= 1;
    }
};`,
          java: `class Solution {
    public boolean check(int[] nums) {
        int count = 0, n = nums.length;
        for (int i = 0; i < n; i++) {
            if (nums[i] > nums[(i + 1) % n]) count++;
        }
        return count <= 1;
    }
}`,
          python: `class Solution:
    def check(self, nums: List[int]) -> bool:
        drops = 0
        n = len(nums)
        for i in range(n):
            if nums[i] > nums[(i + 1) % n]:
                drops += 1
        return drops <= 1`,
          javascript: `var check = function(nums) {
    let drops = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if (nums[i] > nums[(i + 1) % n]) drops++;
    }
    return drops <= 1;
};`,
        },
      },
      {
        id: "striver-3",
        number: "03",
        title: "Kadane's Algorithm: Maximum Subarray Sum",
        difficulty: "Medium",
        category: "Step 3: Arrays",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Keep running sum. Reset sum to 0 if it becomes negative.",
        leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
        youtubeId: "AHZpyQ8496E",
        solutions: {
          cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = INT_MIN, curSum = 0;
        for (int x : nums) {
            curSum += x;
            maxSum = max(maxSum, curSum);
            if (curSum < 0) curSum = 0;
        }
        return maxSum;
    }
};`,
          java: `class Solution {
    public int maxSubArray(int[] nums) {
        int max = Integer.MIN_VALUE, cur = 0;
        for (int x : nums) {
            cur += x;
            max = Math.max(max, cur);
            if (cur < 0) cur = 0;
        }
        return max;
    }
}`,
          python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = -float('inf')
        cur_sum = 0
        for x in nums:
            cur_sum += x
            max_sum = max(max_sum, cur_sum)
            if cur_sum < 0:
                cur_sum = 0
        return max_sum`,
          javascript: `var maxSubArray = function(nums) {
    let max = -Infinity, cur = 0;
    for (let x of nums) {
        cur += x;
        max = Math.max(max, cur);
        if (cur < 0) cur = 0;
    }
    return max;
};`,
        },
      },
      {
        id: "striver-4",
        number: "04",
        title: "Sort an Array of 0s, 1s and 2s (Dutch National Flag)",
        difficulty: "Medium",
        category: "Step 3: Arrays",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Three pointers: low, mid, and high to partition 0s, 1s, and 2s in one pass.",
        leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
        youtubeId: "tp8JIuCXBaU",
        solutions: {
          cpp: `class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
            else if (nums[mid] == 1) mid++;
            else swap(nums[mid], nums[high--]);
        }
    }
};`,
          java: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low++] = nums[mid];
                nums[mid++] = temp;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[high];
                nums[high--] = nums[mid];
                nums[mid] = temp;
            }
        }
    }
}`,
          python: `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1`,
          javascript: `var sortColors = function(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
};`,
        },
      },
    ],
  },
  {
    id: "neetcode-dsa",
    title: "NeetCode DSA Sheet",
    badge: "Pattern Based",
    problemCount: 150,
    animatedCount: 150,
    description:
      "Curated by NeetCode: the essential 150 problems organized cleanly by patterns with dedicated video walkthroughs.",
    topics: [
      "All Topics",
      "Arrays & Hashing",
      "Two Pointers",
      "Sliding Window",
      "Stack",
      "Binary Search",
      "Linked List",
      "Trees",
      "Tries",
      "Heap / Priority Queue",
      "Backtracking",
      "Graphs",
      "1-D DP",
      "2-D DP",
      "Greedy",
      "Intervals",
    ],
    problems: [
      {
        id: "neet-1",
        number: "01",
        title: "Contains Duplicate",
        difficulty: "Easy",
        category: "Arrays & Hashing",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(n)" },
        hint: "Insert into a hash set; if already present, duplicate found.",
        leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/",
        youtubeId: "3OamzN90kPg",
        solutions: {
          cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`,
          java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }
}`,
          python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(nums) != len(set(nums))`,
          javascript: `var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};`,
        },
      },
      {
        id: "neet-2",
        number: "02",
        title: "Valid Anagram",
        difficulty: "Easy",
        category: "Arrays & Hashing",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(1)" },
        hint: "Frequency count array of 26 characters for lowercase English letters.",
        leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
        youtubeId: "9UtInBqnCgA",
        solutions: {
          cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        vector<int> count(26, 0);
        for (int i = 0; i < s.size(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
};`,
          java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
}`,
          python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        from collections import Counter
        return Counter(s) == Counter(t)`,
          javascript: `var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(c => c === 0);
};`,
        },
      },
      {
        id: "neet-3",
        number: "03",
        title: "Group Anagrams",
        difficulty: "Medium",
        category: "Arrays & Hashing",
        hasVideo: true,
        complexity: { time: "O(n * k log k)", space: "O(n * k)" },
        hint: "Sort each string to use as hash map key, group matching anagrams.",
        leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
        youtubeId: "vzdNOK2oB2E",
        solutions: {
          cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            mp[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& p : mp) res.push_back(p.second);
        return res;
    }
};`,
          java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] ca = s.toCharArray();
            Arrays.sort(ca);
            String key = String.valueOf(ca);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
          python: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        from collections import defaultdict
        res = defaultdict(list)
        for s in strs:
            key = "".join(sorted(s))
            res[key].append(s)
        return list(res.values())`,
          javascript: `var groupAnagrams = function(strs) {
    const map = new Map();
    for (let s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return Array.from(map.values());
};`,
        },
      },
      {
        id: "neet-4",
        number: "04",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        category: "Arrays & Hashing",
        hasVideo: true,
        complexity: { time: "O(n)", space: "O(n)" },
        hint: "Put in hash set. Only begin counting sequence length from num if num - 1 is NOT in set.",
        leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/",
        youtubeId: "P6RZZMu_maU",
        solutions: {
          cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;
        for (int n : numSet) {
            if (!numSet.count(n - 1)) {
                int length = 1;
                while (numSet.count(n + length)) length++;
                longest = max(longest, length);
            }
        }
        return longest;
    }
};`,
          java: `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        int longest = 0;
        for (int n : set) {
            if (!set.contains(n - 1)) {
                int length = 1;
                while (set.contains(n + length)) length++;
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
}`,
          python: `class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0
        for n in num_set:
            if n - 1 not in num_set:
                length = 1
                while n + length in num_set:
                    length += 1
                longest = max(longest, length)
        return longest`,
          javascript: `var longestConsecutive = function(nums) {
    const numSet = new Set(nums);
    let longest = 0;
    for (let n of numSet) {
        if (!numSet.has(n - 1)) {
            let length = 1;
            while (numSet.has(n + length)) length++;
            longest = Math.max(longest, length);
        }
    }
    return longest;
};`,
        },
      },
    ],
  },
];
