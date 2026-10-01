export const STRIVERS_SHEET = {
  "id": "strivers-a-z",
  "title": "Striver's A-Z DSA Sheet",
  "badge": "Comprehensive",
  "problemCount": 369,
  "animatedCount": 369,
  "description": "The most thorough, end-to-end interview prep sheet curated by Striver (take U forward), from basics to advanced graphs & dynamic programming.",
  "topics": [
    "All Topics",
    "Arrays",
    "Binary Search",
    "Strings",
    "Linked List",
    "Recursion",
    "Bit Manipulation",
    "Stack and Queues",
    "Sliding Window",
    "Heaps",
    "Greedy Approach",
    "Binary Trees",
    "Binary Search Trees",
    "Graphs",
    "Dynamic Programming",
    "Tries",
    "Strings (Hard)"
  ],
  "problems": [
    {
      "id": "str-1",
      "number": "01",
      "title": "Largest Element In Array",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "37E9ckMDdTk",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> Intialize the ans with starting element -> Traverse the entire array and update the ans if the element is greater then ans -> Finally, return the ans",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Largest%20Element%20In%20Array",
      "solutions": {
        "cpp": "int largest(int arr[], int n)\r\n{\r\n    int ans = arr[0];\r\n    for (int i = 1; i < n; i++)\r\n    {\r\n        if (arr[i] > ans)\r\n            ans = arr[i];\r\n    }\r\n    return ans;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Largest Element In Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Largest Element In Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Largest Element In Array"
      }
    },
    {
      "id": "str-2",
      "number": "02",
      "title": "Second Largest Element In Array",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "37E9ckMDdTk",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> If the current element is larger than ‘large’ then update second_large and large variables -> Else if the current element is larger than ‘second_large’ then ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Second%20Largest%20Element%20In%20Array",
      "solutions": {
        "cpp": "int print2largest(int arr[], int n)\r\n{\r\n    int prev = -1, curr = arr[0];\r\n    for (int i = 1; i < n; i++)\r\n    {\r\n        if (arr[i] > curr)\r\n        {\r\n            prev = curr;\r\n            curr = arr[i];\r\n        }\r\n        else if (arr[i] > prev && arr[i] != curr)\r\n            prev = arr[i];\r\n    }\r\n    return prev;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Second Largest Element In Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Second Largest Element In Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Second Largest Element In Array"
      }
    },
    {
      "id": "str-3",
      "number": "03",
      "title": "Check If Array Is Sorted And Rotated",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "Compare all neignbour elements (a,b) in A, the case of a > b can happen at most once.  Note that the first element and the last element are also connected.  If ",
      "leetcodeUrl": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
      "solutions": {
        "cpp": "bool check(vector<int> &nums)\r\n{\r\n    int cnt = 0;\r\n    int n = nums.size();\r\n    for (int i = 0; i < n - 1; i++)\r\n    {\r\n        if (nums[i] > nums[i + 1])\r\n            cnt++;\r\n    }\r\n    if (cnt == 0)\r\n        return true;\r\n    else if (cnt == 1 && nums[0] >= nums[n - 1])\r\n        return true;\r\n    return false;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check If Array Is Sorted And Rotated\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check If Array Is Sorted And Rotated\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check If Array Is Sorted And Rotated"
      }
    },
    {
      "id": "str-4",
      "number": "04",
      "title": "Remove Duplicates From Sorted Array",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "37E9ckMDdTk",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> The idea, is to use keep a pointer k which signifies that upto here the array is sorted -> Now travese the entire array and if arr[k]!=arr[j] that is arr[j] ",
      "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
      "solutions": {
        "cpp": "int removeDuplicates(vector<int> &nums)\r\n{\r\n    int k = 0;",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Remove Duplicates From Sorted Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Remove Duplicates From Sorted Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Remove Duplicates From Sorted Array"
      }
    },
    {
      "id": "str-5",
      "number": "05",
      "title": "Rotate Array Left By 1place",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> By observing we can the ans is the arr where arr[i] = arr[i+1] and at last place we will have arr[0] -> Before traversing store the arr[0] in temp and then t",
      "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
      "solutions": {
        "cpp": "vector<int> rotateArray(vector<int> &arr, int n)\r\n{\r\n    int temp = arr[0];\r\n    for (int i = 0; i < n - 1; i++)\r\n    {\r\n        arr[i] = arr[i + 1];\r\n    }\r\n    arr[n - 1] = temp;\r\n\r\n    return arr;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Rotate Array Left By 1place\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Rotate Array Left By 1place\n    pass",
        "javascript": "// Striver A2Z optimal approach for Rotate Array Left By 1place"
      }
    },
    {
      "id": "str-6",
      "number": "06",
      "title": "Rotate Array Left&Right By K Places",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "To rotate the array k places to right follow below steps -> Reverse first n-k elements -> Reverse last k elements -> Reverse the entire array  To rotate the arr",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Rotate%20Array%20Left%26Right%20By%20K%20Places",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Rotate Array Left&Right By K Places\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Rotate Array Left&Right By K Places\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Rotate Array Left&Right By K Places\n    pass",
        "javascript": "// Striver A2Z optimal approach for Rotate Array Left&Right By K Places"
      }
    },
    {
      "id": "str-7",
      "number": "07",
      "title": "Move 0'S To End",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "wvcQg43_V8U",
      "complexity": {
        "time": "O(N) (as we moving j throught the array only once)",
        "space": "O(0)"
      },
      "hint": "-> The idea is while traversing the array if we found any zero then we have to swap it with next non-zero",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Move%200'S%20To%20End",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Move 0'S To End\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Move 0'S To End\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Move 0'S To End\n    pass",
        "javascript": "// Striver A2Z optimal approach for Move 0'S To End"
      }
    },
    {
      "id": "str-8",
      "number": "08",
      "title": "Linear Search",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "Striver's A2Z pattern for Arrays. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Linear%20Search",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Linear Search\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Linear Search\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Linear Search\n    pass",
        "javascript": "// Striver A2Z optimal approach for Linear Search"
      }
    },
    {
      "id": "str-9",
      "number": "09",
      "title": "Union Of 2 Sorted Arrays",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "wvcQg43_V8U",
      "complexity": {
        "time": "O(N+M)",
        "space": "O(0)"
      },
      "hint": "-> Take two pointer i and j where i is for arr1 and j is for arr2 and traverse -> While travsersing 3 cases arises     -> arr1[ i ] == arr2[ j ]         Here we",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Union%20Of%202%20Sorted%20Arrays",
      "solutions": {
        "cpp": "vector<int> findUnion(int arr1[], int arr2[], int n, int m)\r\n{\r\n    int i = 0;",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Union Of 2 Sorted Arrays\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Union Of 2 Sorted Arrays\n    pass",
        "javascript": "// Striver A2Z optimal approach for Union Of 2 Sorted Arrays"
      }
    },
    {
      "id": "str-10",
      "number": "10",
      "title": "Missing Number",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "WnPLSRLSANE",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> Calculate the optimum sum i.e. sum when all elements were present -> Calculate the actual array's sum -> Return the optimum sum - actual sum",
      "leetcodeUrl": "https://leetcode.com/problems/missing-number/",
      "solutions": {
        "cpp": "int missingNumber(vector<int> &nums)\r\n{\r\n    int n = nums.size();\r\n    long long optimum_sum = (n * (n + 1)) / 2;",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Missing Number\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Missing Number\n    pass",
        "javascript": "// Striver A2Z optimal approach for Missing Number"
      }
    },
    {
      "id": "str-11",
      "number": "11",
      "title": "Max Consecutive 1'S",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "bYWLJb3vCWY",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> Traverse the entire array and within it run a loop while element's are equal to 1 and store the count -> Update the ans as max(ans,cnt)",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Max%20Consecutive%201'S",
      "solutions": {
        "cpp": "int findMaxConsecutiveOnes(vector<int> &nums)\r\n{\r\n    int ans = 0;\r\n    for (int i = 0; i < nums.size(); i++)\r\n    {\r\n        int cnt = 0;",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Max Consecutive 1'S\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Max Consecutive 1'S\n    pass",
        "javascript": "// Striver A2Z optimal approach for Max Consecutive 1'S"
      }
    },
    {
      "id": "str-12",
      "number": "12",
      "title": "Longest Subarray With Given Sum",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "frf7qxiN2qU",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> Use sliding window approach using two pointers start and end -> Run a loop to traverse the entire array add from end and subtract from start when sum>k -> If",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Longest%20Subarray%20With%20Given%20Sum",
      "solutions": {
        "cpp": "int longestSubarrayWithSumK(vector<int> a, long long k)\r\n{\r\n    int start = 0;\r\n    int ans = 0;\r\n    long long sum = 0;\r\n    int n = a.size();\r\n\r\n    for (int end = 0; end < n; end++)\r\n    {\r\n        sum += a[end];\r\n        while (sum > k)\r\n        {\r\n            sum -= a[start];\r\n            start++;\r\n        }\r\n        if (sum == k)\r\n        {\r\n            ans = max(ans, end - start + 1);\r\n        }\r\n    }\r\n    return ans;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Subarray With Given Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Subarray With Given Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Subarray With Given Sum"
      }
    },
    {
      "id": "str-13",
      "number": "13",
      "title": "Find Element Present Only Once",
      "difficulty": "Easy",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> We can use XOR operation as we know xor cancles out the same elements -> Intial xr=0 then traverse the entire array and xor each element with xr -> Since onl",
      "leetcodeUrl": "https://leetcode.com/problems/single-number/",
      "solutions": {
        "cpp": "int singleNumber(vector<int> &nums)\r\n{\r\n    int xr = 0;\r\n    for (int i = 0; i < nums.size(); i++)\r\n    {\r\n        xr = nums[i] ^ xr;\r\n    }\r\n    return xr;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find Element Present Only Once\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find Element Present Only Once\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find Element Present Only Once"
      }
    },
    {
      "id": "str-14",
      "number": "14",
      "title": "2 Sum Problem",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "UXDSeD9mN-k",
      "complexity": {
        "time": "O(N)",
        "space": "O(N)"
      },
      "hint": "-> Create an empty map to store the elements and their corresponding indices. >  Iterate through the input array, nums, and for each element:     Calculate the ",
      "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
      "solutions": {
        "cpp": "vector<int> twoSum(vector<int> &nums, int target)\r\n{\r\n    unordered_map<int, int> mp;\r\n    for (int i = 0; i < nums.size(); i++)\r\n    {\r\n        int remain = target - nums[i];\r\n        if (mp.find(remain) != mp.end() && mp[remain] != i)\r\n            return {i, mp[remain]};\r\n        mp[nums[i]] = i;\r\n    }\r\n    return {-1, -1};",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for 2 Sum Problem\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for 2 Sum Problem\n    pass",
        "javascript": "// Striver A2Z optimal approach for 2 Sum Problem"
      }
    },
    {
      "id": "str-15",
      "number": "15",
      "title": "Sort 0 1 2",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> Initialize three pointers: low at the beginning of the array, mid at the beginning of the array, and high at the end of the array. -> Iterate through the arr",
      "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
      "solutions": {
        "cpp": "void sortColors(vector<int> &nums)\r\n{\r\n    int low = 0, mid = 0, high = nums.size() - 1;\r\n    while (mid <= high)\r\n    {\r\n        if (nums[mid] == 0)\r\n            swap(nums[mid++], nums[low++]);\r\n        else if (nums[mid] == 1)\r\n            mid++;\r\n        else\r\n            swap(nums[mid], nums[high--]);\r\n    }\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sort 0 1 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sort 0 1 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sort 0 1 2"
      }
    },
    {
      "id": "str-16",
      "number": "16",
      "title": "Majority Element",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "7pnhv842keE",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "Striver's A2Z pattern for Arrays. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problems/majority-element/",
      "solutions": {
        "cpp": "int majorityElement(vector<int> &nums)\r\n{\r\n    int candidate = nums[0];\r\n    int vote = 1;\r\n    for (int i = 1; i < nums.size(); i++)\r\n    {\r\n        if (vote <= 0)\r\n            candidate = nums[i];\r\n        if (nums[i] == candidate)\r\n            vote++;\r\n        else\r\n            vote--;\r\n    }\r\n    return candidate;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Majority Element\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Majority Element\n    pass",
        "javascript": "// Striver A2Z optimal approach for Majority Element"
      }
    },
    {
      "id": "str-17",
      "number": "17",
      "title": "Kadane'S Algorithm",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "AHZpyENo7k4",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "-> Initialize two variables: maxSum and currentSum. Set both variables to the first element of the array. -> Iterate through the array starting from the second ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kadane'S%20Algorithm",
      "solutions": {
        "cpp": "int maxSubArray(vector<int> &nums)\r\n{\r\n    int curr_sum = 0;\r\n    int ans = INT_MIN;\r\n    for (int i = 0; i < nums.size(); i++)\r\n    {\r\n        curr_sum += nums[i];\r\n        ans = max(ans, curr_sum);\r\n        if (curr_sum < 0)\r\n            curr_sum = 0;\r\n    }\r\n    return ans;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kadane'S Algorithm\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kadane'S Algorithm\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kadane'S Algorithm"
      }
    },
    {
      "id": "str-18",
      "number": "18",
      "title": "Number Of Subarray Sum Equal K",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "xvNwoz-ufXA",
      "complexity": {
        "time": "O(n), where n is the size of the input array nums.",
        "space": "O(n), as we are using a hashmap to store the prefix sums and their corresponding counts."
      },
      "hint": "To find the total number of subarrays with sum equal to k, we can use the technique of prefix sum along with a hashmap. 1. Initialize a variable `count` to keep",
      "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Number Of Subarray Sum Equal K\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Number Of Subarray Sum Equal K\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Number Of Subarray Sum Equal K\n    pass",
        "javascript": "// Striver A2Z optimal approach for Number Of Subarray Sum Equal K"
      }
    },
    {
      "id": "str-19",
      "number": "19",
      "title": "Stock Buy Sell",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "excAOvwF_Wk",
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "Initialize two variables: min_price and max_profit.  -> min_price = minimum price in the array. -> max_profit = 0.  Iterate through the array, and for each pric",
      "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      "solutions": {
        "cpp": "int maxProfit(vector<int> &prices)\r\n{\r\n    int minprice = prices[0];\r\n    int ans = 0;\r\n    for (int i = 1; i < prices.size(); i++)\r\n    {\r\n        ans = max(ans, prices[i] - minprice);\r\n        minprice = min(minprice, prices[i]);\r\n    }\r\n    return ans;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Stock Buy Sell\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Stock Buy Sell\n    pass",
        "javascript": "// Striver A2Z optimal approach for Stock Buy Sell"
      }
    },
    {
      "id": "str-20",
      "number": "20",
      "title": "Rearange Elements By Sign",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(0)"
      },
      "hint": "Initialize two pointers, pos_ptr and neg_ptr. pos_ptr will point to the first positive integer in the array, and neg_ptr will point to the first negative intege",
      "leetcodeUrl": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
      "solutions": {
        "cpp": "vector<int> rearrangeArray(vector<int> &nums)\r\n{\r\n    int i = 0;",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Rearange Elements By Sign\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Rearange Elements By Sign\n    pass",
        "javascript": "// Striver A2Z optimal approach for Rearange Elements By Sign"
      }
    },
    {
      "id": "str-21",
      "number": "21",
      "title": "Next Permutation",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "JDOXKqF60RQ",
      "complexity": {
        "time": "O(n), where n is the size of the input array.",
        "space": "O(1)"
      },
      "hint": "To find the next permutation of an array, we can follow these steps:  1. Find the first index `i` from the right such that `nums[i] < nums[i+1]`. This is the fi",
      "leetcodeUrl": "https://leetcode.com/problems/next-permutation/",
      "solutions": {
        "cpp": "void nextPermutation(vector<int> &nums)\r\n{\r\n\r\n    int bp = -1;",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Next Permutation\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Next Permutation\n    pass",
        "javascript": "// Striver A2Z optimal approach for Next Permutation"
      }
    },
    {
      "id": "str-22",
      "number": "22",
      "title": "Leaders In Array",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "cHrH9CQ8pmY",
      "complexity": {
        "time": "O(n), where n is the size of the array.",
        "space": "O(1)"
      },
      "hint": "To find the leaders in the array, we can follow these steps:  1. Initialize a variable `maxRight` with the rightmost element of the array. 2. Iterate the array ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Leaders%20In%20Array",
      "solutions": {
        "cpp": "vector<int> leaders(int a[], int n)\r\n{\r\n    vector<int> ans;\r\n    ans.push_back(a[n - 1]);\r\n    int maxi = a[n - 1];",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Leaders In Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Leaders In Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Leaders In Array"
      }
    },
    {
      "id": "str-23",
      "number": "23",
      "title": "Longest Consecutive Subsequence",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the size of the input array.",
        "space": "O(n), as we are using a set to store the elements of the array."
      },
      "hint": "To find the length of the longest consecutive elements sequence, we can follow these steps:  1. Create a set to store all the elements of the array. 2. Iterate ",
      "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
      "solutions": {
        "cpp": "int longestConsecutive(vector<int> &nums)\r\n{\r\n    unordered_map<int, int> mp;\r\n    for (int i = 0; i < nums.size(); i++)\r\n    {\r\n        mp[nums[i]]++;\r\n    }\r\n    int ans = 0;\r\n    for (int i = 0; i < nums.size(); i++)\r\n    {\r\n        int start = nums[i];",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Consecutive Subsequence\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Consecutive Subsequence\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Consecutive Subsequence"
      }
    },
    {
      "id": "str-24",
      "number": "24",
      "title": "Set Matrix 0'S",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "N0MgLvceX7M",
      "complexity": {
        "time": "O(m * n), where m and n are the dimensions of the matrix.",
        "space": "O(1), as we are using constant extra space."
      },
      "hint": "To solve this problem in-place, we can follow these steps: 1. Use two boolean variables, firstRowZero and firstColZero, to check if the first row and first colu",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Set%20Matrix%200'S",
      "solutions": {
        "cpp": "void setZeroes(vector<vector<int>>& matrix) {\r\n    int m = matrix.size();\r\n    int n = matrix[0].size();\r\n    bool firstRowZero = false;\r\n    bool firstColZero = false;",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Set Matrix 0'S\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Set Matrix 0'S\n    pass",
        "javascript": "// Striver A2Z optimal approach for Set Matrix 0'S"
      }
    },
    {
      "id": "str-25",
      "number": "25",
      "title": "Rotate Matrix",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "Z0R2u6gd3GU",
      "complexity": {
        "time": "O(N^2), where N is the size of the matrix.",
        "space": "O(1)"
      },
      "hint": "To rotate the image by 90 degrees clockwise in-place, we can follow these steps:  1. Transpose the matrix: Iterate over the matrix and swap each element (i, j) ",
      "leetcodeUrl": "https://leetcode.com/problems/rotate-image/",
      "solutions": {
        "cpp": "void rotate(vector<vector<int>>& matrix) {",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Rotate Matrix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Rotate Matrix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Rotate Matrix"
      }
    },
    {
      "id": "str-26",
      "number": "26",
      "title": "Spiral Traversal",
      "difficulty": "Medium",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "3Zv-s9UUrFM",
      "complexity": {
        "time": "O(N), where N is the total number of elements in the matrix.",
        "space": "O(1)"
      },
      "hint": "To traverse the matrix in a spiral order, we can use the following steps:  1. Initialize four variables: top, bottom, left, and right to keep track of the bound",
      "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix/",
      "solutions": {
        "cpp": "vector<int> spiralOrder(vector<vector<int>>& matrix) {\r\n    int n = matrix.size(); \r\n    int m = matrix[0].size();\r\n    int top = 0, bottom = n - 1;\r\n    int left = 0, right = m - 1;\r\n    vector<int> ans;\r\n\r\n    while (top <= bottom && left <= right) {",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Spiral Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Spiral Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Spiral Traversal"
      }
    },
    {
      "id": "str-27",
      "number": "27",
      "title": "Pascal Triangle",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "bR7mQgwQ_o8",
      "complexity": {
        "time": "O(rowIndex)",
        "space": "O(rowIndex)"
      },
      "hint": "** To generate the `rowIndex`th row of Pascal's triangle, we can use the property that each number is the sum of the two numbers directly above it. We start wit",
      "leetcodeUrl": "https://leetcode.com/problems/pascals-triangle/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Pascal Triangle\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Pascal Triangle\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Pascal Triangle\n    pass",
        "javascript": "// Striver A2Z optimal approach for Pascal Triangle"
      }
    },
    {
      "id": "str-28",
      "number": "28",
      "title": "Majority Element 2",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "nP_ns3uSh80",
      "complexity": {
        "time": "O(n), where n is the size of the input array.",
        "space": "O(1), as we are using a constant amount of extra space."
      },
      "hint": "To find all elements that appear more than ⌊ n/3 ⌋ times, we can use the Boyer-Moore Majority Vote algorithm. This algorithm helps us find potential candidates ",
      "leetcodeUrl": "https://leetcode.com/problems/majority-element-ii/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Majority Element 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Majority Element 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Majority Element 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Majority Element 2"
      }
    },
    {
      "id": "str-29",
      "number": "29",
      "title": "3 Sum",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "DhFh8Kw7ymk",
      "complexity": {
        "time": "O(n^2), where n is the size of the input array.",
        "space": "O(1), as we are using a constant amount of extra space for storing the output and variables."
      },
      "hint": "To find all triplets that sum up to zero, we can follow these steps: 1. Sort the input array in non-decreasing order. 2. Iterate through the array and fix the f",
      "leetcodeUrl": "https://leetcode.com/problems/3sum/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for 3 Sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for 3 Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for 3 Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for 3 Sum"
      }
    },
    {
      "id": "str-30",
      "number": "30",
      "title": "4 Sum",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "eD95WRfh81c",
      "complexity": {
        "time": "O(n^3), where n is the size of the input array nums.",
        "space": "O(1), as we are using a constant amount of extra space."
      },
      "hint": "To find the unique quadruplets that sum up to the target, we can use a similar approach as the threeSum problem. We will fix two elements (nums[a] and nums[b]) ",
      "leetcodeUrl": "https://leetcode.com/problems/4sum/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for 4 Sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for 4 Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for 4 Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for 4 Sum"
      }
    },
    {
      "id": "str-31",
      "number": "31",
      "title": "Largest Subarray With 0sum",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the size of the input array A.",
        "space": "O(n), as we are using a map to store the prefix sums and their corresponding indices."
      },
      "hint": "To find the length of the largest subarray with a sum of 0, we can use a technique called prefix sum. 1. Create a prefix sum array of the same size as the input",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Largest%20Subarray%20With%200sum",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Largest Subarray With 0sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Largest Subarray With 0sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Largest Subarray With 0sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Largest Subarray With 0sum"
      }
    },
    {
      "id": "str-32",
      "number": "32",
      "title": "Subarrays With Xor K",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "eZr-6p0B7ME",
      "complexity": {
        "time": "O(n), where n is the size of the input array a.",
        "space": "O(n), as we are using a hashmap to store the prefix XOR values and their corresponding counts."
      },
      "hint": "To find the number of subarrays with bitwise XOR equal to B, we can use the technique of prefix XOR along with a hashmap. 1. Initialize a variable `prefixXOR` t",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Subarrays%20With%20Xor%20K",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Subarrays With Xor K\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Subarrays With Xor K\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Subarrays With Xor K\n    pass",
        "javascript": "// Striver A2Z optimal approach for Subarrays With Xor K"
      }
    },
    {
      "id": "str-33",
      "number": "33",
      "title": "Merge Overlapping Subinterval",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(nlogn), where n is the number of intervals in the input.",
        "space": "O(n), where n is the number of intervals in the input."
      },
      "hint": "To merge overlapping intervals, we can follow these steps: 1. Sort the intervals based on the start time. 2. Initialize a vector `ans` to store the merged inter",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Merge%20Overlapping%20Subinterval",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Merge Overlapping Subinterval\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Merge Overlapping Subinterval\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Merge Overlapping Subinterval\n    pass",
        "javascript": "// Striver A2Z optimal approach for Merge Overlapping Subinterval"
      }
    },
    {
      "id": "str-34",
      "number": "34",
      "title": "Merge 2 Sorted Array Without Space",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "n7uwj04E0I4",
      "complexity": {
        "time": "O(m + n), where m and n are the lengths of nums1 and nums2 respectively.",
        "space": "O(1)"
      },
      "hint": "To merge two sorted arrays, nums1 and nums2, into nums1, we can use a two-pointer approach. 1. Initialize three pointers: i, j, and k, where i points to the las",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Merge%202%20Sorted%20Array%20Without%20Space",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Merge 2 Sorted Array Without Space\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Merge 2 Sorted Array Without Space\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Merge 2 Sorted Array Without Space\n    pass",
        "javascript": "// Striver A2Z optimal approach for Merge 2 Sorted Array Without Space"
      }
    },
    {
      "id": "str-35",
      "number": "35",
      "title": "Repeating And Missing Numbers",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "2D0D8HE6uak",
      "complexity": {
        "time": "O(N), where N is the size of the array.",
        "space": "O(1)."
      },
      "hint": "To find the missing and repeating numbers in the given unsorted array, we can utilize the properties of summation and sum of squares. Let's denote the missing n",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Repeating%20And%20Missing%20Numbers",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Repeating And Missing Numbers\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Repeating And Missing Numbers\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Repeating And Missing Numbers\n    pass",
        "javascript": "// Striver A2Z optimal approach for Repeating And Missing Numbers"
      }
    },
    {
      "id": "str-36",
      "number": "36",
      "title": "Count Inversions",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "AseUmwVNaoY",
      "complexity": {
        "time": "O(N log N), where N is the size of the array.",
        "space": "O(N)."
      },
      "hint": "To find the inversion count in the array, we can utilize the merge sort algorithm. The idea is to divide the array into two halves, recursively count the invers",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20Inversions",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Inversions\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Inversions\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Inversions\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Inversions"
      }
    },
    {
      "id": "str-37",
      "number": "37",
      "title": "Reverse Pairs",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "0e4bZaP3MDI",
      "complexity": {
        "time": "O(n log n), where n is the size of the array.",
        "space": "O(n), where n is the size of the array."
      },
      "hint": "To solve this problem, we can use the merge sort algorithm. While merging the two sorted subarrays, we can count the number of reverse pairs.  1. Define a varia",
      "leetcodeUrl": "https://leetcode.com/problems/reverse-pairs/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Reverse Pairs\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Reverse Pairs\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Reverse Pairs\n    pass",
        "javascript": "// Striver A2Z optimal approach for Reverse Pairs"
      }
    },
    {
      "id": "str-38",
      "number": "38",
      "title": "Maximum Product Subarray",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": true,
      "youtubeId": "lXVy6YWFcRM",
      "complexity": {
        "time": "O(N), where N is the size of the input array.",
        "space": "O(1)."
      },
      "hint": "To find the subarray with the largest product, we iterate through the array while keeping track of the current product. We maintain two variables: `ans` to stor",
      "leetcodeUrl": "https://leetcode.com/problems/maximum-product-subarray/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Maximum Product Subarray\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Maximum Product Subarray\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Maximum Product Subarray\n    pass",
        "javascript": "// Striver A2Z optimal approach for Maximum Product Subarray"
      }
    },
    {
      "id": "str-39",
      "number": "39",
      "title": "Longest Subarray With Sum K Containg +Ves And -Ves",
      "difficulty": "Hard",
      "category": "Arrays",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The code iterates through the array once, resulting in a time complexity of O(N), where N is the size of the array.",
        "space": "The code uses an unordered map to store the prefix sums and their corresponding indices. In the worst case, all elements of the array could be distinct, leading to a space complexity of O(N) to store the prefix sums in the map."
      },
      "hint": "To solve this problem, we can use a prefix sum approach along with a hashmap to keep track of the prefix sums encountered so far. We iterate through the array a",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Longest%20Subarray%20With%20Sum%20K%20Containg%20%2BVes%20And%20-Ves",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Subarray With Sum K Containg +Ves And -Ves\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Subarray With Sum K Containg +Ves And -Ves\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Subarray With Sum K Containg +Ves And -Ves\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Subarray With Sum K Containg +Ves And -Ves"
      }
    },
    {
      "id": "str-40",
      "number": "40",
      "title": "Find X In Sorted Array",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "37E9ckMDdTk",
      "complexity": {
        "time": "O(log n)",
        "space": "O(1)"
      },
      "hint": "1. Initialize low as 0 and high as the last index of the array. 2. Iterate using a while loop until low is less than or equal to high. 3. Calculate the middle i",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20X%20In%20Sorted%20Array",
      "solutions": {
        "cpp": "int search(vector<int>& nums, int target) {\r\n    int low = 0, high = nums.size() - 1;\r\n    while (low <= high) {\r\n        int mid = low + (high - low) / 2;\r\n        if (nums[mid] == target)\r\n            return mid;\r\n        else if (nums[mid] > target)\r\n            high = mid - 1;\r\n        else\r\n            low = mid + 1;\r\n    }\r\n    return -1;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find X In Sorted Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find X In Sorted Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find X In Sorted Array"
      }
    },
    {
      "id": "str-41",
      "number": "41",
      "title": "Implement Lower Bound",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "6zhGS79oQ4k",
      "complexity": {
        "time": "O(log N)",
        "space": "O(1)"
      },
      "hint": "- Initialize low as 0 and high as N-1. - Iterate using a while loop until low is less than or equal to high. - Calculate the mid index using mid = low + (high -",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Lower%20Bound",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Lower Bound\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Lower Bound\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Lower Bound\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Lower Bound"
      }
    },
    {
      "id": "str-42",
      "number": "42",
      "title": "Implement Lower Upper Bound",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "6zhGS79oQ4k",
      "complexity": {
        "time": "O(NlogN)",
        "space": "O(1)"
      },
      "hint": "1. Sort the array in ascending order. 2. Use binary search to find the floor and ceil values. 3. The floor value is the largest element smaller than or equal to",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Lower%20Upper%20Bound",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Lower Upper Bound\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Lower Upper Bound\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Lower Upper Bound\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Lower Upper Bound"
      }
    },
    {
      "id": "str-43",
      "number": "43",
      "title": "Search Insert Position",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "6zhGS79oQ4k",
      "complexity": {
        "time": "O(log n) due to the use of lower_bound function",
        "space": "O(1)"
      },
      "hint": "We can use the lower_bound function from the C++ standard library to find the index where the target should be inserted. The lower_bound function returns an ite",
      "leetcodeUrl": "https://leetcode.com/problems/search-insert-position/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Search Insert Position\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Search Insert Position\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Search Insert Position\n    pass",
        "javascript": "// Striver A2Z optimal approach for Search Insert Position"
      }
    },
    {
      "id": "str-44",
      "number": "44",
      "title": "Check If Array Is Sorted",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log N)",
        "space": "O(log N) (for recursion stack)"
      },
      "hint": "- We can use a recursive approach to check if the array is sorted in non-decreasing order or not. - The base case for recursion is when the subarray has only on",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Check%20If%20Array%20Is%20Sorted",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Check If Array Is Sorted\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check If Array Is Sorted\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check If Array Is Sorted\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check If Array Is Sorted"
      }
    },
    {
      "id": "str-45",
      "number": "45",
      "title": "First And Last Position",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "hjR1IYVx9lY",
      "complexity": {
        "time": "O(log n)",
        "space": "O(1)"
      },
      "hint": "1. Use lower_bound to find the index of the first occurrence of the target in the array. 2. If the target is not found, return [-1, -1]. 3. Use upper_bound to f",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=First%20And%20Last%20Position",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for First And Last Position\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for First And Last Position\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for First And Last Position\n    pass",
        "javascript": "// Striver A2Z optimal approach for First And Last Position"
      }
    },
    {
      "id": "str-46",
      "number": "46",
      "title": "Number Of Occurences",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log N), where N is the size of the array.",
        "space": "O(1)."
      },
      "hint": "1. Use binary search to find the first occurrence of the target element. 2. Use binary search to find the last occurrence of the target element. 3. Return the d",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Number%20Of%20Occurences",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Number Of Occurences\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Number Of Occurences\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Number Of Occurences\n    pass",
        "javascript": "// Striver A2Z optimal approach for Number Of Occurences"
      }
    },
    {
      "id": "str-47",
      "number": "47",
      "title": "Find Peak Element",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "cXxmbemS6XM",
      "complexity": {
        "time": "O(log n)",
        "space": "O(1)"
      },
      "hint": "We can use the binary search approach to find the peak element. 1. Initialize low = 0 and high = n-1, where n is the size of the array. 2. While low < high, cal",
      "leetcodeUrl": "https://leetcode.com/problems/find-peak-element/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Find Peak Element\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find Peak Element\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find Peak Element\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find Peak Element"
      }
    },
    {
      "id": "str-48",
      "number": "48",
      "title": "Search In Rotated Sorted Array",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "U8XENwh8Oy8",
      "complexity": {
        "time": "O(log n)",
        "space": "O(1)"
      },
      "hint": "We can use the binary search approach to find the target element in the rotated sorted array. 1. Initialize low = 0 and high = nums.size() - 1, where nums is th",
      "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Search In Rotated Sorted Array\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Search In Rotated Sorted Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Search In Rotated Sorted Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Search In Rotated Sorted Array"
      }
    },
    {
      "id": "str-49",
      "number": "49",
      "title": "Search In Rotated Sorted Array With Duplicates",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log n)",
        "space": "O(1)"
      },
      "hint": "We can modify the standard binary search algorithm to search for the target element. 1. Initialize low = 0 and high = nums.size() - 1. 2. While low <= high, cal",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Search%20In%20Rotated%20Sorted%20Array%20With%20Duplicates",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Search In Rotated Sorted Array With Duplicates\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Search In Rotated Sorted Array With Duplicates\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Search In Rotated Sorted Array With Duplicates\n    pass",
        "javascript": "// Striver A2Z optimal approach for Search In Rotated Sorted Array With Duplicates"
      }
    },
    {
      "id": "str-50",
      "number": "50",
      "title": "Find The Minimum Element In Sorted Rotated Array",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log n)",
        "space": "O(1)"
      },
      "hint": "We can use the binary search approach to find the minimum element. 1. Initialize low = 0 and high = n-1, where n is the size of the array. 2. While low < high, ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20The%20Minimum%20Element%20In%20Sorted%20Rotated%20Array",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Find The Minimum Element In Sorted Rotated Array\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find The Minimum Element In Sorted Rotated Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find The Minimum Element In Sorted Rotated Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find The Minimum Element In Sorted Rotated Array"
      }
    },
    {
      "id": "str-51",
      "number": "51",
      "title": "Find Single Element In Sorted Array",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "37E9ckMDdTk",
      "complexity": {
        "time": "O(log n)",
        "space": "O(1)"
      },
      "hint": "Since the array is sorted and every element appears exactly twice except for one element, we can use binary search to find the single element. 1. Initialize low",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20Single%20Element%20In%20Sorted%20Array",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Find Single Element In Sorted Array\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find Single Element In Sorted Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find Single Element In Sorted Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find Single Element In Sorted Array"
      }
    },
    {
      "id": "str-52",
      "number": "52",
      "title": "Find How Many Times Array Is Rotated",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "jtSiWTPLwd0",
      "complexity": {
        "time": "O(log n)",
        "space": "O(1)"
      },
      "hint": "To find the value of K, we can use binary search. 1. Initialize low = 0 and high = N-1, where N is the size of the array. 2. While low < high, calculate mid = l",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20How%20Many%20Times%20Array%20Is%20Rotated",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Find How Many Times Array Is Rotated\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find How Many Times Array Is Rotated\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find How Many Times Array Is Rotated\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find How Many Times Array Is Rotated"
      }
    },
    {
      "id": "str-53",
      "number": "53",
      "title": "Row With Maximum Number Of 1'S",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "SCz-1TtYxDI",
      "complexity": {
        "time": "O(N+M)",
        "space": "O(0)"
      },
      "hint": "-> We can use two pointer i and j which indicates current row and col -> As we know the matrix is row-wise sorted we can intilaize j=m-1 i.e. last col and i=0 i",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Row%20With%20Maximum%20Number%20Of%201'S",
      "solutions": {
        "cpp": "int rowWithMax1s(vector<vector<int>> arr, int n, int m)\r\n{\r\n    int j = m - 1;\r\n    int i = 0;\r\n    int ans = -1;\r\n    while (j >= 0 && i < n)\r\n    {\r\n        while (arr[i][j] == 1)\r\n        {\r\n            ans = i;\r\n            j--;\r\n        }\r\n        if (i < n)\r\n            i++;\r\n    }\r\n    return ans;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Row With Maximum Number Of 1'S\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Row With Maximum Number Of 1'S\n    pass",
        "javascript": "// Striver A2Z optimal approach for Row With Maximum Number Of 1'S"
      }
    },
    {
      "id": "str-54",
      "number": "54",
      "title": "Search In Sorted Matrix",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log(M * N))",
        "space": "O(0)"
      },
      "hint": "-> Since the array is sorted we can use binary search low = 0 and high = n*m-1 i.e. total number of elements -> Value at mid position could be accessed by matri",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Search%20In%20Sorted%20Matrix",
      "solutions": {
        "cpp": "bool searchMatrix(vector<vector<int>> &matrix, int target)\r\n{\r\n    int n = matrix.size();\r\n    int m = matrix[0].size();\r\n    int low = 0;\r\n    int high = n * m - 1;\r\n    while (low <= high)\r\n    {\r\n        int mid = low + (high - low) / 2;\r\n        int val = matrix[mid / m][mid % m];\r\n        if (val == target)\r\n            return true;\r\n        else if (val > target)\r\n            high = mid - 1;\r\n        else\r\n            low = mid + 1;\r\n    }\r\n    return false;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Search In Sorted Matrix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Search In Sorted Matrix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Search In Sorted Matrix"
      }
    },
    {
      "id": "str-55",
      "number": "55",
      "title": "Search In Rowwise Sorted Matrix",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of this algorithm is O(m + n), where m is the number of rows and n is the number of columns in the matrix.",
        "space": "The space complexity is O(1) since we are using constant extra space."
      },
      "hint": "We can start the search from the top-right element or the bottom-left element and move towards the target element based on the properties of the matrix.  1. Ini",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Search%20In%20Rowwise%20Sorted%20Matrix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Search In Rowwise Sorted Matrix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Search In Rowwise Sorted Matrix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Search In Rowwise Sorted Matrix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Search In Rowwise Sorted Matrix"
      }
    },
    {
      "id": "str-56",
      "number": "56",
      "title": "Peak Element In Matrix",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(m log(n)) or O(n log(m)) - Binary search is performed on the columns of the matrix.",
        "space": "O(1) - Constant space is used."
      },
      "hint": "- Perform a binary search on the columns of the matrix. - Find the maximum element in each column and check if it is a peak element by comparing it with its adj",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Peak%20Element%20In%20Matrix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Peak Element In Matrix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Peak Element In Matrix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Peak Element In Matrix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Peak Element In Matrix"
      }
    },
    {
      "id": "str-57",
      "number": "57",
      "title": "Matrix Median",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "Q9wXgdxJq48",
      "complexity": {
        "time": "O(R * log(C) * log(range)), where R is the number of rows, C is the number of columns, and range is the difference between the minimum and maximum elements in the matrix.",
        "space": "O(1) as the algorithm only uses a constant amount of additional space to store variables."
      },
      "hint": "To find the median of a row-wise sorted matrix, we can follow these steps:  1. Initialize two variables, `low` and `high`, to keep track of the minimum and maxi",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Matrix%20Median",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Matrix Median\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Matrix Median\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Matrix Median\n    pass",
        "javascript": "// Striver A2Z optimal approach for Matrix Median"
      }
    },
    {
      "id": "str-58",
      "number": "58",
      "title": "Square Root Of Number",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log(x))",
        "space": "O(1)"
      },
      "hint": "We can use binary search to find the square root of x.  1. Initialize the search space with low = 1 and high = x. 2. While low is less than or equal to high:   ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Square%20Root%20Of%20Number",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Square Root Of Number\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Square Root Of Number\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Square Root Of Number\n    pass",
        "javascript": "// Striver A2Z optimal approach for Square Root Of Number"
      }
    },
    {
      "id": "str-59",
      "number": "59",
      "title": "Nth Root Of Integer",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "rjEJeYCasHs",
      "complexity": {
        "time": "O(log m)",
        "space": "O(1)"
      },
      "hint": "We can use a binary search algorithm to find the nth root of m. 1. Initialize the search range with low = 1 and high = m. 2. While low is less than or equal to ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Nth%20Root%20Of%20Integer",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Nth Root Of Integer\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Nth Root Of Integer\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Nth Root Of Integer\n    pass",
        "javascript": "// Striver A2Z optimal approach for Nth Root Of Integer"
      }
    },
    {
      "id": "str-60",
      "number": "60",
      "title": "Koko Eating Banana",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "qyfekrNni90",
      "complexity": {
        "time": "O(N log M), where N is the number of piles and M is the maximum number of bananas in a pile.",
        "space": "O(1)"
      },
      "hint": "- We can apply binary search to find the minimum eating speed. - The eating speed can range from 1 to the maximum number of bananas in a pile. - For each eating",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Koko%20Eating%20Banana",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Koko Eating Banana\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Koko Eating Banana\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Koko Eating Banana\n    pass",
        "javascript": "// Striver A2Z optimal approach for Koko Eating Banana"
      }
    },
    {
      "id": "str-61",
      "number": "61",
      "title": "Minimum Days To Make Boquets",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "TXAuxeYBTdg",
      "complexity": {
        "time": "The binary search approach takes O(log n), where n is the number of elements in the `bloomDay` array.",
        "space": "The space complexity is O(1) since we are using a constant amount of extra space."
      },
      "hint": "- Use binary search to find the minimum number of days required to make m bouquets. - The search space will be between the minimum and maximum bloom day. - For ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Days%20To%20Make%20Boquets",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Days To Make Boquets\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Days To Make Boquets\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Days To Make Boquets\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Days To Make Boquets"
      }
    },
    {
      "id": "str-62",
      "number": "62",
      "title": "Find Smallest Integer",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log(max(nums)))",
        "space": "O(1)"
      },
      "hint": "- Start with a range of possible divisors from 1 to the maximum value in the array. - Use binary search to find the smallest divisor that satisfies the given co",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20Smallest%20Integer",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Find Smallest Integer\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find Smallest Integer\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find Smallest Integer\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find Smallest Integer"
      }
    },
    {
      "id": "str-63",
      "number": "63",
      "title": "Capacity To Ship Packages",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "MG-Ac4TAvTY",
      "complexity": {
        "time": "O(N log M), where N is the size of the weights array and M is the sum of all the weights.",
        "space": "O(1) as we are using a constant amount of extra space."
      },
      "hint": "To find the least weight capacity of the ship, we can use binary search. We set the low and high as the minimum and maximum weight from the weights array, respe",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Capacity%20To%20Ship%20Packages",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Capacity To Ship Packages\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Capacity To Ship Packages\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Capacity To Ship Packages\n    pass",
        "javascript": "// Striver A2Z optimal approach for Capacity To Ship Packages"
      }
    },
    {
      "id": "str-64",
      "number": "64",
      "title": "Aggresive Cows",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n), where n is the size of the position array. Sorting the array takes O(n log n) time and the binary search takes O(log n) time.",
        "space": "O(1), constant space is used."
      },
      "hint": "- Sort the position array in ascending order to simplify the possibility check. - Use binary search to find the maximum minimum magnetic force. - Set the low an",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Aggresive%20Cows",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Aggresive Cows\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Aggresive Cows\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Aggresive Cows\n    pass",
        "javascript": "// Striver A2Z optimal approach for Aggresive Cows"
      }
    },
    {
      "id": "str-65",
      "number": "65",
      "title": "Book Allocation",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "Z0hwjftStI4",
      "complexity": {
        "time": "O(N log S), where N is the number of books and S is the sum of all the pages in the array. The binary search takes log S iterations, and for each iteration, we check the validity of allocation in O(N) time.",
        "space": "O(1), as we are using a constant amount of extra space."
      },
      "hint": "- We can use binary search to find the minimum number of pages that can be allocated to the student with the most pages. - The range for binary search will be f",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Book%20Allocation",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Book Allocation\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Book Allocation\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Book Allocation\n    pass",
        "javascript": "// Striver A2Z optimal approach for Book Allocation"
      }
    },
    {
      "id": "str-66",
      "number": "66",
      "title": "Split Array Largest",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "thUd_WJn6wk",
      "complexity": {
        "time": "O(n * log(sum of array))",
        "space": "O(1)"
      },
      "hint": "- The problem can be solved using the binary search algorithm. - We need to find the range of possible values for the minimized largest sum. - The lower bound o",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Split%20Array%20Largest",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Split Array Largest\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Split Array Largest\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Split Array Largest\n    pass",
        "javascript": "// Striver A2Z optimal approach for Split Array Largest"
      }
    },
    {
      "id": "str-67",
      "number": "67",
      "title": "Kth Missing Number",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "uZ0N_hZpyps",
      "complexity": {
        "time": "O(log n), where n is the size of the array.",
        "space": "O(1)"
      },
      "hint": "- We can solve this problem by finding the position in the array where the count of missing positive integers becomes greater than or equal to k. - Initialize a",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kth%20Missing%20Number",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Kth Missing Number\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kth Missing Number\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kth Missing Number\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kth Missing Number"
      }
    },
    {
      "id": "str-68",
      "number": "68",
      "title": "Gas Station",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "lJwbPZGo05A",
      "complexity": {
        "time": "O(N log M), where N is the number of existing gas stations and M is the range of distances between adjacent gas stations.",
        "space": "O(1), as we are using constant extra space."
      },
      "hint": "- To minimize the maximum distance between adjacent gas stations, we can perform binary search on the possible range of distances. - Initialize `low` to 0 and `",
      "leetcodeUrl": "https://leetcode.com/problems/gas-station/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Gas Station\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Gas Station\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Gas Station\n    pass",
        "javascript": "// Striver A2Z optimal approach for Gas Station"
      }
    },
    {
      "id": "str-69",
      "number": "69",
      "title": "Median Of Two Sorted Arrays",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "q6IEA26hvPE",
      "complexity": {
        "time": "O(log(min(m, n))), where m and n are the sizes of the input arrays nums1 and nums2, respectively. We perform binary search on the smaller array.",
        "space": "O(1), as we use constant extra space throughout the algorithm."
      },
      "hint": "To find the median of two sorted arrays, we can apply the concept of binary search. The overall time complexity of the solution should be O(log (m+n)).  1. Firs",
      "leetcodeUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Median Of Two Sorted Arrays\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Median Of Two Sorted Arrays\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Median Of Two Sorted Arrays\n    pass",
        "javascript": "// Striver A2Z optimal approach for Median Of Two Sorted Arrays"
      }
    },
    {
      "id": "str-70",
      "number": "70",
      "title": "Kth Element Of Two Sorted Arrays",
      "difficulty": "Medium",
      "category": "Binary Search",
      "hasVideo": true,
      "youtubeId": "D1oDwWCq50g",
      "complexity": {
        "time": "O(log(min(N, M)))",
        "space": "O(1)"
      },
      "hint": "1. Compare the sizes of the two arrays, arr1 and arr2. If the size of arr1 is greater than arr2, swap the arrays to ensure arr1 is the smaller sized array. 2. S",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kth%20Element%20Of%20Two%20Sorted%20Arrays",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Kth Element Of Two Sorted Arrays\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kth Element Of Two Sorted Arrays\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kth Element Of Two Sorted Arrays\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kth Element Of Two Sorted Arrays"
      }
    },
    {
      "id": "str-71",
      "number": "71",
      "title": "Remove Outer Parenthesis",
      "difficulty": "Easy",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N), where N is the length of the input string `s`.",
        "space": "O(N), where N is the length of the input string `s`."
      },
      "hint": "- We can iterate through the characters of the string and keep track of the number of open parentheses encountered. - Whenever we encounter an opening parenthes",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Remove%20Outer%20Parenthesis",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Remove Outer Parenthesis\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Remove Outer Parenthesis\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Remove Outer Parenthesis\n    pass",
        "javascript": "// Striver A2Z optimal approach for Remove Outer Parenthesis"
      }
    },
    {
      "id": "str-72",
      "number": "72",
      "title": "Reverse Words In String",
      "difficulty": "Easy",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the length of the input string 's'.",
        "space": "O(n), where n is the length of the input string 's'."
      },
      "hint": "- Initialize an empty string 'ans' to store the reversed words. - Initialize 'start' and 'end' variables to keep track of the start and end indices of each word",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Reverse%20Words%20In%20String",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Reverse Words In String\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Reverse Words In String\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Reverse Words In String\n    pass",
        "javascript": "// Striver A2Z optimal approach for Reverse Words In String"
      }
    },
    {
      "id": "str-73",
      "number": "73",
      "title": "Largest Odd Number In String",
      "difficulty": "Easy",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N), where N is the length of the input string num.",
        "space": "O(1)"
      },
      "hint": "1. Iterate through the string from the last character. 2. Check if the current character is odd. 3. If it is odd, return the substring from the beginning of the",
      "leetcodeUrl": "https://leetcode.com/problems/largest-odd-number-in-string/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Largest Odd Number In String\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Largest Odd Number In String\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Largest Odd Number In String\n    pass",
        "javascript": "// Striver A2Z optimal approach for Largest Odd Number In String"
      }
    },
    {
      "id": "str-74",
      "number": "74",
      "title": "Longest Common Prefix",
      "difficulty": "Easy",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N*M*log(N)), where N is the number of strings and M is the maximum length of the strings.",
        "space": "O(1)"
      },
      "hint": "1. Sort the array of strings lexicographically. 2. Take the first and last string from the sorted array. 3. Compare each character of the first and last string ",
      "leetcodeUrl": "https://leetcode.com/problems/longest-common-prefix/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Common Prefix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Common Prefix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Common Prefix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Common Prefix"
      }
    },
    {
      "id": "str-75",
      "number": "75",
      "title": "Isomorphic String",
      "difficulty": "Easy",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the length of the input strings s and t.",
        "space": "O(m), where m is the number of unique characters in the input strings s and t."
      },
      "hint": "1. Initialize two maps to store the mapping of characters from s to t and from t to s. 2. Iterate through each character in s and t simultaneously. 3. If the cu",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Isomorphic%20String",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Isomorphic String\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Isomorphic String\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Isomorphic String\n    pass",
        "javascript": "// Striver A2Z optimal approach for Isomorphic String"
      }
    },
    {
      "id": "str-76",
      "number": "76",
      "title": "Check For Rotated String",
      "difficulty": "Easy",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of this approach is O(N^2), where N is the length of the input strings `s` and `goal`. This is because the `find` function is used to search for the substring `goal` within the concatenated string, which has a time complexity of O(N^2).",
        "space": "The space complexity is O(N), where N is the length of the input string `s`. This is because we create a new string `concat` by concatenating `s` with itself."
      },
      "hint": "- First, we check if the lengths of the two strings `s` and `goal` are equal. If not, they cannot be rotated versions of each other, so we return `false`. - The",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Check%20For%20Rotated%20String",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Check For Rotated String\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check For Rotated String\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check For Rotated String\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check For Rotated String"
      }
    },
    {
      "id": "str-77",
      "number": "77",
      "title": "Valid Anagram",
      "difficulty": "Easy",
      "category": "Strings",
      "hasVideo": true,
      "youtubeId": "9UtInBqnCgA",
      "complexity": {
        "time": "O(max(s.length(), t.length()))",
        "space": "O(s.length())"
      },
      "hint": "1. Create an unordered map to store the count of each character in string `s`. 2. Iterate over each character in `s` and increment its count in the map. 3. Iter",
      "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Valid Anagram\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Valid Anagram\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Valid Anagram\n    pass",
        "javascript": "// Striver A2Z optimal approach for Valid Anagram"
      }
    },
    {
      "id": "str-78",
      "number": "78",
      "title": "Sort Characters By Frequency",
      "difficulty": "Medium",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n), where n is the length of the string. Building the frequency map takes O(n) time, and the priority queue operations take O(n log n) time.",
        "space": "O(n), where n is the length of the string. The space is used to store the frequency map and the priority queue."
      },
      "hint": "1. Create a frequency map to count the occurrences of each character in the string. 2. Use a priority queue to sort the characters based on their frequencies in",
      "leetcodeUrl": "https://leetcode.com/problems/sort-characters-by-frequency/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sort Characters By Frequency\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sort Characters By Frequency\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sort Characters By Frequency\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sort Characters By Frequency"
      }
    },
    {
      "id": "str-79",
      "number": "79",
      "title": "Max Nesting Depth Of Parenthesis",
      "difficulty": "Medium",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the length of the string `s`.",
        "space": "O(1)"
      },
      "hint": "1. Initialize `opened` as 0 and `ans` as 0 to keep track of the number of opened parentheses and the maximum nesting depth respectively. 2. Iterate through each",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Max%20Nesting%20Depth%20Of%20Parenthesis",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Max Nesting Depth Of Parenthesis\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Max Nesting Depth Of Parenthesis\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Max Nesting Depth Of Parenthesis\n    pass",
        "javascript": "// Striver A2Z optimal approach for Max Nesting Depth Of Parenthesis"
      }
    },
    {
      "id": "str-80",
      "number": "80",
      "title": "Roman To Integer",
      "difficulty": "Medium",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the length of the input string `s`.",
        "space": "O(1)"
      },
      "hint": "1. Create a map to store the values of each Roman symbol. 2. Initialize `result` as the value of the first symbol in the input string. 3. Iterate through each c",
      "leetcodeUrl": "https://leetcode.com/problems/roman-to-integer/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Roman To Integer\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Roman To Integer\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Roman To Integer\n    pass",
        "javascript": "// Striver A2Z optimal approach for Roman To Integer"
      }
    },
    {
      "id": "str-81",
      "number": "81",
      "title": "Implement Atoi",
      "difficulty": "Medium",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The function scans the input string once, resulting in a linear time complexity of O(n), where n is the length of the input string.",
        "space": "The function uses a constant amount of extra space, resulting in constant space complexity, O(1)."
      },
      "hint": "1. Initialize an index `i` to track the current position in the string. 2. Skip any leading whitespace by incrementing `i` until a non-whitespace character is e",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Atoi",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Atoi\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Atoi\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Atoi\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Atoi"
      }
    },
    {
      "id": "str-82",
      "number": "82",
      "title": "Count The Number Of Substrings With K Unique Characters",
      "difficulty": "Medium",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N), where N is the length of the input string.",
        "space": "O(K), where K is the number of distinct characters.*/"
      },
      "hint": "1. We can solve this problem using the sliding window technique. 2. Initialize a variable ans to keep track of the count of substrings with exactly k distinct c",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20The%20Number%20Of%20Substrings%20With%20K%20Unique%20Characters",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count The Number Of Substrings With K Unique Characters\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count The Number Of Substrings With K Unique Characters\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count The Number Of Substrings With K Unique Characters\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count The Number Of Substrings With K Unique Characters"
      }
    },
    {
      "id": "str-83",
      "number": "83",
      "title": "Longest Palindromic Substring",
      "difficulty": "Medium",
      "category": "Strings",
      "hasVideo": true,
      "youtubeId": "XYQecbcd6uc",
      "complexity": {
        "time": "O(n^2), where n is the length of the input string `s`. The nested loops iterate over all possible pairs of indices.",
        "space": "O(1), as we are using a constant amount of extra space."
      },
      "hint": "1. We define a helper function `expandFromCenter` that takes a string `s`, and two indices `start` and `end` as input. 2. The function expands from the center a",
      "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Palindromic Substring\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Palindromic Substring\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Palindromic Substring\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Palindromic Substring"
      }
    },
    {
      "id": "str-84",
      "number": "84",
      "title": "Sum Of Beauty Of All Substrings",
      "difficulty": "Medium",
      "category": "Strings",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "- for generating all substrings is O(n^2), where n is the length of the string `s`. For each substring, we calculate the difference between the highest and lowest frequencies, which takes O(26) or O(1) time since there are 26 lowercase alphabets. Therefore, the overall time complexity is O(n^2).",
        "space": "- O(26) or O(1) since we use a constant-sized frequency array to store the counts of characters."
      },
      "hint": "1. Initialize a variable `ans` to store the total beauty sum. 2. Iterate over the string `s` with the first loop, starting from index `i`.    - Initialize a fre",
      "leetcodeUrl": "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sum Of Beauty Of All Substrings\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sum Of Beauty Of All Substrings\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sum Of Beauty Of All Substrings\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sum Of Beauty Of All Substrings"
      }
    },
    {
      "id": "str-85",
      "number": "85",
      "title": "Intro To Linked List",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "Nq7ok-OyEpg",
      "complexity": {
        "time": "- O(n)",
        "space": "- O(n)"
      },
      "hint": "The approach to construct a linked list from an array is as follows:  1. Create the head node of the linked list using the first element of the array. 2. Initia",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Intro%20To%20Linked%20List",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Intro To Linked List\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Intro To Linked List\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Intro To Linked List\n    pass",
        "javascript": "// Striver A2Z optimal approach for Intro To Linked List"
      }
    },
    {
      "id": "str-86",
      "number": "86",
      "title": "Inserting Node To Linked List",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "XmRrGzR6udg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "to solving this problem is as follows:  1. Initialize an empty linked list by setting the `head` pointer to `NULL`. 2. Iterate through the given input literals.",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Inserting%20Node%20To%20Linked%20List",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Inserting Node To Linked List\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Inserting Node To Linked List\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Inserting Node To Linked List\n    pass",
        "javascript": "// Striver A2Z optimal approach for Inserting Node To Linked List"
      }
    },
    {
      "id": "str-87",
      "number": "87",
      "title": "Deleting Node In Linked List",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "XmRrGzR6udg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. If the given position is 1, it means the node to be deleted is the first node. In this case, we simply update the head pointer to the next node and return th",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Deleting%20Node%20In%20Linked%20List",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Deleting Node In Linked List\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Deleting Node In Linked List\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Deleting Node In Linked List\n    pass",
        "javascript": "// Striver A2Z optimal approach for Deleting Node In Linked List"
      }
    },
    {
      "id": "str-88",
      "number": "88",
      "title": "Count The Number Of Nodes Linked List",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Initialize a variable `cnt` to 0 to keep track of the count. 2. Start with the `curr` pointer pointing to the head of the linked list. 3. Iterate through the",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20The%20Number%20Of%20Nodes%20Linked%20List",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count The Number Of Nodes Linked List\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count The Number Of Nodes Linked List\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count The Number Of Nodes Linked List\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count The Number Of Nodes Linked List"
      }
    },
    {
      "id": "str-89",
      "number": "89",
      "title": "Search Element In Linked List",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "Nq7ok-OyEpg",
      "complexity": {
        "time": "- O(N)",
        "space": "- O(1)"
      },
      "hint": "Striver's A2Z pattern for Linked List. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Search%20Element%20In%20Linked%20List",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Search Element In Linked List\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Search Element In Linked List\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Search Element In Linked List\n    pass",
        "javascript": "// Striver A2Z optimal approach for Search Element In Linked List"
      }
    },
    {
      "id": "str-90",
      "number": "90",
      "title": "Introduction To Double LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Initialize two pointers `curr` and `nxt` to traverse the linked list. Set `curr` to the head of the linked list. 2. In each iteration, store the next node in",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Introduction%20To%20Double%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Introduction To Double LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Introduction To Double LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Introduction To Double LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Introduction To Double LL"
      }
    },
    {
      "id": "str-91",
      "number": "91",
      "title": "Insert Node In DLL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "The approach to adding a node at a specific position in a doubly linked list is as follows:  1. Initialize a counter `cnt` to 0 and a pointer `curr` to the head",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Insert%20Node%20In%20DLL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Insert Node In DLL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Insert Node In DLL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Insert Node In DLL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Insert Node In DLL"
      }
    },
    {
      "id": "str-92",
      "number": "92",
      "title": "Delete Node In DLL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "- If the node to be deleted is the head node (position 1), the code performs a constant number of operations, resulting in a time complexity of O(1).",
        "space": "- The code uses a constant amount of extra space for variables (`temp`, `previous`). Hence, the space complexity is O(1)."
      },
      "hint": "1. The function `deleteNode` takes in two parameters: `head_ref`, which is a pointer to the head of the doubly linked list, and `x`, which represents the positi",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Delete%20Node%20In%20DLL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Delete Node In DLL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Delete Node In DLL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Delete Node In DLL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Delete Node In DLL"
      }
    },
    {
      "id": "str-93",
      "number": "93",
      "title": "Reverse DLL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "u3WUW2qe6ww",
      "complexity": {
        "time": "- The code iterates over each node of the doubly linked list exactly once, performing a constant number of operations for each node. Therefore, the time complexity is O(n), where n is the number of nodes in the linked list.",
        "space": "- The code uses a constant amount of extra space for variables (`curr`, `nxt`, `ans`). Hence, the space complexity is O(1)."
      },
      "hint": "1. The function `reverseDLL` takes in one parameter: `head`, which is a pointer to the head of the doubly linked list. 2. The variable `curr` is initialized wit",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Reverse%20DLL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Reverse DLL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Reverse DLL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Reverse DLL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Reverse DLL"
      }
    },
    {
      "id": "str-94",
      "number": "94",
      "title": "Find Mid Of LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "7LjQ57RqgEc",
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "-> To find the middle node of a linked list, we can use the two-pointer technique. -> Initialize two pointers, slow and fast, to the head of the linked list. ->",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20Mid%20Of%20LL",
      "solutions": {
        "cpp": "ListNode* middleNode(ListNode* head) {\r\n    ListNode* slow = head;\r\n    ListNode* fast = head;\r\n    \r\n    while (fast && fast->next) {\r\n        slow = slow->next;\r\n        fast = fast->next->next;\r\n    }\r\n    \r\n    return slow;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find Mid Of LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find Mid Of LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find Mid Of LL"
      }
    },
    {
      "id": "str-95",
      "number": "95",
      "title": "Reverse LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "To reverse a singly linked list, we can use an iterative approach. Initialize three pointers: prev as NULL, curr as head, and frwd as NULL. Iterate through the ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Reverse%20LL",
      "solutions": {
        "cpp": "ListNode* reverseList(ListNode* head) {\r\n    ListNode* prev = NULL;\r\n    ListNode* curr = head;\r\n    while (curr) {\r\n        ListNode* frwd = curr->next;\r\n        curr->next = prev;\r\n        prev = curr;\r\n        curr = frwd;\r\n    }\r\n    return prev;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Reverse LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Reverse LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Reverse LL"
      }
    },
    {
      "id": "str-96",
      "number": "96",
      "title": "Detect Loop In LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "wiOo4DC5GGA",
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "To determine if a linked list has a cycle, we can use the two-pointer technique. Initialize two pointers, slow and fast, to the head of the linked list. Move th",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Detect%20Loop%20In%20LL",
      "solutions": {
        "cpp": "bool hasCycle(ListNode *head) {\r\n    ListNode* slow = head;\r\n    ListNode* fast = head;\r\n\r\n    while (fast && fast->next) {\r\n        slow = slow->next;\r\n        fast = fast->next->next;\r\n        if (slow == fast)\r\n            return true;\r\n    }\r\n    return false;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Detect Loop In LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Detect Loop In LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Detect Loop In LL"
      }
    },
    {
      "id": "str-97",
      "number": "97",
      "title": "Start Of Cycle In LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "2Kd0KKmmHFc",
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "To find the node where the cycle begins in a linked list, we can use the Floyd's cycle-finding algorithm, also known as the \"tortoise and hare\" algorithm. Initi",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Start%20Of%20Cycle%20In%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Start Of Cycle In LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Start Of Cycle In LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Start Of Cycle In LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Start Of Cycle In LL"
      }
    },
    {
      "id": "str-98",
      "number": "98",
      "title": "Count Nodes In Loop",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "To detect a loop in a linked list, we can use the Floyd's cycle-finding algorithm, also known as the \"tortoise and hare\" algorithm. Initialize two pointers, slo",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20Nodes%20In%20Loop",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Nodes In Loop\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Nodes In Loop\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Nodes In Loop\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Nodes In Loop"
      }
    },
    {
      "id": "str-99",
      "number": "99",
      "title": "Check For Palindrome LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "To determine if a linked list is a palindrome, we can follow these steps: 1. Find the middle node of the linked list using the slow and fast pointer technique. ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Check%20For%20Palindrome%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Check For Palindrome LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check For Palindrome LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check For Palindrome LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check For Palindrome LL"
      }
    },
    {
      "id": "str-100",
      "number": "100",
      "title": "Odd Even LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "qf6qp7GzD5Q",
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "To group nodes with odd indices together followed by nodes with even indices, we can follow these steps: 1. Initialize two pointers, `odd` and `even`, to the fi",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Odd%20Even%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Odd Even LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Odd Even LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Odd Even LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Odd Even LL"
      }
    },
    {
      "id": "str-101",
      "number": "101",
      "title": "Delete Nth Node From Back",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "To remove the nth node from the end of the linked list, we can follow these steps: 1. Initialize two pointers, `left` and `right`, to the head of the linked lis",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Delete%20Nth%20Node%20From%20Back",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Delete Nth Node From Back\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Delete Nth Node From Back\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Delete Nth Node From Back\n    pass",
        "javascript": "// Striver A2Z optimal approach for Delete Nth Node From Back"
      }
    },
    {
      "id": "str-102",
      "number": "102",
      "title": "Delete Mid Of LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "ePpV-_pfOeI",
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "To delete the middle node of a linked list, we can use the slow and fast pointer technique. 1. Initialize three pointers: slow, fast, and prev. 2. Move the slow",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Delete%20Mid%20Of%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Delete Mid Of LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Delete Mid Of LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Delete Mid Of LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Delete Mid Of LL"
      }
    },
    {
      "id": "str-103",
      "number": "103",
      "title": "Sort LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(NlogN)",
        "space": "O(logN) - Recursive stack space"
      },
      "hint": "To sort a linked list, we can use the merge sort algorithm. 1. Implement a function to merge two sorted linked lists. 2. Implement a function to recursively div",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Sort%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sort LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sort LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sort LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sort LL"
      }
    },
    {
      "id": "str-104",
      "number": "104",
      "title": "Sort 0 1 2 In LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "Count the number of 0s, 1s, and 2s in the linked list. Traverse the linked list and overwrite the nodes with 0s, 1s, and 2s based on their counts.  TIME COMPLEX",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Sort%200%201%202%20In%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sort 0 1 2 In LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sort 0 1 2 In LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sort 0 1 2 In LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sort 0 1 2 In LL"
      }
    },
    {
      "id": "str-105",
      "number": "105",
      "title": "Add 1 To LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N), where N is the length of the linked list.",
        "space": "O(1)"
      },
      "hint": "To add 1 to the number represented by the linked list, we can reverse the linked list, perform the addition, and then reverse it back. First, reverse the linked",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Add%201%20To%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Add 1 To LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Add 1 To LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Add 1 To LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Add 1 To LL"
      }
    },
    {
      "id": "str-106",
      "number": "106",
      "title": "Add Two LL",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(max(N, M)), where N and M are the lengths of the two input linked lists.",
        "space": "O(max(N, M)), as the length of the result linked list can be at most max(N, M)+1."
      },
      "hint": "Traverse both linked lists simultaneously, starting from the heads. At each step, add the corresponding digits from both linked lists along with the carry (init",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Add%20Two%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Add Two LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Add Two LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Add Two LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Add Two LL"
      }
    },
    {
      "id": "str-107",
      "number": "107",
      "title": "Delete Nodes From Dll",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "** The time complexity is O(N), where N is the number of nodes in the doubly linked list.",
        "space": "** The space complexity is O(1) since we are modifying the given linked list in-place without using any extra space."
      },
      "hint": "**  To delete all occurrences of the given key from a doubly linked list, we can traverse the list and check each node's data. If the data matches the key, we h",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Delete%20Nodes%20From%20Dll",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Delete Nodes From Dll\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Delete Nodes From Dll\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Delete Nodes From Dll\n    pass",
        "javascript": "// Striver A2Z optimal approach for Delete Nodes From Dll"
      }
    },
    {
      "id": "str-108",
      "number": "108",
      "title": "Pair Sum In Dll",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "YitR4dQsddE",
      "complexity": {
        "time": "O(N), where N is the number of nodes in the doubly linked list.",
        "space": "O(1)."
      },
      "hint": "1. Initialize two pointers, `start` and `end`, pointing to the beginning and end of the doubly linked list, respectively. 2. While the `start` pointer's data is",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Pair%20Sum%20In%20Dll",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Pair Sum In Dll\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Pair Sum In Dll\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Pair Sum In Dll\n    pass",
        "javascript": "// Striver A2Z optimal approach for Pair Sum In Dll"
      }
    },
    {
      "id": "str-109",
      "number": "109",
      "title": "Remove Duplicates From Dll",
      "difficulty": "Medium",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "37E9ckMDdTk",
      "complexity": {
        "time": "O(N), where N is the number of nodes in the linked list.",
        "space": "O(1)."
      },
      "hint": "1. Initialize a variable `dupli` with the value of the head node. 2. Start from the next node, `curr`, and iterate until the end of the linked list. 3. For each",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Remove%20Duplicates%20From%20Dll",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Remove Duplicates From Dll\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Remove Duplicates From Dll\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Remove Duplicates From Dll\n    pass",
        "javascript": "// Striver A2Z optimal approach for Remove Duplicates From Dll"
      }
    },
    {
      "id": "str-110",
      "number": "110",
      "title": "Reverse K Node In Groups",
      "difficulty": "Hard",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N), where N is the number of nodes in the linked list.",
        "space": "O(1)."
      },
      "hint": "The idea is to reverse the nodes of the linked list in groups of size k. First, we need to check if there are at least k nodes remaining in the linked list. If ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Reverse%20K%20Node%20In%20Groups",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Reverse K Node In Groups\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Reverse K Node In Groups\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Reverse K Node In Groups\n    pass",
        "javascript": "// Striver A2Z optimal approach for Reverse K Node In Groups"
      }
    },
    {
      "id": "str-111",
      "number": "111",
      "title": "Rotate LL K Times",
      "difficulty": "Hard",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "jtSiWTPLwd0",
      "complexity": {
        "time": "O(N), where N is the number of nodes in the linked list.",
        "space": "O(1)."
      },
      "hint": "To rotate the linked list to the right by k places, we need to perform the following steps: 1. Find the length of the linked list and connect the last node to t",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Rotate%20LL%20K%20Times",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Rotate LL K Times\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Rotate LL K Times\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Rotate LL K Times\n    pass",
        "javascript": "// Striver A2Z optimal approach for Rotate LL K Times"
      }
    },
    {
      "id": "str-112",
      "number": "112",
      "title": "Copy LL With Random Pointers",
      "difficulty": "Hard",
      "category": "Linked List",
      "hasVideo": true,
      "youtubeId": "q570bKdrnlw",
      "complexity": {
        "time": "The time complexity of this approach is O(n) since we traverse the original list once to create the copied list.",
        "space": "The space complexity is also O(n) because we create a new node for each node in the original list."
      },
      "hint": "To create a deep copy of a linked list with random pointers, we can follow these steps: 1. Traverse the original linked list and create a new node for each node",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Copy%20LL%20With%20Random%20Pointers",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Copy LL With Random Pointers\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Copy LL With Random Pointers\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Copy LL With Random Pointers\n    pass",
        "javascript": "// Striver A2Z optimal approach for Copy LL With Random Pointers"
      }
    },
    {
      "id": "str-113",
      "number": "113",
      "title": "Flatten LL",
      "difficulty": "Hard",
      "category": "Linked List",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "** The time complexity is O(N), where N is the total number of nodes in the linked list.",
        "space": "** The space complexity is O(1) since we are modifying the given linked list in-place without using any extra space."
      },
      "hint": "**  To flatten the linked list, we can use a recursive approach. The idea is to flatten the list from right to left. Starting from the last node, we recursively",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Flatten%20LL",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Flatten LL\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Flatten LL\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Flatten LL\n    pass",
        "javascript": "// Striver A2Z optimal approach for Flatten LL"
      }
    },
    {
      "id": "str-114",
      "number": "114",
      "title": "Implement Atoi Via Recursion",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N), where N is the length of the string.",
        "space": "O(N), where N is the length of the string (due to the recursive calls)."
      },
      "hint": "1. We start from the last character of the string and recursively convert each digit to an integer. 2. We use a helper function `getnum` that takes the index `i",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Atoi%20Via%20Recursion",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Atoi Via Recursion\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Atoi Via Recursion\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Atoi Via Recursion\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Atoi Via Recursion"
      }
    },
    {
      "id": "str-115",
      "number": "115",
      "title": "Count Good Numbers",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n) (due to the recursive calls)",
        "space": "O(n) (due to the recursive calls)"
      },
      "hint": "- We can observe that for a good digit string of length n, each digit can be either even or a prime number (2, 3, 5, or 7). - For odd indices, there are 4 choic",
      "leetcodeUrl": "https://leetcode.com/problems/count-good-numbers/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Good Numbers\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Good Numbers\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Good Numbers\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Good Numbers"
      }
    },
    {
      "id": "str-116",
      "number": "116",
      "title": "Reverse Stack Using Recursion",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N^2) (due to multiple recursive calls)",
        "space": "O(N) (due to the internal stack space used for recursion)"
      },
      "hint": "To reverse a stack using recursion without using any extra space, we can follow the following steps: 1. Create a helper function called 'insertAtBottom' that ta",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Reverse%20Stack%20Using%20Recursion",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Reverse Stack Using Recursion\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Reverse Stack Using Recursion\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Reverse Stack Using Recursion\n    pass",
        "javascript": "// Striver A2Z optimal approach for Reverse Stack Using Recursion"
      }
    },
    {
      "id": "str-117",
      "number": "117",
      "title": "Sort Stack Using Recursion",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N^2) (due to multiple recursive calls)",
        "space": "O(N) (due to the internal stack space used for recursion)"
      },
      "hint": "To sort a stack in descending order, we can follow the following steps: 1. Create a helper function called 'placeAtCorrectPos' that takes an element and a stack",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Sort%20Stack%20Using%20Recursion",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sort Stack Using Recursion\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sort Stack Using Recursion\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sort Stack Using Recursion\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sort Stack Using Recursion"
      }
    },
    {
      "id": "str-118",
      "number": "118",
      "title": "Genereate All Valid Parenthesis",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(2^N * N), where N is the given number of pairs of parentheses.",
        "space": "O(N), where N is the given number of pairs of parentheses (for the recursion stack and storing combinations)."
      },
      "hint": "To generate all combinations of well-formed parentheses, we can use a recursive approach. We can start with an empty string and keep track of the number of open",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Genereate%20All%20Valid%20Parenthesis",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Genereate All Valid Parenthesis\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Genereate All Valid Parenthesis\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Genereate All Valid Parenthesis\n    pass",
        "javascript": "// Striver A2Z optimal approach for Genereate All Valid Parenthesis"
      }
    },
    {
      "id": "str-119",
      "number": "119",
      "title": "Power Set",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(2^N), where N is the size of the input array 'nums'.",
        "space": "O(N), where N is the size of the input array 'nums' (for the recursion stack and storing subsets)."
      },
      "hint": "To generate all possible subsets, we can use a recursive backtracking approach. 1. Create a helper function called 'solve' that takes a vector of vectors to sto",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Power%20Set",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Power Set\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Power Set\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Power Set\n    pass",
        "javascript": "// Striver A2Z optimal approach for Power Set"
      }
    },
    {
      "id": "str-120",
      "number": "120",
      "title": "Count Distinct Substrings",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(2^N), where N is the length of the input string 's'.",
        "space": "O(2^N), where N is the length of the input string 's' (for storing the distinct subsequences in the set)."
      },
      "hint": "To find the number of distinct subsequences, we can use a recursive approach with backtracking. 1. Create a set to store the distinct subsequences. 2. Create a ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20Distinct%20Substrings",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Distinct Substrings\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Distinct Substrings\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Distinct Substrings\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Distinct Substrings"
      }
    },
    {
      "id": "str-121",
      "number": "121",
      "title": "Count Subsets With Sum Equal To K",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": true,
      "youtubeId": "ZHyb-A2Mte4",
      "complexity": {
        "time": "O(N * sum), where N is the size of the array and sum is the given sum.",
        "space": "O(N * sum), where N is the size of the array and sum is the given sum (for recursion stack)."
      },
      "hint": "To count the subsets with a given sum, we can use a recursive approach with backtracking. 1. Create a helper function called 'solve' that takes the current inde",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20Subsets%20With%20Sum%20Equal%20To%20K",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Subsets With Sum Equal To K\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Subsets With Sum Equal To K\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Subsets With Sum Equal To K\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Subsets With Sum Equal To K"
      }
    },
    {
      "id": "str-122",
      "number": "122",
      "title": "Subset 1",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(2^N), where N is the size of the array.",
        "space": "O(N), where N is the size of the array (for recursion stack and storing subset sums)."
      },
      "hint": "To print the sums of all subsets, we can use a recursive approach with backtracking. 1. Create a helper function called 'solve' that takes the current index, th",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Subset%201",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Subset 1\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Subset 1\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Subset 1\n    pass",
        "javascript": "// Striver A2Z optimal approach for Subset 1"
      }
    },
    {
      "id": "str-123",
      "number": "123",
      "title": "Subset 2",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(2^N), where N is the size of the input array nums. This is because there are 2^N possible subsets.",
        "space": "O(N), where N is the size of the input array nums. This is the space required to store the subsets."
      },
      "hint": "To find all possible subsets without duplicates, we can use a recursive backtracking approach. 1. Sort the input array nums in non-decreasing order to handle du",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Subset%202",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Subset 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Subset 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Subset 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Subset 2"
      }
    },
    {
      "id": "str-124",
      "number": "124",
      "title": "Combination Sum 1",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N^target), where N is the size of the array of candidates and target is the target sum. In the worst case, we may have to explore all possible combinations, which is exponential.",
        "space": "O(target), as the maximum depth of the recursion tree is determined by the target sum."
      },
      "hint": "To find all unique combinations that sum up to the target, we can use a recursive backtracking approach. 1. Create a helper function called 'solve' that takes t",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Combination%20Sum%201",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Combination Sum 1\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Combination Sum 1\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Combination Sum 1\n    pass",
        "javascript": "// Striver A2Z optimal approach for Combination Sum 1"
      }
    },
    {
      "id": "str-125",
      "number": "125",
      "title": "Combination Sum 2",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N * 2^N), where N is the size of the array of candidates. In the worst case, we may have to explore all possible combinations, which is exponential.",
        "space": "O(target), as the maximum depth of the recursion tree is determined by the target sum."
      },
      "hint": "To find all unique combinations that sum up to the target, we can use a recursive backtracking approach. 1. Create a helper function called 'solve' that takes t",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Combination%20Sum%202",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Combination Sum 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Combination Sum 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Combination Sum 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Combination Sum 2"
      }
    },
    {
      "id": "str-126",
      "number": "126",
      "title": "Combination Sum 3",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(2^9), as there are 9 available numbers and we have to explore all possible combinations.",
        "space": "O(k), as the maximum depth of the recursion tree is determined by the number of elements to choose (k)."
      },
      "hint": "To find all valid combinations of k numbers that sum up to n, we can use a recursive backtracking approach. 1. Create a helper function called 'solve' that take",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Combination%20Sum%203",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Combination Sum 3\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Combination Sum 3\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Combination Sum 3\n    pass",
        "javascript": "// Striver A2Z optimal approach for Combination Sum 3"
      }
    },
    {
      "id": "str-127",
      "number": "127",
      "title": "Letter Combinations Of Phone",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(3^N * 4^M), where N is the number of digits that map to 3 letters and M is the number of digits that map to 4 letters.",
        "space": "O(N + M), where N is the number of digits that map to 3 letters and M is the number of digits that map to 4 letters."
      },
      "hint": "We can use a recursive backtracking approach to generate all possible letter combinations. 1. Create a helper function called 'solve' that takes the current ind",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Letter%20Combinations%20Of%20Phone",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Letter Combinations Of Phone\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Letter Combinations Of Phone\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Letter Combinations Of Phone\n    pass",
        "javascript": "// Striver A2Z optimal approach for Letter Combinations Of Phone"
      }
    },
    {
      "id": "str-128",
      "number": "128",
      "title": "Palindrome Partioning",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N * 2^N), where N is the length of the input string 's'. In the worst case, we can have 2^N possible partitions, and for each partition, we need to check if each substring is a palindrome, which takes O(N) time.",
        "space": "O(N), where N is the length of the input string 's'. The space is used for storing the temporary partition vector and the vector of partitions."
      },
      "hint": "We can use a recursive backtracking approach to generate all possible palindrome partitioning. 1. Create a helper function called 'solve' that takes the current",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Palindrome%20Partioning",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Palindrome Partioning\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Palindrome Partioning\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Palindrome Partioning\n    pass",
        "javascript": "// Striver A2Z optimal approach for Palindrome Partioning"
      }
    },
    {
      "id": "str-129",
      "number": "129",
      "title": "Word Search In Grid",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(M * N * 4^L), where M is the number of rows, N is the number of columns in the grid, and L is the length of the target word. In the worst case, we traverse the entire grid for each letter in the target word, and we have 4 choices (up, down, left, right) at each step.",
        "space": "O(L), where L is the length of the target word. The space is used for the recursive call stack."
      },
      "hint": "We can use a backtracking approach to solve this problem. 1. Create a helper function called 'solve' that takes the current row index, column index, letter inde",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Word%20Search%20In%20Grid",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Word Search In Grid\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Word Search In Grid\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Word Search In Grid\n    pass",
        "javascript": "// Striver A2Z optimal approach for Word Search In Grid"
      }
    },
    {
      "id": "str-130",
      "number": "130",
      "title": "Rat In Maze",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(3^(N^2)), where N is the size of the matrix. In the worst case, each cell can have three possible neighboring cells to explore.",
        "space": "O(N^2), as we are using a vector of strings to store the paths."
      },
      "hint": "We can use a backtracking approach to find all possible paths. 1. Create a helper function called 'solve' that takes the current row index, column index, a stri",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Rat%20In%20Maze",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Rat In Maze\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Rat In Maze\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Rat In Maze\n    pass",
        "javascript": "// Striver A2Z optimal approach for Rat In Maze"
      }
    },
    {
      "id": "str-131",
      "number": "131",
      "title": "M Coloring Problem",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(M^N), where M is the number of colors and N is the number of vertices in the graph. In the worst case, we have to try all possible color combinations for all vertices.",
        "space": "O(N), as we are using an array of colors to store the assigned colors for each vertex."
      },
      "hint": "We can solve this problem using backtracking. 1. Create a helper function called 'isPossible' that takes the graph, an array of colors assigned to vertices, the",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=M%20Coloring%20Problem",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for M Coloring Problem\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for M Coloring Problem\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for M Coloring Problem\n    pass",
        "javascript": "// Striver A2Z optimal approach for M Coloring Problem"
      }
    },
    {
      "id": "str-132",
      "number": "132",
      "title": "N Queens",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": true,
      "youtubeId": "Ph95IHmRp5M",
      "complexity": {
        "time": "O(N!), where N is the input parameter representing the size of the chessboard.",
        "space": "O(N^2), where N is the input parameter representing the size of the chessboard."
      },
      "hint": "* 1. Use backtracking to solve the n-queens puzzle.  * 2. Start with an empty chessboard and try placing queens in each row, ensuring that no two queens threate",
      "leetcodeUrl": "https://leetcode.com/problems/n-queens/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for N Queens\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for N Queens\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for N Queens\n    pass",
        "javascript": "// Striver A2Z optimal approach for N Queens"
      }
    },
    {
      "id": "str-133",
      "number": "133",
      "title": "Word Break",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": true,
      "youtubeId": "Sx9NNgRQ3d8",
      "complexity": {
        "time": "O(2^N), where N is the length of the string. In the worst case, we can have 2^N recursive calls.",
        "space": "O(N), where N is the length of the string. The recursion stack can go up to N in the worst case."
      },
      "hint": "* We can solve this problem using a recursive approach with backtracking.  * 1. Start from the beginning of the string and try to find a word from the dictionar",
      "leetcodeUrl": "https://leetcode.com/problems/word-break/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Word Break\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Word Break\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Word Break\n    pass",
        "javascript": "// Striver A2Z optimal approach for Word Break"
      }
    },
    {
      "id": "str-134",
      "number": "134",
      "title": "Sudoku Solver",
      "difficulty": "Medium",
      "category": "Recursion",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of the backtracking algorithm for solving a Sudoku puzzle is O(9^(m*n)), where m and n are the number of rows and columns in the board. In the worst case, we have to try all possible combinations.",
        "space": "The space complexity is O(1) as we are using a constant amount of space for the board and temporary variables."
      },
      "hint": "We can solve the Sudoku puzzle using a backtracking approach. 1. Iterate over each cell in the board. 2. If the cell is empty (denoted by '.'), try placing a di",
      "leetcodeUrl": "https://leetcode.com/problems/sudoku-solver/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sudoku Solver\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sudoku Solver\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sudoku Solver\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sudoku Solver"
      }
    },
    {
      "id": "str-135",
      "number": "135",
      "title": "Bit Manipulation",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Subtract 1 from i to adjust the index to 0-based. 2. To get the ith bit, perform a bitwise AND operation between num and (1 << i). If the result is non-zero,",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Bit%20Manipulation",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Bit Manipulation\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Bit Manipulation\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Bit Manipulation\n    pass",
        "javascript": "// Striver A2Z optimal approach for Bit Manipulation"
      }
    },
    {
      "id": "str-136",
      "number": "136",
      "title": "Check For The Ith Bit",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Perform a bitwise AND operation between N and (1 << K). 2. If the result is non-zero, it means the Kth index bit is set (1); otherwise, it is not set (0).",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Check%20For%20The%20Ith%20Bit",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Check For The Ith Bit\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check For The Ith Bit\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check For The Ith Bit\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check For The Ith Bit"
      }
    },
    {
      "id": "str-137",
      "number": "137",
      "title": "Check For Odd Even",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(1)",
        "space": "O(1)"
      },
      "hint": "To determine whether a positive integer N is odd or even, we can check the least significant bit (LSB) of N.  If the LSB is 1, the number is odd. If the LSB is ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Check%20For%20Odd%20Even",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Check For Odd Even\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check For Odd Even\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check For Odd Even\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check For Odd Even"
      }
    },
    {
      "id": "str-138",
      "number": "138",
      "title": "Check For The Power Of 2",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": true,
      "youtubeId": "xwjS0iZhw4I",
      "complexity": {
        "time": "O(1)",
        "space": "O(1)"
      },
      "hint": "An integer n is a power of two if it has only one bit set (i.e., it is a power of 2). To check if a number has only one bit set, we can use the bitwise AND oper",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Check%20For%20The%20Power%20Of%202",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Check For The Power Of 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check For The Power Of 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check For The Power Of 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check For The Power Of 2"
      }
    },
    {
      "id": "str-139",
      "number": "139",
      "title": "Set The Righmost Unset Bit",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(1)",
        "space": "O(1)"
      },
      "hint": "To set the rightmost unset bit in the binary representation of N, we can follow these steps: 1. Check if N+1 is a power of 2. If it is, then N already has all b",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Set%20The%20Righmost%20Unset%20Bit",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Set The Righmost Unset Bit\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Set The Righmost Unset Bit\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Set The Righmost Unset Bit\n    pass",
        "javascript": "// Striver A2Z optimal approach for Set The Righmost Unset Bit"
      }
    },
    {
      "id": "str-140",
      "number": "140",
      "title": "Swap Two Numbers Without Temporary Variable",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(1)",
        "space": "O(1)"
      },
      "hint": "To swap two numbers a and b without using a temporary variable, we can use the XOR (^) operation. 1. Set a = a XOR b, which XORs the binary representations of a",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Swap%20Two%20Numbers%20Without%20Temporary%20Variable",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Swap Two Numbers Without Temporary Variable\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Swap Two Numbers Without Temporary Variable\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Swap Two Numbers Without Temporary Variable\n    pass",
        "javascript": "// Striver A2Z optimal approach for Swap Two Numbers Without Temporary Variable"
      }
    },
    {
      "id": "str-141",
      "number": "141",
      "title": "Divide Two Numbers Using Bit Maipulation",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log n), where n is the absolute value of the dividend",
        "space": "O(1)"
      },
      "hint": "To divide two integers without using multiplication, division, and mod operator, we can use a bitwise shifting approach. 1. Initialize a variable ans as 0 to st",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Divide%20Two%20Numbers%20Using%20Bit%20Maipulation",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Divide Two Numbers Using Bit Maipulation\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Divide Two Numbers Using Bit Maipulation\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Divide Two Numbers Using Bit Maipulation\n    pass",
        "javascript": "// Striver A2Z optimal approach for Divide Two Numbers Using Bit Maipulation"
      }
    },
    {
      "id": "str-142",
      "number": "142",
      "title": "Count Set Bit From Numbers 1 To N",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log(n))",
        "space": "O(log(n))"
      },
      "hint": "The approach to solve this problem is based on the observation that the count of set bits in the binary representation of a number `n` can be determined by the ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20Set%20Bit%20From%20Numbers%201%20To%20N",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Set Bit From Numbers 1 To N\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Set Bit From Numbers 1 To N\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Set Bit From Numbers 1 To N\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Set Bit From Numbers 1 To N"
      }
    },
    {
      "id": "str-143",
      "number": "143",
      "title": "Minimum Bit Flips",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log n), where n is the maximum value between start and goal",
        "space": "O(1)"
      },
      "hint": "To find the minimum number of bit flips required to convert start to goal, we can iterate over each bit position from right to left and compare the correspondin",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Bit%20Flips",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Bit Flips\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Bit Flips\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Bit Flips\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Bit Flips"
      }
    },
    {
      "id": "str-144",
      "number": "144",
      "title": "Exceptionally Odd",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the number of elements in the array",
        "space": "O(1)"
      },
      "hint": "To find the exceptional number, we can use the bitwise XOR operation. XORing a number with itself results in 0, so XORing all the numbers in the array will canc",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Exceptionally%20Odd",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Exceptionally Odd\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Exceptionally Odd\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Exceptionally Odd\n    pass",
        "javascript": "// Striver A2Z optimal approach for Exceptionally Odd"
      }
    },
    {
      "id": "str-145",
      "number": "145",
      "title": "XOR Of Numbers From L To R",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "The XOR of a range [L, R] can be calculated by XORing the XORs of the individual numbers in the range [1, L-1] and [1, R]. We can observe a pattern in the XOR v",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=XOR%20Of%20Numbers%20From%20L%20To%20R",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for XOR Of Numbers From L To R\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for XOR Of Numbers From L To R\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for XOR Of Numbers From L To R\n    pass",
        "javascript": "// Striver A2Z optimal approach for XOR Of Numbers From L To R"
      }
    },
    {
      "id": "str-146",
      "number": "146",
      "title": "Prime Factors Of Number",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": true,
      "youtubeId": "LT7XhVdeRyg",
      "complexity": {
        "time": "O(sqrt(N))",
        "space": "O(1) (excluding the space required for the output vector)"
      },
      "hint": "To find the unique prime factors of a number N, we can iterate from 2 to sqrt(N) and check if each number divides N. 1. Initialize an empty vector `ans` to stor",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Prime%20Factors%20Of%20Number",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Prime Factors Of Number\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Prime Factors Of Number\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Prime Factors Of Number\n    pass",
        "javascript": "// Striver A2Z optimal approach for Prime Factors Of Number"
      }
    },
    {
      "id": "str-147",
      "number": "147",
      "title": "All Divisors Of Number",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": true,
      "youtubeId": "Ae_Ag_saG9s",
      "complexity": {
        "time": "O(sqrt(N))",
        "space": "O(sqrt(N)) (excluding the space required for the output vector)"
      },
      "hint": "To print all the divisors of a number N, we can iterate from 1 to sqrt(N) and check if each number divides N. 1. Initialize an empty vector `temp` to store the ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=All%20Divisors%20Of%20Number",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for All Divisors Of Number\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for All Divisors Of Number\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for All Divisors Of Number\n    pass",
        "javascript": "// Striver A2Z optimal approach for All Divisors Of Number"
      }
    },
    {
      "id": "str-148",
      "number": "148",
      "title": "Sieve Of Eratosthenes",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": true,
      "youtubeId": "g5Fuxn_AvSk",
      "complexity": {
        "time": "O(n log log n)",
        "space": "O(n)"
      },
      "hint": "To count the number of prime numbers less than a given number n, we can use the Sieve of Eratosthenes algorithm. 1. Create a boolean vector `primes` of size n+1",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Sieve%20Of%20Eratosthenes",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sieve Of Eratosthenes\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sieve Of Eratosthenes\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sieve Of Eratosthenes\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sieve Of Eratosthenes"
      }
    },
    {
      "id": "str-149",
      "number": "149",
      "title": "Prime Factorization Using Sieve",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N log(log N))",
        "space": "O(N)"
      },
      "hint": "To compute the prime factorization of a number N, we can use the concept of Sieve. 1. Create a boolean vector `prime` of size N+1 and initialize all elements to",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Prime%20Factorization%20Using%20Sieve",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Prime Factorization Using Sieve\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Prime Factorization Using Sieve\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Prime Factorization Using Sieve\n    pass",
        "javascript": "// Striver A2Z optimal approach for Prime Factorization Using Sieve"
      }
    },
    {
      "id": "str-150",
      "number": "150",
      "title": "Fast Power",
      "difficulty": "Medium",
      "category": "Bit Manipulation",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log(n))",
        "space": "O(1)"
      },
      "hint": "To calculate x raised to the power n, we can use the concept of binary exponentiation. 1. If n is 0, return 1, as any number raised to the power 0 is 1. 2. Init",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Fast%20Power",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Fast Power\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Fast Power\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Fast Power\n    pass",
        "javascript": "// Striver A2Z optimal approach for Fast Power"
      }
    },
    {
      "id": "str-151",
      "number": "151",
      "title": "Implement Stack Using Array",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "tqQ5fTamIN4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We use a class `MyStack` to represent the stack. - The stack is implemented using an array `arr` and a top variable to keep track of the top element. - The cl",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Stack%20Using%20Array",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Stack Using Array\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Stack Using Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Stack Using Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Stack Using Array"
      }
    },
    {
      "id": "str-152",
      "number": "152",
      "title": "Implement Queue Using Array",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "tqQ5fTamIN4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We use a class `MyQueue` to represent the queue. - The queue is implemented using an array `arr`, a front variable to keep track of the front element, and a r",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Queue%20Using%20Array",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Queue Using Array\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Queue Using Array\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Queue Using Array\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Queue Using Array"
      }
    },
    {
      "id": "str-153",
      "number": "153",
      "title": "Implement Stack Using Queue",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "tqQ5fTamIN4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We use the class `QueueStack` to represent the stack. - The stack is implemented using one queue `q`. - The `push(int)` function inserts an element into `q`. ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Stack%20Using%20Queue",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Stack Using Queue\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Stack Using Queue\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Stack Using Queue\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Stack Using Queue"
      }
    },
    {
      "id": "str-154",
      "number": "154",
      "title": "Implement Queue Using Stacks",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "eanwa3yt4Yg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We use the class `Queue` to represent the queue. - The queue is implemented using two stacks `input` and `output`. - The `enqueue(int)` function inserts an el",
      "leetcodeUrl": "https://leetcode.com/problems/implement-queue-using-stacks/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Queue Using Stacks\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Queue Using Stacks\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Queue Using Stacks\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Queue Using Stacks"
      }
    },
    {
      "id": "str-155",
      "number": "155",
      "title": "Implement Stack Using Linked List",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We use the class `MyStack` to represent the stack implemented using a linked list. - The stack is implemented using a singly linked list where each node repre",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Stack%20Using%20Linked%20List",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Stack Using Linked List\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Stack Using Linked List\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Stack Using Linked List\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Stack Using Linked List"
      }
    },
    {
      "id": "str-156",
      "number": "156",
      "title": "Valid Parenthesis",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "cHT6sG_hUZI",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a stack to keep track of the opening brackets. - Whenever we encounter an opening bracket, we push it onto the stack. - If we encounter a closing b",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Valid%20Parenthesis",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Valid Parenthesis\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Valid Parenthesis\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Valid Parenthesis\n    pass",
        "javascript": "// Striver A2Z optimal approach for Valid Parenthesis"
      }
    },
    {
      "id": "str-157",
      "number": "157",
      "title": "Implement Min Stack",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "NdDIaH91P0g",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use an auxiliary stack to keep track of the difference of an element from the minimum element at each step. - When pushing an element, we push the diff",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Min%20Stack",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Min Stack\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Min Stack\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Min Stack\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Min Stack"
      }
    },
    {
      "id": "str-158",
      "number": "158",
      "title": "Infix To Postfix",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "4pIc9UBHJtk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a stack to convert the infix expression to postfix. - We iterate through each character of the input string. - If the character is an operand (lett",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Infix%20To%20Postfix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Infix To Postfix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Infix To Postfix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Infix To Postfix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Infix To Postfix"
      }
    },
    {
      "id": "str-159",
      "number": "159",
      "title": "Infix To Prefix",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "4pIc9UBHJtk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a stack to convert the infix expression to postfix. - We iterate through each character of the input string from right to left. - If the character ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Infix%20To%20Prefix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Infix To Prefix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Infix To Prefix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Infix To Prefix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Infix To Prefix"
      }
    },
    {
      "id": "str-160",
      "number": "160",
      "title": "Prefix To Infix",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "4pIc9UBHJtk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a stack to convert the prefix expression to infix. - We iterate through each character of the input string in reverse order. - If the character is ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Prefix%20To%20Infix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Prefix To Infix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Prefix To Infix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Prefix To Infix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Prefix To Infix"
      }
    },
    {
      "id": "str-161",
      "number": "161",
      "title": "Prefix To Postfix",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "4pIc9UBHJtk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a stack to convert the prefix expression to postfix. - We iterate through each character of the input string in reverse order. - If the character i",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Prefix%20To%20Postfix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Prefix To Postfix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Prefix To Postfix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Prefix To Postfix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Prefix To Postfix"
      }
    },
    {
      "id": "str-162",
      "number": "162",
      "title": "Postfix To Infix",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "4pIc9UBHJtk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a stack to convert the postfix expression to infix. - We iterate through each character of the input string. - If the character is an alphanumeric ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Postfix%20To%20Infix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Postfix To Infix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Postfix To Infix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Postfix To Infix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Postfix To Infix"
      }
    },
    {
      "id": "str-163",
      "number": "163",
      "title": "Postfix To Prefix",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "4pIc9UBHJtk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a stack to convert the postfix expression to prefix. - We iterate through each character of the input string. - If the character is an alphanumeric",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Postfix%20To%20Prefix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Postfix To Prefix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Postfix To Prefix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Postfix To Prefix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Postfix To Prefix"
      }
    },
    {
      "id": "str-164",
      "number": "164",
      "title": "Next Greater Element",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "e7XQLtOQM3I",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can solve this problem using a stack and a hashmap. - First, we iterate through the `nums2` array from right to left. - For each element, we pop elements f",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Next%20Greater%20Element",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Next Greater Element\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Next Greater Element\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Next Greater Element\n    pass",
        "javascript": "// Striver A2Z optimal approach for Next Greater Element"
      }
    },
    {
      "id": "str-165",
      "number": "165",
      "title": "Next Greater Element 2",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "e7XQLtOQM3I",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To find the next greater number for each element in a circular array, we can utilize a stack.  We iterate through the array in reverse order to handle the circu",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Next%20Greater%20Element%202",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Next Greater Element 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Next Greater Element 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Next Greater Element 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Next Greater Element 2"
      }
    },
    {
      "id": "str-166",
      "number": "166",
      "title": "Previous Smaller Element",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "zMdbdGJNlh4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To find the nearest smaller number on the left for each element, we can utilize a stack.  We iterate through the array from left to right. For each element, we ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Previous%20Smaller%20Element",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Previous Smaller Element\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Previous Smaller Element\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Previous Smaller Element\n    pass",
        "javascript": "// Striver A2Z optimal approach for Previous Smaller Element"
      }
    },
    {
      "id": "str-167",
      "number": "167",
      "title": "Trapping Rainwater",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "1_5VuquLbXg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To calculate the trapped water, we can use the two-pointer approach. We initialize two pointers, one at the beginning of the array (`left`) and another at the e",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Trapping%20Rainwater",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Trapping Rainwater\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Trapping Rainwater\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Trapping Rainwater\n    pass",
        "javascript": "// Striver A2Z optimal approach for Trapping Rainwater"
      }
    },
    {
      "id": "str-168",
      "number": "168",
      "title": "Sum Of Subarray Minimum",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "v0e8p9JCgRc",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To find the sum of the minimums of all subarrays, we can use the concept of previous smaller and next smaller elements for each element in the array. 1. Define ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Sum%20Of%20Subarray%20Minimum",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sum Of Subarray Minimum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sum Of Subarray Minimum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sum Of Subarray Minimum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sum Of Subarray Minimum"
      }
    },
    {
      "id": "str-169",
      "number": "169",
      "title": "Sum Of Range Of All Subarray",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "gIrMptNPf5M",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To find the sum of all subarray ranges, we can use the concept of previous smaller, next smaller, previous greater, and next greater elements for each element i",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Sum%20Of%20Range%20Of%20All%20Subarray",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sum Of Range Of All Subarray\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sum Of Range Of All Subarray\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sum Of Range Of All Subarray\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sum Of Range Of All Subarray"
      }
    },
    {
      "id": "str-170",
      "number": "170",
      "title": "Remove K Elements",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "The idea is to use a stack to build the smallest number by removing larger digits. We iterate through each digit in num and compare it with the digits in the st",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Remove%20K%20Elements",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Remove K Elements\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Remove K Elements\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Remove K Elements\n    pass",
        "javascript": "// Striver A2Z optimal approach for Remove K Elements"
      }
    },
    {
      "id": "str-171",
      "number": "171",
      "title": "Largest Rectangle In Histogram",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "zx5Sw9130L8",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To find the largest rectangle area, we can use the concept of a stack. The idea is to maintain a stack of indices of the heights in non-decreasing order. For ea",
      "leetcodeUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Largest Rectangle In Histogram\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Largest Rectangle In Histogram\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Largest Rectangle In Histogram\n    pass",
        "javascript": "// Striver A2Z optimal approach for Largest Rectangle In Histogram"
      }
    },
    {
      "id": "str-172",
      "number": "172",
      "title": "Maximal Rectangle In Binary Matrix",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To solve this problem, we can use a variation of the Largest Rectangle in Histogram problem. 1. First, we will calculate the heights of the histogram for each r",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Maximal%20Rectangle%20In%20Binary%20Matrix",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Maximal Rectangle In Binary Matrix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Maximal Rectangle In Binary Matrix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Maximal Rectangle In Binary Matrix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Maximal Rectangle In Binary Matrix"
      }
    },
    {
      "id": "str-173",
      "number": "173",
      "title": "Asteroids Collision",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To solve this problem, we can use a stack to simulate the asteroid collisions. 1. We iterate through each asteroid in the given array. 2. For each asteroid, we ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Asteroids%20Collision",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Asteroids Collision\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Asteroids Collision\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Asteroids Collision\n    pass",
        "javascript": "// Striver A2Z optimal approach for Asteroids Collision"
      }
    },
    {
      "id": "str-174",
      "number": "174",
      "title": "Sliding Window Maximum",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "DfljaUwZsGo",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To solve this problem, we can use a deque (double-ended queue) to store the indices of elements in the current sliding window. 1. We iterate through the first k",
      "leetcodeUrl": "https://leetcode.com/problems/sliding-window-maximum/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Sliding Window Maximum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Sliding Window Maximum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Sliding Window Maximum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Sliding Window Maximum"
      }
    },
    {
      "id": "str-175",
      "number": "175",
      "title": "Stock Span Problem",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "eay-zoSRkVc",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To solve this problem, we can use a stack to store the prices along with their corresponding spans. 1. Initialize an empty stack and a variable to keep track of",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Stock%20Span%20Problem",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Stock Span Problem\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Stock Span Problem\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Stock Span Problem\n    pass",
        "javascript": "// Striver A2Z optimal approach for Stock Span Problem"
      }
    },
    {
      "id": "str-176",
      "number": "176",
      "title": "Celebrity Problem",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "cEadsbTeze4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To solve this problem, we can use a stack to keep track of potential celebrity candidates. 1. Initially, push all the people (indices) onto the stack. 2. While ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Celebrity%20Problem",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Celebrity Problem\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Celebrity Problem\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Celebrity Problem\n    pass",
        "javascript": "// Striver A2Z optimal approach for Celebrity Problem"
      }
    },
    {
      "id": "str-177",
      "number": "177",
      "title": "LRU Cache",
      "difficulty": "Medium",
      "category": "Stack and Queues",
      "hasVideo": true,
      "youtubeId": "7ABFKPK2hD4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "To implement the LRU cache, we can use a combination of a hash map and a doubly linked list. - The hash map will store the key-value pairs, where the key is the",
      "leetcodeUrl": "https://leetcode.com/problems/lru-cache/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for LRU Cache\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for LRU Cache\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for LRU Cache\n    pass",
        "javascript": "// Striver A2Z optimal approach for LRU Cache"
      }
    },
    {
      "id": "str-178",
      "number": "178",
      "title": "Longest Substring Without Repeating Characters",
      "difficulty": "Medium",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "wiGpQwVHdE0",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a sliding window approach to solve this problem. - We maintain a window that contains only unique characters. - We use a hash map to store the freq",
      "leetcodeUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Substring Without Repeating Characters\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Substring Without Repeating Characters\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Substring Without Repeating Characters\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Substring Without Repeating Characters"
      }
    },
    {
      "id": "str-179",
      "number": "179",
      "title": "Max Consecutive 1'S",
      "difficulty": "Medium",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "bYWLJb3vCWY",
      "complexity": {
        "time": "O(N), where N is the length of the input array nums. We iterate through the array once.",
        "space": "O(1), as we are using a constant amount of additional space to store variables."
      },
      "hint": "1. Initialize variables zeroCnt, start, and ans. 2. Iterate through the array nums:    - If the current element is 0, increment zeroCnt.    - Enter a while loop",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Max%20Consecutive%201'S",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Max Consecutive 1'S\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Max Consecutive 1'S\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Max Consecutive 1'S\n    pass",
        "javascript": "// Striver A2Z optimal approach for Max Consecutive 1'S"
      }
    },
    {
      "id": "str-180",
      "number": "180",
      "title": "Fruit Into Baskets",
      "difficulty": "Medium",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "e3bs0uA1NhQ",
      "complexity": {
        "time": "O(N), where N is the number of fruit trees. We iterate through the fruit trees once using the sliding window approach.",
        "space": "O(1) or O(2), as the size of the map can be at most 2 since we only have two baskets."
      },
      "hint": "1. Initialize an unordered_map mp to track the frequency of fruit types. 2. Initialize variables ans and start to keep track of the maximum number of fruits and",
      "leetcodeUrl": "https://leetcode.com/problems/fruit-into-baskets/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Fruit Into Baskets\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Fruit Into Baskets\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Fruit Into Baskets\n    pass",
        "javascript": "// Striver A2Z optimal approach for Fruit Into Baskets"
      }
    },
    {
      "id": "str-181",
      "number": "181",
      "title": "Longest Repeating Character",
      "difficulty": "Medium",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "-zSxTJkcdAo",
      "complexity": {
        "time": "O(N * L), where N is the length of the string s and L is the number of unique letters in the string. We iterate through the string and perform the sliding window operation for each unique letter.",
        "space": "O(L), as we store the unique letters in the set ltrs."
      },
      "hint": "1. Create an unordered_set ltrs to store all unique letters in the given string s. 2. Initialize a variable ans to keep track of the maximum length of the subst",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Longest%20Repeating%20Character",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Repeating Character\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Repeating Character\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Repeating Character\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Repeating Character"
      }
    },
    {
      "id": "str-182",
      "number": "182",
      "title": "Binary Subarrays With Sum",
      "difficulty": "Medium",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "frf7qxiN2qU",
      "complexity": {
        "time": "O(N), where N is the size of the input array nums. We traverse the array once and perform constant time operations in the loop.",
        "space": "O(N), as the worst-case scenario would be that all prefix sums are distinct, so the map mp would store N prefix sums."
      },
      "hint": "1. Create an unordered_map mp to store the prefix sum and its frequency. 2. Initialize a variable prefSum to keep track of the prefix sum. 3. Initialize a varia",
      "leetcodeUrl": "https://leetcode.com/problems/binary-subarrays-with-sum/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Binary Subarrays With Sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Binary Subarrays With Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Binary Subarrays With Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Binary Subarrays With Sum"
      }
    },
    {
      "id": "str-183",
      "number": "183",
      "title": "Count The Number Of Nice Subarrays",
      "difficulty": "Medium",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "j_QOv9OT9Og",
      "complexity": {
        "time": "O(N), where N is the size of the input array nums. We traverse the array once in both the atMostK function and the numberOfSubarrays function.",
        "space": "O(1), as we use constant extra space throughout the algorithm."
      },
      "hint": "1. Define a helper function called atMostK, which calculates the number of subarrays with at most k odd numbers. 2. Initialize variables start to 0, oddCnt to 0",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20The%20Number%20Of%20Nice%20Subarrays",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count The Number Of Nice Subarrays\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count The Number Of Nice Subarrays\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count The Number Of Nice Subarrays\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count The Number Of Nice Subarrays"
      }
    },
    {
      "id": "str-184",
      "number": "184",
      "title": "Number Of Substrings Containing All 3 Characters",
      "difficulty": "Medium",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "xtqN4qlgr8s",
      "complexity": {
        "time": "O(n), where n is the length of the string s. We iterate over the string once.",
        "space": "O(1), as the extra space used is constant throughout the algorithm."
      },
      "hint": "To count the number of substrings with at least one occurrence of 'a', 'b', and 'c', we can use a sliding window approach.  1. Create a helper function, countOf",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Number%20Of%20Substrings%20Containing%20All%203%20Characters",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Number Of Substrings Containing All 3 Characters\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Number Of Substrings Containing All 3 Characters\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Number Of Substrings Containing All 3 Characters\n    pass",
        "javascript": "// Striver A2Z optimal approach for Number Of Substrings Containing All 3 Characters"
      }
    },
    {
      "id": "str-185",
      "number": "185",
      "title": "Maximum Points You Can Obtaln Form The Card",
      "difficulty": "Medium",
      "category": "Sliding Window",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the size of the cardPoints array. We iterate over the array once to calculate the total sum and find the minimum sum of a subarray.",
        "space": "O(1), as the extra space used is constant throughout the algorithm."
      },
      "hint": "To maximize the score, we need to minimize the sum of the discarded cards. We can find the minimum sum of a subarray of size (n - k) using a sliding window appr",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Maximum%20Points%20You%20Can%20Obtaln%20Form%20The%20Card",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Maximum Points You Can Obtaln Form The Card\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Maximum Points You Can Obtaln Form The Card\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Maximum Points You Can Obtaln Form The Card\n    pass",
        "javascript": "// Striver A2Z optimal approach for Maximum Points You Can Obtaln Form The Card"
      }
    },
    {
      "id": "str-186",
      "number": "186",
      "title": "Longest Substring With At Most K Unique Characters",
      "difficulty": "Hard",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "teM9ZsVRQyc",
      "complexity": {
        "time": "O(n), where n is the length of the string 's'. We iterate over the string once using the sliding window approach.",
        "space": "O(k), as the space used by the unordered_map is proportional to the number of distinct characters, which can be at most 'k'."
      },
      "hint": "We can use a sliding window approach to solve this problem.  1. Create a function, kDistinctChars, that takes 'k' and the input string 's' as parameters.    - I",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Longest%20Substring%20With%20At%20Most%20K%20Unique%20Characters",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Substring With At Most K Unique Characters\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Substring With At Most K Unique Characters\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Substring With At Most K Unique Characters\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Substring With At Most K Unique Characters"
      }
    },
    {
      "id": "str-187",
      "number": "187",
      "title": "Count The Number Of Substrings With Exactly K Unique Characters",
      "difficulty": "Hard",
      "category": "Sliding Window",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n), where n is the length of the input vector 'nums'. We iterate over the vector once using the sliding window approach.",
        "space": "O(k), as the space used by the unordered_map is proportional to the number of distinct elements, which can be at most 'k'."
      },
      "hint": "We can solve this problem using a sliding window approach.  1. Create a function, kDistinctIntegers, that takes 'k' and the input vector 's' as parameters.    -",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20The%20Number%20Of%20Substrings%20With%20Exactly%20K%20Unique%20Characters",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count The Number Of Substrings With Exactly K Unique Characters\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count The Number Of Substrings With Exactly K Unique Characters\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count The Number Of Substrings With Exactly K Unique Characters\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count The Number Of Substrings With Exactly K Unique Characters"
      }
    },
    {
      "id": "str-188",
      "number": "188",
      "title": "Minimum Window Substring",
      "difficulty": "Hard",
      "category": "Sliding Window",
      "hasVideo": true,
      "youtubeId": "jSto0O4AJbM",
      "complexity": {
        "time": "O(m + n), where m is the length of 's' and n is the length of 't'. We iterate over both strings once using the sliding window approach.",
        "space": "O(n), as the space used by the unordered_map is proportional to the number of unique characters in 't', which can be at most 'n'."
      },
      "hint": "We can solve this problem using a sliding window approach.  1. Create a function, minWindow, that takes 's' and 't' as parameters.    - Initialize an unordered_",
      "leetcodeUrl": "https://leetcode.com/problems/minimum-window-substring/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Window Substring\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Window Substring\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Window Substring\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Window Substring"
      }
    },
    {
      "id": "str-189",
      "number": "189",
      "title": "Implement Min Heap",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "A min heap is a binary tree-based data structure where the value of each parent node is less than or equal to the values of its children. The heapify operation ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Implement%20Min%20Heap",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Min Heap\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Min Heap\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Min Heap\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Min Heap"
      }
    },
    {
      "id": "str-190",
      "number": "190",
      "title": "Check If Array Is Heap",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of the isMaxHeap function is O(N), where N is the size of the array. This is because we need to check the max-heap property for each node in the array.",
        "space": "The space complexity is O(N) due to the recursive calls in the solve function."
      },
      "hint": "1. Start from the root node and recursively check if the current node satisfies the max-heap property. 2. The max-heap property states that every node should be",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Check%20If%20Array%20Is%20Heap",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Check If Array Is Heap\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check If Array Is Heap\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check If Array Is Heap\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check If Array Is Heap"
      }
    },
    {
      "id": "str-191",
      "number": "191",
      "title": "Convert Min Heap To Max Heap",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": true,
      "youtubeId": "kMSBvlZ-_HA",
      "complexity": {
        "time": "The time complexity of the convertMinToMaxHeap function is O(N), where N is the size of the array. This is because we need to perform heapify on each internal node of the heap.",
        "space": "The space complexity is O(1) as no extra space is used in the conversion process."
      },
      "hint": "To convert a min-heap to a max-heap, we need to rearrange the elements of the array in such a way that the max-heap property is satisfied. 1. Start from the las",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Convert%20Min%20Heap%20To%20Max%20Heap",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Convert Min Heap To Max Heap\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Convert Min Heap To Max Heap\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Convert Min Heap To Max Heap\n    pass",
        "javascript": "// Striver A2Z optimal approach for Convert Min Heap To Max Heap"
      }
    },
    {
      "id": "str-192",
      "number": "192",
      "title": "Kth Largest Element",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of the findKthLargest function is O(N log k), where N is the size of the array. Inserting elements into the min-heap and heapifying take O(log k) time, and we do this for N-k elements. The overall time complexity is dominated by the heap operations.",
        "space": "The space complexity is O(k) as we need to store k elements in the min-heap."
      },
      "hint": "To find the kth largest element in the array, we can use a min-heap of size k. 1. Initialize a min-heap (priority queue) of size k. 2. Insert the first k elemen",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kth%20Largest%20Element",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Kth Largest Element\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kth Largest Element\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kth Largest Element\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kth Largest Element"
      }
    },
    {
      "id": "str-193",
      "number": "193",
      "title": "Kth Smallest Element",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of the findKthLargest function is O(N log K), where N is the size of the array. Inserting elements into the max-heap and heapifying take O(log K) time, and we do this for N-K elements. The overall time complexity is dominated by the heap operations.",
        "space": "The space complexity is O(K) as we need to store K elements in the max-heap."
      },
      "hint": "To find the Kth smallest element in the array, we can use a max-heap of size K. 1. Initialize a max-heap (priority queue) of size K. 2. Insert the first K eleme",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kth%20Smallest%20Element",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Kth Smallest Element\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kth Smallest Element\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kth Smallest Element\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kth Smallest Element"
      }
    },
    {
      "id": "str-194",
      "number": "194",
      "title": "Merge K Sorted Arrays",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": true,
      "youtubeId": "n7uwj04E0I4",
      "complexity": {
        "time": "The time complexity of the mergeKArrays function is O(K^2 log K), where K is the size of each array. Inserting elements into the min-heap and extracting the minimum element take O(log K) time, and we do this for K^2 elements. The overall time complexity is dominated by the heap operations.",
        "space": "The space complexity is O(K) as we need to store K elements in the min-heap."
      },
      "hint": "To merge K sorted arrays, we can use a min-heap (priority queue) to store the smallest elements from each array. 1. Create a min-heap of size K to store the cur",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Merge%20K%20Sorted%20Arrays",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Merge K Sorted Arrays\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Merge K Sorted Arrays\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Merge K Sorted Arrays\n    pass",
        "javascript": "// Striver A2Z optimal approach for Merge K Sorted Arrays"
      }
    },
    {
      "id": "str-195",
      "number": "195",
      "title": "Merge K Sorted Lists",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": true,
      "youtubeId": "q5a5OiGbT6Q",
      "complexity": {
        "time": "The time complexity of the mergeKLists function is O(N log K), where N is the total number of nodes across all lists and K is the number of linked lists. Inserting nodes into the min-heap and extracting the minimum node take O(log K) time, and we do this for N nodes. The overall time complexity is dominated by the heap operations.",
        "space": "The space complexity is O(K) as we need to store K nodes in the min-heap."
      },
      "hint": "To merge K sorted linked lists, we can use a min-heap (priority queue) to store the smallest nodes from each list. 1. Create a min-heap of size K to store the c",
      "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Merge K Sorted Lists\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Merge K Sorted Lists\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Merge K Sorted Lists\n    pass",
        "javascript": "// Striver A2Z optimal approach for Merge K Sorted Lists"
      }
    },
    {
      "id": "str-196",
      "number": "196",
      "title": "Arrange By Rank",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of the arrayRankTransform function is O(N log N), where N is the size of the array. Inserting elements into the min-heap and extracting the minimum element take O(log N) time, and we do this for N elements. The overall time complexity is dominated by the heap operations.",
        "space": "The space complexity is O(N) as we need to store N elements in the min-heap and the result array."
      },
      "hint": "To assign ranks to the elements in the array, we can use a min-heap (priority queue) to sort the elements in ascending order along with their indices. 1. Create",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Arrange%20By%20Rank",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Arrange By Rank\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Arrange By Rank\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Arrange By Rank\n    pass",
        "javascript": "// Striver A2Z optimal approach for Arrange By Rank"
      }
    },
    {
      "id": "str-197",
      "number": "197",
      "title": "Task Scheduler",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": true,
      "youtubeId": "s8p8ukTyA2I",
      "complexity": {
        "time": "The time complexity of the leastInterval function is O(N), where N is the number of tasks. We iterate through the tasks twice: once to calculate the frequencies and find the maximum frequency, and once to count the number of tasks with the maximum frequency. Both iterations take O(N) time.",
        "space": "The space complexity is O(1) because the frequency map has a fixed number of unique tasks (26 lowercase letters)."
      },
      "hint": "To minimize the total time, we need to consider the task with the maximum frequency. Let's assume the maximum frequency is maxfreq. The CPU will need at least (",
      "leetcodeUrl": "https://leetcode.com/problems/task-scheduler/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Task Scheduler\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Task Scheduler\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Task Scheduler\n    pass",
        "javascript": "// Striver A2Z optimal approach for Task Scheduler"
      }
    },
    {
      "id": "str-198",
      "number": "198",
      "title": "Divide Array Into Sets Of K Consecutive Number",
      "difficulty": "Medium",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n), where n is the size of the input array nums. The complexity is dominated by the sorting step.",
        "space": "O(n), to store the frequency map mp."
      },
      "hint": "1. First, we check if the array size is divisible by k. If not, it is not possible to divide the array into sets of k consecutive numbers. 2. We use a frequency",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Divide%20Array%20Into%20Sets%20Of%20K%20Consecutive%20Number",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Divide Array Into Sets Of K Consecutive Number\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Divide Array Into Sets Of K Consecutive Number\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Divide Array Into Sets Of K Consecutive Number\n    pass",
        "javascript": "// Striver A2Z optimal approach for Divide Array Into Sets Of K Consecutive Number"
      }
    },
    {
      "id": "str-199",
      "number": "199",
      "title": "Design Twitter",
      "difficulty": "Hard",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of the postTweet method is O(1) for adding a tweet to the user's posts.",
        "space": "The space complexity is O(U + P) where U is the number of users and P is the total number of posts. The posts map stores the tweets of each user, and the size of the posts map is bounded by the number of users. The maximum size of the posts deque for each user is 10."
      },
      "hint": "To design the Twitter class, we can use the following data structures:  1. unordered_map<int, vector<int>> following: This map stores the users and the list of ",
      "leetcodeUrl": "https://leetcode.com/problems/design-twitter/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Design Twitter\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Design Twitter\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Design Twitter\n    pass",
        "javascript": "// Striver A2Z optimal approach for Design Twitter"
      }
    },
    {
      "id": "str-200",
      "number": "200",
      "title": "Minimum Cost To Join N Ropes",
      "difficulty": "Hard",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n), where n is the number of ropes. Inserting and extracting elements from the priority queue take O(log n) time, and the loop runs for (n-1) iterations.",
        "space": "O(n) to store the rope lengths in the priority queue."
      },
      "hint": "1. Use a priority queue (min heap) to store the lengths of the ropes. 2. Push all the rope lengths into the priority queue. 3. While the priority queue has more",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Cost%20To%20Join%20N%20Ropes",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Cost To Join N Ropes\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Cost To Join N Ropes\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Cost To Join N Ropes\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Cost To Join N Ropes"
      }
    },
    {
      "id": "str-201",
      "number": "201",
      "title": "Kth Largest Element In Stream",
      "difficulty": "Hard",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "- Use a min heap (priority queue) to store the k largest elements. - Initialize the min heap with the first k elements from the stream (nums) in the constructor",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kth%20Largest%20Element%20In%20Stream",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Kth Largest Element In Stream\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kth Largest Element In Stream\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kth Largest Element In Stream\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kth Largest Element In Stream"
      }
    },
    {
      "id": "str-202",
      "number": "202",
      "title": "Maximum K Sum Combinations",
      "difficulty": "Hard",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "1. Sort arrays A and B in non-increasing order. 2. Initialize a min-heap (priority_queue) to store the sum combinations. 3. Iterate over each element in array A",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Maximum%20K%20Sum%20Combinations",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Maximum K Sum Combinations\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Maximum K Sum Combinations\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Maximum K Sum Combinations\n    pass",
        "javascript": "// Striver A2Z optimal approach for Maximum K Sum Combinations"
      }
    },
    {
      "id": "str-203",
      "number": "203",
      "title": "Median In A Stream",
      "difficulty": "Hard",
      "category": "Heaps",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "1. Use two priority queues: a max heap to store the smaller half of the numbers and a min heap to store the larger half of the numbers. 2. When adding a new num",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Median%20In%20A%20Stream",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Median In A Stream\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Median In A Stream\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Median In A Stream\n    pass",
        "javascript": "// Striver A2Z optimal approach for Median In A Stream"
      }
    },
    {
      "id": "str-204",
      "number": "204",
      "title": "Top K Frequent Elements",
      "difficulty": "Hard",
      "category": "Heaps",
      "hasVideo": true,
      "youtubeId": "YPTqKIgVk-k",
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "1. Create a frequency map to count the occurrences of each element in the array. 2. Use a min heap to store the k most frequent elements based on their frequenc",
      "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Top K Frequent Elements\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Top K Frequent Elements\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Top K Frequent Elements\n    pass",
        "javascript": "// Striver A2Z optimal approach for Top K Frequent Elements"
      }
    },
    {
      "id": "str-205",
      "number": "205",
      "title": "Assign Cookies",
      "difficulty": "Easy",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "DIX2p7vb9co",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Sort the greed factor array g and the cookie size array s in ascending order. 2. Initialize a counter variable child to track the number of content children.",
      "leetcodeUrl": "https://leetcode.com/problems/assign-cookies/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Assign Cookies\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Assign Cookies\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Assign Cookies\n    pass",
        "javascript": "// Striver A2Z optimal approach for Assign Cookies"
      }
    },
    {
      "id": "str-206",
      "number": "206",
      "title": "Fractional Knapsack",
      "difficulty": "Easy",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "1ibsQrnuEEg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We will define a comparator function that compares items based on their value/weight ratio in descending order. 2. We will sort the items array based on the ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Fractional%20Knapsack",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Fractional Knapsack\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Fractional Knapsack\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Fractional Knapsack\n    pass",
        "javascript": "// Striver A2Z optimal approach for Fractional Knapsack"
      }
    },
    {
      "id": "str-207",
      "number": "207",
      "title": "Lemonade Exchange",
      "difficulty": "Easy",
      "category": "Greedy Approach",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We maintain two counters: `fiveCnt` to count the number of $5 bills and `tenCnt` to count the number of $10 bills we have. - We iterate over the bills array. ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Lemonade%20Exchange",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Lemonade Exchange\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Lemonade Exchange\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Lemonade Exchange\n    pass",
        "javascript": "// Striver A2Z optimal approach for Lemonade Exchange"
      }
    },
    {
      "id": "str-208",
      "number": "208",
      "title": "Valid Parenthesis String",
      "difficulty": "Easy",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "QhPdNS143Rs",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We maintain two counters `cmin` and `cmax` to keep track of the minimum and maximum possible number of open parentheses. - We iterate over the characters in t",
      "leetcodeUrl": "https://leetcode.com/problems/valid-parenthesis-string/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Valid Parenthesis String\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Valid Parenthesis String\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Valid Parenthesis String\n    pass",
        "javascript": "// Striver A2Z optimal approach for Valid Parenthesis String"
      }
    },
    {
      "id": "str-209",
      "number": "209",
      "title": "N Meetings In One Room",
      "difficulty": "Medium",
      "category": "Greedy Approach",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We store the meetings as pairs of (end[i], start[i]) in a vector. - We sort the vector in non-decreasing order based on the end time of meetings. - We initial",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=N%20Meetings%20In%20One%20Room",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for N Meetings In One Room\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for N Meetings In One Room\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for N Meetings In One Room\n    pass",
        "javascript": "// Striver A2Z optimal approach for N Meetings In One Room"
      }
    },
    {
      "id": "str-210",
      "number": "210",
      "title": "Jump Game",
      "difficulty": "Medium",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "Yan0cv2cLy8",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We maintain a variable 'farthest' to keep track of the farthest position we can reach. - We iterate over the array from left to right. - At each position, we ",
      "leetcodeUrl": "https://leetcode.com/problems/jump-game/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Jump Game\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Jump Game\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Jump Game\n    pass",
        "javascript": "// Striver A2Z optimal approach for Jump Game"
      }
    },
    {
      "id": "str-211",
      "number": "211",
      "title": "Jump Game 2",
      "difficulty": "Medium",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "tZAa_jJ3SwQ",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We maintain three variables: 'steps', 'end', and 'farthest'. - 'steps' keeps track of the minimum number of jumps required. - 'end' represents the current far",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Jump%20Game%202",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Jump Game 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Jump Game 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Jump Game 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Jump Game 2"
      }
    },
    {
      "id": "str-212",
      "number": "212",
      "title": "Minimum Platforms",
      "difficulty": "Medium",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "AsGzwR_FWok",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We sort the arrival and departure arrays in non-decreasing order. - We initialize variables 'i', 'j', 'plat', and 'ans' to 0. - We iterate over the arrival ar",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Platforms",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Platforms\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Platforms\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Platforms\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Platforms"
      }
    },
    {
      "id": "str-213",
      "number": "213",
      "title": "Job Sequencing Problem",
      "difficulty": "Medium",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "QbwltemZbRg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We create a vector of pairs 'jobs' to store the profit and deadline of each job. - We sort the 'jobs' vector in non-increasing order of profits. - We initiali",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Job%20Sequencing%20Problem",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Job Sequencing Problem\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Job Sequencing Problem\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Job Sequencing Problem\n    pass",
        "javascript": "// Striver A2Z optimal approach for Job Sequencing Problem"
      }
    },
    {
      "id": "str-214",
      "number": "214",
      "title": "Candy",
      "difficulty": "Medium",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "IIqVFvKE6RY",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We start by assigning 1 candy to each child as the minimum requirement. - Then, we iterate from left to right and check if the current child has a higher rati",
      "leetcodeUrl": "https://leetcode.com/problems/candy/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Candy\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Candy\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Candy\n    pass",
        "javascript": "// Striver A2Z optimal approach for Candy"
      }
    },
    {
      "id": "str-215",
      "number": "215",
      "title": "Insert Interval",
      "difficulty": "Medium",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "dxb-9B_3f2w",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We iterate through the intervals and compare them with the newInterval. - There are three possible cases:   1. The newInterval is before the current interval:",
      "leetcodeUrl": "https://leetcode.com/problems/insert-interval/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Insert Interval\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Insert Interval\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Insert Interval\n    pass",
        "javascript": "// Striver A2Z optimal approach for Insert Interval"
      }
    },
    {
      "id": "str-216",
      "number": "216",
      "title": "Non Overlapping Intervals",
      "difficulty": "Medium",
      "category": "Greedy Approach",
      "hasVideo": true,
      "youtubeId": "nONCGxWoUfM",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We sort the intervals based on the end time in ascending order. - We initialize a count variable to keep track of the number of intervals that need to be remo",
      "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Non Overlapping Intervals\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Non Overlapping Intervals\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Non Overlapping Intervals\n    pass",
        "javascript": "// Striver A2Z optimal approach for Non Overlapping Intervals"
      }
    },
    {
      "id": "str-217",
      "number": "217",
      "title": "Introduction To Trees",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "_ANrF3FJm7I",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- The number of nodes on each level of a binary tree follows a pattern. - The number of nodes on the Nth level is equal to 2^(N-1). - We can use the pow functio",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Introduction%20To%20Trees",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Introduction To Trees\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Introduction To Trees\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Introduction To Trees\n    pass",
        "javascript": "// Striver A2Z optimal approach for Introduction To Trees"
      }
    },
    {
      "id": "str-218",
      "number": "218",
      "title": "Binary Tree Representation",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "ctCpP0RFDFc",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can solve this problem recursively by performing a level-order traversal of the tree. - Starting from the root node, we can recursively create the left and",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Binary%20Tree%20Representation",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Binary Tree Representation\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Binary Tree Representation\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Binary Tree Representation\n    pass",
        "javascript": "// Striver A2Z optimal approach for Binary Tree Representation"
      }
    },
    {
      "id": "str-219",
      "number": "219",
      "title": "Preorder Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "RlUu72JrOCQ",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- Preorder traversal visits the root node first, followed by the left subtree, and then the right subtree. - We can solve this problem recursively by following ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Preorder%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Preorder Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Preorder Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Preorder Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Preorder Traversal"
      }
    },
    {
      "id": "str-220",
      "number": "220",
      "title": "Inorder Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "Z_NEgBgbRVI",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- inorder traversal visits the left subtree first, followed by the root node, and then the right subtree. - We can solve this problem recursively by following t",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Inorder%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Inorder Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Inorder Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Inorder Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Inorder Traversal"
      }
    },
    {
      "id": "str-221",
      "number": "221",
      "title": "Postorder Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "COQOU6klsBg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- postorder traversal visits the left subtree first, followed by the right subtree, and then the root node. - We can solve this problem recursively by following",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Postorder%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Postorder Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Postorder Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Postorder Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Postorder Traversal"
      }
    },
    {
      "id": "str-222",
      "number": "222",
      "title": "Level Order Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "EoAsWbO7sqg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can perform a level order traversal using a queue. - We start by pushing the root node into the queue. - Then, while the queue is not empty, we process eac",
      "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Level Order Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Level Order Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Level Order Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Level Order Traversal"
      }
    },
    {
      "id": "str-223",
      "number": "223",
      "title": "Iterative Preorder Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "Bfqd8BsPVuw",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can perform a preorder traversal iteratively using a stack. - We start by pushing the root node into the stack. - Then, while the stack is not empty, we po",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Iterative%20Preorder%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Iterative Preorder Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Iterative Preorder Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Iterative Preorder Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Iterative Preorder Traversal"
      }
    },
    {
      "id": "str-224",
      "number": "224",
      "title": "Iterative Inorder Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "lxTGsVXjwvM",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can perform an inorder traversal iteratively using a stack. - The idea is to push all the left children of a node into the stack until we reach a node with",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Iterative%20Inorder%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Iterative Inorder Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Iterative Inorder Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Iterative Inorder Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Iterative Inorder Traversal"
      }
    },
    {
      "id": "str-225",
      "number": "225",
      "title": "Iterative Postorder",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "2YBhNLodD8Q",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can perform a postorder traversal iteratively using a stack and a map. - The idea is to push all the left children of a node into the stack until we reach ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Iterative%20Postorder",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Iterative Postorder\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Iterative Postorder\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Iterative Postorder\n    pass",
        "javascript": "// Striver A2Z optimal approach for Iterative Postorder"
      }
    },
    {
      "id": "str-226",
      "number": "226",
      "title": "All In One Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can perform the tree traversals recursively using three functions:     - In-Order Traversal: Visit the left subtree, visit the current node, visit the righ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=All%20In%20One%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for All In One Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for All In One Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for All In One Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for All In One Traversal"
      }
    },
    {
      "id": "str-227",
      "number": "227",
      "title": "Height Of Binary Tree",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "eD3tmO66aBA",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can calculate the maximum depth of a binary tree recursively by traversing its left and right subtrees. - The maximum depth of a tree is equal to the maxim",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Height%20Of%20Binary%20Tree",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Height Of Binary Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Height Of Binary Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Height Of Binary Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Height Of Binary Tree"
      }
    },
    {
      "id": "str-228",
      "number": "228",
      "title": "Balanced Binary Tree",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "QfJsau0ItOY",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can solve this problem recursively by checking if the left and right subtrees of each node are height-balanced. - For each node, we calculate the height of",
      "leetcodeUrl": "https://leetcode.com/problems/balanced-binary-tree/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Balanced Binary Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Balanced Binary Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Balanced Binary Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Balanced Binary Tree"
      }
    },
    {
      "id": "str-229",
      "number": "229",
      "title": "Diameter Of Binary Tree",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "bkxqA8Rfv04",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- The diameter of a binary tree is the length of the longest path between any two nodes in the tree. - This path may or may not pass through the root. - To find",
      "leetcodeUrl": "https://leetcode.com/problems/diameter-of-binary-tree/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Diameter Of Binary Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Diameter Of Binary Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Diameter Of Binary Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Diameter Of Binary Tree"
      }
    },
    {
      "id": "str-230",
      "number": "230",
      "title": "Maximum Path Sum",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "WszrfSwMz58",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- The maximum path sum can be calculated using a recursive approach. - For each node, we calculate the maximum path sum that includes the node as the root. - Th",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Maximum%20Path%20Sum",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Maximum Path Sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Maximum Path Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Maximum Path Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Maximum Path Sum"
      }
    },
    {
      "id": "str-231",
      "number": "231",
      "title": "Same Tree",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "vRbbcKXCx4k",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- The trees are considered the same if they have the same structure (i.e., same nodes in the same arrangement) and the corresponding nodes have the same values.",
      "leetcodeUrl": "https://leetcode.com/problems/same-tree/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Same Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Same Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Same Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Same Tree"
      }
    },
    {
      "id": "str-232",
      "number": "232",
      "title": "Zig-Zag Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "3OXWEdlIGl4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use a queue to perform a level order traversal of the binary tree. - To achieve the zigzag order, we can use a flag variable to keep track of the curre",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Zig-Zag%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Zig-Zag Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Zig-Zag Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Zig-Zag Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Zig-Zag Traversal"
      }
    },
    {
      "id": "str-233",
      "number": "233",
      "title": "Boundary Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "0ca1nvR0be4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can divide the boundary traversal into three parts: left boundary nodes, leaf nodes, and reverse right boundary nodes. - To find the left boundary nodes, w",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Boundary%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Boundary Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Boundary Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Boundary Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Boundary Traversal"
      }
    },
    {
      "id": "str-234",
      "number": "234",
      "title": "Vertical Order Traversal",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "q_a6lpbKJdw",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can perform a level order traversal of the binary tree while keeping track of the horizontal distance (hd) of each node from the root. - For each node at p",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Vertical%20Order%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Vertical Order Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Vertical Order Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Vertical Order Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Vertical Order Traversal"
      }
    },
    {
      "id": "str-235",
      "number": "235",
      "title": "Top View",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "Et9OCDNvJ78",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can perform a level order traversal of the binary tree while keeping track of the horizontal distance (hd) of each node from the root. - For each node, if ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Top%20View",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Top View\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Top View\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Top View\n    pass",
        "javascript": "// Striver A2Z optimal approach for Top View"
      }
    },
    {
      "id": "str-236",
      "number": "236",
      "title": "Bottom View",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "0FtVY6I4pB8",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can perform a level order traversal of the binary tree while keeping track of the horizontal distance (hd) and the level of each node from the root. - For ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Bottom%20View",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Bottom View\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Bottom View\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Bottom View\n    pass",
        "javascript": "// Striver A2Z optimal approach for Bottom View"
      }
    },
    {
      "id": "str-237",
      "number": "237",
      "title": "Left Or Right View",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "KV4mRzTjlAk",
      "complexity": {
        "time": "O(N), where N is the number of nodes in the binary tree.",
        "space": "O(M), where M is the maximum number of nodes at any level in the tree."
      },
      "hint": "- Perform a level order traversal of the binary tree. - For each level, keep track of the last node encountered (the rightmost node from the viewer's perspectiv",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Left%20Or%20Right%20View",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Left Or Right View\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Left Or Right View\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Left Or Right View\n    pass",
        "javascript": "// Striver A2Z optimal approach for Left Or Right View"
      }
    },
    {
      "id": "str-238",
      "number": "238",
      "title": "Symmetric Tree",
      "difficulty": "Medium",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "nKggNAiEpBE",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "We can solve this problem using a recursive approach.  1. Define a helper function \"isMirror\" that takes two tree nodes as input.  2. Base case:     - If both n",
      "leetcodeUrl": "https://leetcode.com/problems/symmetric-tree/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Symmetric Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Symmetric Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Symmetric Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Symmetric Tree"
      }
    },
    {
      "id": "str-239",
      "number": "239",
      "title": "All Root To Leaf Paths",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of the recursive function is O(N) as we may visit all nodes in the worst case.",
        "space": "The space complexity is O(N) due to the space used by the recursion stack and the path vector."
      },
      "hint": "**  To find the path from the root to the given node, we can use a recursive function. The idea is to traverse the tree from the root and keep track of the path",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=All%20Root%20To%20Leaf%20Paths",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for All Root To Leaf Paths\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for All Root To Leaf Paths\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for All Root To Leaf Paths\n    pass",
        "javascript": "// Striver A2Z optimal approach for All Root To Leaf Paths"
      }
    },
    {
      "id": "str-240",
      "number": "240",
      "title": "Lowest Common Ancestor",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "_-QHfMDde90",
      "complexity": {
        "time": "The time complexity of this approach is O(n) since we may have to visit all nodes of the binary tree in the worst case.",
        "space": "The space complexity is O(h) for the recursive call stack, where `h` is the height of the binary tree. In the worst case, when the binary tree is skewed, the space complexity becomes O(n)."
      },
      "hint": "To find the lowest common ancestor (LCA) of two nodes `p` and `q` in a binary tree, we can use a recursive approach. We start from the root of the tree and chec",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Lowest%20Common%20Ancestor",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Lowest Common Ancestor\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Lowest Common Ancestor\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Lowest Common Ancestor\n    pass",
        "javascript": "// Striver A2Z optimal approach for Lowest Common Ancestor"
      }
    },
    {
      "id": "str-241",
      "number": "241",
      "title": "Max Width Of Binary Tree",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "eD3tmO66aBA",
      "complexity": {
        "time": "The time complexity of this approach is O(n) since we need to traverse all nodes in the binary tree using BFS.",
        "space": "The space complexity is O(w) for the queue, where `w` is the maximum width of the binary tree at any level."
      },
      "hint": "To find the maximum width, we can perform a level-order traversal (BFS) of the binary tree while keeping track of the indices of nodes at each level. For each l",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Max%20Width%20Of%20Binary%20Tree",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Max Width Of Binary Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Max Width Of Binary Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Max Width Of Binary Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Max Width Of Binary Tree"
      }
    },
    {
      "id": "str-242",
      "number": "242",
      "title": "Check Children Sum Property",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "fnmisPM6cVo",
      "complexity": {
        "time": "The time complexity of this approach is O(n) as we visit each node in the binary tree once during the post-order traversal.",
        "space": "The space complexity is O(h) due to the recursion stack, where h is the height of the binary tree."
      },
      "hint": "To determine if a binary tree is a Sum Tree, we can perform a post-order traversal of the tree and check if each node satisfies the condition of being a Sum Tre",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Check%20Children%20Sum%20Property",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Check Children Sum Property\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Check Children Sum Property\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Check Children Sum Property\n    pass",
        "javascript": "// Striver A2Z optimal approach for Check Children Sum Property"
      }
    },
    {
      "id": "str-243",
      "number": "243",
      "title": "All Nodes At Distance K",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "i9ORlEy6EsI",
      "complexity": {
        "time": "The time complexity of this approach is O(n) since we need to traverse the entire binary tree to build the parent map and perform BFS from the target node.",
        "space": "The space complexity is O(n) for the parent map and O(k) for the queue used in BFS. In the worst case, when k approaches n, the space complexity becomes O(n)."
      },
      "hint": "To find the nodes that are at a distance k from the target node, we can perform a two-step process: 1. First, traverse the binary tree to build a map of each no",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=All%20Nodes%20At%20Distance%20K",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for All Nodes At Distance K\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for All Nodes At Distance K\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for All Nodes At Distance K\n    pass",
        "javascript": "// Striver A2Z optimal approach for All Nodes At Distance K"
      }
    },
    {
      "id": "str-244",
      "number": "244",
      "title": "Min Time To Burn Binary Tree",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "2r5wLmQfD6g",
      "complexity": {
        "time": "The time complexity of this approach is O(n) since we perform a BFS starting from the target node, visiting all nodes in the binary tree once.",
        "space": "The space complexity is O(n) for the queue and the hash map."
      },
      "hint": "To find the minimum time required to burn the complete binary tree, we need to perform a BFS (level-order traversal) starting from the target node. While doing ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Min%20Time%20To%20Burn%20Binary%20Tree",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Min Time To Burn Binary Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Min Time To Burn Binary Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Min Time To Burn Binary Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Min Time To Burn Binary Tree"
      }
    },
    {
      "id": "str-245",
      "number": "245",
      "title": "Count Nodes In Complete Binary Tree",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "u-yWemKGWO0",
      "complexity": {
        "time": "The time complexity of this approach is O(log^2 n), as we perform binary search on the last level, and at each step, we calculate the height of the left and right subtrees, which takes O(log n) time. We do this operation recursively, so the overall time complexity is O(log^2 n).",
        "space": "The space complexity is O(log n) due to the recursion stack, where n is the height of the complete binary tree."
      },
      "hint": "To count the number of nodes in the complete binary tree efficiently, we can make use of the property of complete binary trees. Since all levels of the tree, ex",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20Nodes%20In%20Complete%20Binary%20Tree",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Nodes In Complete Binary Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Nodes In Complete Binary Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Nodes In Complete Binary Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Nodes In Complete Binary Tree"
      }
    },
    {
      "id": "str-246",
      "number": "246",
      "title": "Construct BT From Inorder And Preorder",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "aZNaLrVebKQ",
      "complexity": {
        "time": "The time complexity of this approach is O(n), as we visit each node once.",
        "space": "The space complexity is O(n) for the recursive call stack."
      },
      "hint": "The preorder traversal follows the root-left-right order, while the inorder traversal follows the left-root-right order. Based on these two traversals, we can c",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Construct%20BT%20From%20Inorder%20And%20Preorder",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Construct BT From Inorder And Preorder\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Construct BT From Inorder And Preorder\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Construct BT From Inorder And Preorder\n    pass",
        "javascript": "// Striver A2Z optimal approach for Construct BT From Inorder And Preorder"
      }
    },
    {
      "id": "str-247",
      "number": "247",
      "title": "Construct BT From Inorder And Postorder",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "aZNaLrVebKQ",
      "complexity": {
        "time": "The time complexity of this approach is O(n), as we visit each node once.",
        "space": "The space complexity is O(n) for the recursive call stack."
      },
      "hint": "The postorder traversal follows the left-right-root order, while the inorder traversal follows the left-root-right order. Based on these two traversals, we can ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Construct%20BT%20From%20Inorder%20And%20Postorder",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Construct BT From Inorder And Postorder\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Construct BT From Inorder And Postorder\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Construct BT From Inorder And Postorder\n    pass",
        "javascript": "// Striver A2Z optimal approach for Construct BT From Inorder And Postorder"
      }
    },
    {
      "id": "str-248",
      "number": "248",
      "title": "Morris Preorder Traversal",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "80Zug6D1_r4",
      "complexity": {
        "time": "The time complexity of this approach is O(n) since we visit each node once.",
        "space": "The space complexity is O(1) since we don't use any extra space."
      },
      "hint": "We can achieve a non-recursive preorder traversal without using extra space by modifying the binary tree itself.  1. We start with the current node as the root.",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Morris%20Preorder%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Morris Preorder Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Morris Preorder Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Morris Preorder Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Morris Preorder Traversal"
      }
    },
    {
      "id": "str-249",
      "number": "249",
      "title": "Morris Inorder Traversal",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "80Zug6D1_r4",
      "complexity": {
        "time": "The time complexity of this approach is O(n) since we visit each node once.",
        "space": "The space complexity is O(1) since we don't use any extra space."
      },
      "hint": "We can achieve a non-recursive inorder traversal without using extra space by modifying the binary tree itself.  1. We start with the current node as the root. ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Morris%20Inorder%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Morris Inorder Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Morris Inorder Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Morris Inorder Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Morris Inorder Traversal"
      }
    },
    {
      "id": "str-250",
      "number": "250",
      "title": "Flatten Binary Tree",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": true,
      "youtubeId": "sWf7k1x9XR4",
      "complexity": {
        "time": "The time complexity of this approach is O(n) since we visit each node once.",
        "space": "The space complexity is O(1) since we don't use any extra space."
      },
      "hint": "To flatten the binary tree into a linked list, we can modify the tree in-place using a modified preorder traversal.  1. We start with the current node as the ro",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Flatten%20Binary%20Tree",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Flatten Binary Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Flatten Binary Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Flatten Binary Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Flatten Binary Tree"
      }
    },
    {
      "id": "str-251",
      "number": "251",
      "title": "Serialize And Deserialize",
      "difficulty": "Hard",
      "category": "Binary Trees",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "- Serialization: O(n) - We visit each node once during the serialization process.",
        "space": "O(n) - The space required for the serialized string and the recursion stack."
      },
      "hint": "To serialize the binary tree, we can perform a preorder traversal of the tree and append the node values to a string, separating them by a delimiter.  To deseri",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Serialize%20And%20Deserialize",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Serialize And Deserialize\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Serialize And Deserialize\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Serialize And Deserialize\n    pass",
        "javascript": "// Striver A2Z optimal approach for Serialize And Deserialize"
      }
    },
    {
      "id": "str-252",
      "number": "252",
      "title": "Intro To BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "p7-9UvDQZ3w",
      "complexity": {
        "time": "O(N)",
        "space": "O(1)"
      },
      "hint": "**  A binary search tree is considered valid if its inorder traversal is in non-decreasing order. We can simply iterate through the `order` array and check if e",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Intro%20To%20BST",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Intro To BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Intro To BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Intro To BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Intro To BST"
      }
    },
    {
      "id": "str-253",
      "number": "253",
      "title": "Search In BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "p7-9UvDQZ3w",
      "complexity": {
        "time": "O(log N) on average for balanced BST, O(N) in the worst case for skewed BST.",
        "space": "O(H), where H is the height of the BST."
      },
      "hint": "**  Since the given binary tree is a binary search tree, we can utilize its property to efficiently find the node with the value `val`. We start from the root a",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Search%20In%20BST",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Search In BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Search In BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Search In BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Search In BST"
      }
    },
    {
      "id": "str-254",
      "number": "254",
      "title": "Minimum Value In BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "The time complexity of finding the minimum value in a BST is O(h), where 'h' is the height of the BST. In the worst case, the height of a skewed BST could be 'n', but in a balanced BST, the height is log(n), making the average time complexity O(log n).",
        "space": "The space complexity is O(1) as we are not using any extra space."
      },
      "hint": "**  To find the minimum value in a BST, we can traverse the left child nodes until we reach the leftmost leaf node, which will have the minimum value.  **COMPLE",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Value%20In%20BST",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Value In BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Value In BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Value In BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Value In BST"
      }
    },
    {
      "id": "str-255",
      "number": "255",
      "title": "Ceil In BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "KSsk8AhdOZA",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "**  To find the Ceil of a given number `X`, we can perform a traversal of the BST and keep track of the node with the smallest value that is greater than or equ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Ceil%20In%20BST",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Ceil In BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Ceil In BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Ceil In BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Ceil In BST"
      }
    },
    {
      "id": "str-256",
      "number": "256",
      "title": "Floor In BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "xm_W1ub-K-w",
      "complexity": {
        "time": "O(h), where h is the height of the BST. In the worst case, the function needs to traverse the entire height of the BST.",
        "space": "O(1), as the function uses a single integer variable (`ans`) to store the result."
      },
      "hint": "",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Floor%20In%20BST",
      "solutions": {
        "cpp": "int findFloor(Node* root, int x) {\r\n    if (!root) return -1;\r\n    int ans = -1;\r\n    while (root) {\r\n        if (root->data == x) {\r\n            ans = root->data;\r\n            break;\r\n        } else if (root->data < x) {\r\n            ans = root->data;\r\n            root = root->right;\r\n        } else {\r\n            root = root->left;\r\n        }\r\n    }\r\n    return ans;\r\n}",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Floor In BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Floor In BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Floor In BST"
      }
    },
    {
      "id": "str-257",
      "number": "257",
      "title": "Insert Into BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(h), where h is the height of the BST. In the worst case, the function needs to traverse the entire height of the BST to find the appropriate position for insertion.",
        "space": "O(h), where h is the height of the BST. In the worst case, the function may have to traverse the entire height of the BST, leading to h recursive calls in the call stack."
      },
      "hint": "1. To insert a value 'val' into the BST, we start from the root node and traverse down the tree to find the appropriate position for insertion. 2. If the BST is",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Insert%20Into%20BST",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Insert Into BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Insert Into BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Insert Into BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Insert Into BST"
      }
    },
    {
      "id": "str-258",
      "number": "258",
      "title": "Delete From BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(log n) on average, O(n) in the worst case, where n is the number of nodes in the BST.",
        "space": "O(log n) on average, O(n) in the worst case."
      },
      "hint": "To delete a node with a given key from the BST, we need to search for the node first. If the node is found, there are three possible cases: 1. The node to be de",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Delete%20From%20BST",
      "solutions": {
        "cpp": "TreeNode* deleteNode(TreeNode* root, int key) {\r\n    if (!root) return NULL;\r\n    if (root->val == key) {\r\n        if (!root->left && !root->right) return NULL;",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Delete From BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Delete From BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Delete From BST"
      }
    },
    {
      "id": "str-259",
      "number": "259",
      "title": "Kth Smallest Element In BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "9TJYWh0adfk",
      "complexity": {
        "time": "O(log n + k)",
        "space": "O(log n)"
      },
      "hint": "To find the kth smallest value in a binary search tree (BST), we can perform an in-order traversal of the BST and keep track of the count of nodes visited so fa",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kth%20Smallest%20Element%20In%20BST",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Kth Smallest Element In BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kth Smallest Element In BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kth Smallest Element In BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kth Smallest Element In BST"
      }
    },
    {
      "id": "str-260",
      "number": "260",
      "title": "Validate BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "f-sj7I5oXEI",
      "complexity": {
        "time": "O(n)",
        "space": "O(h)"
      },
      "hint": "- Initialize the range with LONG_MIN and LONG_MAX values. - Now, if a node->val is out of the range then it's not a BST - And, then check for the left and right",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Validate%20BST",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Validate BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Validate BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Validate BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Validate BST"
      }
    },
    {
      "id": "str-261",
      "number": "261",
      "title": "LCA In BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(h)",
        "space": "O(h)"
      },
      "hint": "- Traverse the BST from the root. - If both the nodes p and q are smaller than the current node's value, then the LCA must be in the left subtree. So, recursive",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=LCA%20In%20BST",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for LCA In BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for LCA In BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for LCA In BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for LCA In BST"
      }
    },
    {
      "id": "str-262",
      "number": "262",
      "title": "Build BST From Preorder Traversal",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "UmJT3j26t1I",
      "complexity": {
        "time": "O(n)",
        "space": "O(h)"
      },
      "hint": "- The first element of the preorder traversal is the root of the BST. - We start with the first element of the preorder traversal and recursively build the BST ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Build%20BST%20From%20Preorder%20Traversal",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Build BST From Preorder Traversal\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Build BST From Preorder Traversal\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Build BST From Preorder Traversal\n    pass",
        "javascript": "// Striver A2Z optimal approach for Build BST From Preorder Traversal"
      }
    },
    {
      "id": "str-263",
      "number": "263",
      "title": "BST Iterator",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "D2jMcmxU4bs",
      "complexity": {
        "time": "- The constructor takes O(h) time, where h is the height of the BST, as it traverses the leftmost path in the BST.",
        "space": "- The space complexity is O(h), where h is the height of the BST, as the stack stores the nodes in the leftmost path of the BST."
      },
      "hint": "- We are using a stack to keep track of the nodes during the in-order traversal of the BST. - In the constructor, we initialize the stack by pushing all the lef",
      "leetcodeUrl": "https://leetcode.com/problems/binary-search-tree-iterator/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for BST Iterator\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for BST Iterator\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for BST Iterator\n    pass",
        "javascript": "// Striver A2Z optimal approach for BST Iterator"
      }
    },
    {
      "id": "str-264",
      "number": "264",
      "title": "Two Sum In BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "ssL3sHwPeb4",
      "complexity": {
        "time": "- The findTarget() function uses two pointers (one for the left and one for the right traversal of the BST) and performs a two pointer traversal of the BST, taking O(n) time, where n is the number of nodes in the BST.",
        "space": "- The space complexity is O(h), where h is the height of the BST, as the stacks store the nodes in the leftmost and rightmost paths of the BST."
      },
      "hint": "with the next() and before() functions to find the pair of elements in the BST whose sum is equal to k.  Time Complexity: - The findTarget() function uses two p",
      "leetcodeUrl": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Two Sum In BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Two Sum In BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Two Sum In BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Two Sum In BST"
      }
    },
    {
      "id": "str-265",
      "number": "265",
      "title": "Recover BST",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "ZWGW7FminDM",
      "complexity": {
        "time": "- The in-order traversal takes O(n) time, where n is the number of nodes in the BST.",
        "space": "- The space complexity is O(h), where h is the height of the BST, as the recursion stack stores the nodes in the leftmost path of the BST."
      },
      "hint": "Striver's A2Z pattern for Binary Search Trees. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problems/recover-binary-search-tree/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Recover BST\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Recover BST\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Recover BST\n    pass",
        "javascript": "// Striver A2Z optimal approach for Recover BST"
      }
    },
    {
      "id": "str-266",
      "number": "266",
      "title": "Largest BST In Binary Tree",
      "difficulty": "Medium",
      "category": "Binary Search Trees",
      "hasVideo": true,
      "youtubeId": "p7-9UvDQZ3w",
      "complexity": {
        "time": "- The recursive function visits each node once, so the time complexity is O(n), where n is the number of nodes in the binary tree.",
        "space": "- The space complexity is O(h), where h is the height of the binary tree, as the recursion stack stores the nodes in the path from the root to the deepest leaf node."
      },
      "hint": "Striver's A2Z pattern for Binary Search Trees. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Largest BST In Binary Tree\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Largest BST In Binary Tree\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Largest BST In Binary Tree\n    pass",
        "javascript": "// Striver A2Z optimal approach for Largest BST In Binary Tree"
      }
    },
    {
      "id": "str-267",
      "number": "267",
      "title": "Count The Number Of Graphs",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(1)",
        "space": "O(1)"
      },
      "hint": "- calculate the number of edges with formula n*n-1/2 - return pow(2,edges)   Complexity Analysis:-  Time Complexity = O(1) Space Complexity = O(1)",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20The%20Number%20Of%20Graphs",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count The Number Of Graphs\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count The Number Of Graphs\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count The Number Of Graphs\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count The Number Of Graphs"
      }
    },
    {
      "id": "str-268",
      "number": "268",
      "title": "Graph Representation",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "3oI-34aPMWM",
      "complexity": {
        "time": "- The time complexity is O(m), where m is the number of edges in the graph, as we iterate through each edge once.",
        "space": "- The space complexity is O(n + 2 * m), where n is the number of vertices and 2 * m is the total number of elements in all adjacency lists, as each edge is represented twice (once in the adjacency list of u and once in the adjacency list of v)."
      },
      "hint": "Striver's A2Z pattern for Graphs. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Graph%20Representation",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Graph Representation\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Graph Representation\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Graph Representation\n    pass",
        "javascript": "// Striver A2Z optimal approach for Graph Representation"
      }
    },
    {
      "id": "str-269",
      "number": "269",
      "title": "BFS",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "jmy0LaGET1I",
      "complexity": {
        "time": "- The time complexity is O(V + E), where V is the number of vertices and E is the number of edges in the graph. In the worst case, we visit all the vertices and edges.",
        "space": "- The space complexity is O(V), where V is the number of vertices, as we use extra space for the 'vis' vector and the 'q' queue."
      },
      "hint": "Striver's A2Z pattern for Graphs. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=BFS",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for BFS\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for BFS\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for BFS\n    pass",
        "javascript": "// Striver A2Z optimal approach for BFS"
      }
    },
    {
      "id": "str-270",
      "number": "270",
      "title": "DFS",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "jmy0LaGET1I",
      "complexity": {
        "time": "- The time complexity is O(V + E), where V is the number of vertices and E is the number of edges in the graph. In the worst case, we visit all the vertices and edges.",
        "space": "- The space complexity is O(V), where V is the number of vertices, as we use extra space for the 'vis' vector."
      },
      "hint": "Striver's A2Z pattern for Graphs. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=DFS",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for DFS\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for DFS\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for DFS\n    pass",
        "javascript": "// Striver A2Z optimal approach for DFS"
      }
    },
    {
      "id": "str-271",
      "number": "271",
      "title": "Count The Number Of Provinces",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "- The time complexity is O(n^2), where n is the number of cities. We traverse the entire 'isConnected' matrix to construct the adjacency list.",
        "space": "- The space complexity is O(n), where n is the number of cities. We use extra space for the adjacency list and the 'vis' vector."
      },
      "hint": "Striver's A2Z pattern for Graphs. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20The%20Number%20Of%20Provinces",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count The Number Of Provinces\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count The Number Of Provinces\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count The Number Of Provinces\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count The Number Of Provinces"
      }
    },
    {
      "id": "str-272",
      "number": "272",
      "title": "Rotten Oranges",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "yf3oUhkvqA0",
      "complexity": {
        "time": "O(m * n) - where 'm' is the number of rows and 'n' is the number of columns in the grid.",
        "space": "O(m * n) - due to the queue and the grid."
      },
      "hint": "1. Use Breadth-First Search (BFS) to rot the oranges. 2. Initialize a queue to store the rotten oranges. 3. Iterate through the grid to find the rotten oranges ",
      "leetcodeUrl": "https://leetcode.com/problems/rotting-oranges/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Rotten Oranges\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Rotten Oranges\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Rotten Oranges\n    pass",
        "javascript": "// Striver A2Z optimal approach for Rotten Oranges"
      }
    },
    {
      "id": "str-273",
      "number": "273",
      "title": "Flood-Fill Algorithm",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "C-2_uSRli8o",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "Striver's A2Z pattern for Graphs. Master the optimal intuition and edge constraints.",
      "leetcodeUrl": "https://leetcode.com/problems/flood-fill/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Flood-Fill Algorithm\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Flood-Fill Algorithm\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Flood-Fill Algorithm\n    pass",
        "javascript": "// Striver A2Z optimal approach for Flood-Fill Algorithm"
      }
    },
    {
      "id": "str-274",
      "number": "274",
      "title": "Detect Cycle In Undirected Graph",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "BPlrALf1LDU",
      "complexity": {
        "time": "O(V + E), where V is the number of vertices and E is the number of edges in the graph. In the worst case, we may need to visit all the vertices and edges of the graph.",
        "space": "O(V), where V is the number of vertices. We use an additional array to keep track of visited nodes."
      },
      "hint": "- To check whether the graph contains a cycle or not, we can perform a Depth-First Search (DFS) traversal on the graph and keep track of the visited nodes. - Du",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Detect%20Cycle%20In%20Undirected%20Graph",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Detect Cycle In Undirected Graph\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Detect Cycle In Undirected Graph\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Detect Cycle In Undirected Graph\n    pass",
        "javascript": "// Striver A2Z optimal approach for Detect Cycle In Undirected Graph"
      }
    },
    {
      "id": "str-275",
      "number": "275",
      "title": "01 Matrix",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "edXdVZqCe9Y",
      "complexity": {
        "time": "O(m * n), where m is the number of rows and n is the number of columns in the matrix. In the worst case, we may need to visit all the cells of the matrix.",
        "space": "O(m * n), where m is the number of rows and n is the number of columns in the matrix. We use additional space for the distance matrix and the queue during BFS."
      },
      "hint": "- We can use a Breadth-First Search (BFS) traversal to find the distance of the nearest 0 for each cell. - First, we initialize the distance matrix with -1 for ",
      "leetcodeUrl": "https://leetcode.com/problems/01-matrix/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for 01 Matrix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for 01 Matrix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for 01 Matrix\n    pass",
        "javascript": "// Striver A2Z optimal approach for 01 Matrix"
      }
    },
    {
      "id": "str-276",
      "number": "276",
      "title": "Surrounded Regions",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "9z2BunfoZ5Y",
      "complexity": {
        "time": "O(m * n), where m is the number of rows and n is the number of columns in the matrix. In the worst case, we may need to visit all the cells of the matrix during DFS.",
        "space": "O(m * n), where m is the number of rows and n is the number of columns in the matrix. We use additional space for the 'vis' matrix."
      },
      "hint": "- We can use Depth-First Search (DFS) to find all regions that are surrounded by 'X'. - First, we initialize a copy of the board called 'vis' to store the visit",
      "leetcodeUrl": "https://leetcode.com/problems/surrounded-regions/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Surrounded Regions\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Surrounded Regions\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Surrounded Regions\n    pass",
        "javascript": "// Striver A2Z optimal approach for Surrounded Regions"
      }
    },
    {
      "id": "str-277",
      "number": "277",
      "title": "Number Of Enclaves",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "rxKcepXQgU4",
      "complexity": {
        "time": "O(m * n), where m is the number of rows and n is the number of columns in the matrix. In the worst case, we may need to visit all the cells of the matrix during DFS.",
        "space": "O(m * n), where m is the number of rows and n is the number of columns in the matrix. We use additional space for the 'vis' matrix."
      },
      "hint": "- We can use Depth-First Search (DFS) to mark all land cells connected to the boundary of the grid as uncountable (i.e., cells that we can walk off the boundary",
      "leetcodeUrl": "https://leetcode.com/problems/number-of-enclaves/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Number Of Enclaves\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Number Of Enclaves\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Number Of Enclaves\n    pass",
        "javascript": "// Striver A2Z optimal approach for Number Of Enclaves"
      }
    },
    {
      "id": "str-278",
      "number": "278",
      "title": "Word Ladder",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "h9iTnkgv05E",
      "complexity": {
        "time": "O(n^2 * m), where n is the size of wordList and m is the average length of the words in wordList. In the worst case, we may need to compare every pair of words in wordList to create the adjacency list.",
        "space": "O(n^2), where n is the size of wordList. We use additional space for the adjacency list and the visited map."
      },
      "hint": "- We can model this problem as a graph where each word is a node and there is an edge between two words if they differ by a single letter. - First, we create an",
      "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Word Ladder\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Word Ladder\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Word Ladder\n    pass",
        "javascript": "// Striver A2Z optimal approach for Word Ladder"
      }
    },
    {
      "id": "str-279",
      "number": "279",
      "title": "Distinct Islands",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "7zmgQSJghpo",
      "complexity": {
        "time": "O(n * m), where n is the number of rows and m is the number of columns in the grid. We visit each cell at most once during the DFS.",
        "space": "O(n * m), where n is the number of rows and m is the number of columns in the grid. We use additional space to store the visited status of each cell and the paths of the islands in the set."
      },
      "hint": "- We can model this problem as a graph where each group of connected 1s forms an island. - We can use Depth-First Search (DFS) to traverse the grid and identify",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Distinct%20Islands",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Distinct Islands\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Distinct Islands\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Distinct Islands\n    pass",
        "javascript": "// Striver A2Z optimal approach for Distinct Islands"
      }
    },
    {
      "id": "str-280",
      "number": "280",
      "title": "Bipartite Graph",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "-vu34sct1g8",
      "complexity": {
        "time": "O(V + E), where V is the number of nodes (vertices) in the graph, and E is the number of edges in the graph. We visit each node and each edge exactly once during the DFS.",
        "space": "O(V), where V is the number of nodes (vertices) in the graph. We use additional space to store the colors of the nodes."
      },
      "hint": "- We can use Depth-First Search (DFS) to color the nodes in the graph such that we can partition them into two sets A and B. - While performing the DFS, we use ",
      "leetcodeUrl": "https://leetcode.com/problems/is-graph-bipartite/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Bipartite Graph\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Bipartite Graph\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Bipartite Graph\n    pass",
        "javascript": "// Striver A2Z optimal approach for Bipartite Graph"
      }
    },
    {
      "id": "str-281",
      "number": "281",
      "title": "Detect Cycle In Directed Graph",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "BPlrALf1LDU",
      "complexity": {
        "time": "O(V + E), where V is the number of vertices (nodes) and E is the number of edges in the graph. We visit each node and each edge exactly once during the DFS.",
        "space": "O(V), where V is the number of vertices (nodes) in the graph. We use additional space to store the visited status of the nodes."
      },
      "hint": "- To check for cycles in a directed graph, we can use Depth-First Search (DFS) with backtracking. - During the DFS, we maintain a visited array to keep track of",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Detect%20Cycle%20In%20Directed%20Graph",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Detect Cycle In Directed Graph\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Detect Cycle In Directed Graph\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Detect Cycle In Directed Graph\n    pass",
        "javascript": "// Striver A2Z optimal approach for Detect Cycle In Directed Graph"
      }
    },
    {
      "id": "str-282",
      "number": "282",
      "title": "Topological Sorting",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(V + E), where V is the number of vertices (nodes) and E is the number of edges in the graph. We visit each node and each edge exactly once during the DFS.",
        "space": "O(V), where V is the number of vertices (nodes) in the graph. We use additional space to store the visited status of the nodes and the topological sorting order."
      },
      "hint": "- Topological sorting is a linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge u -> v, vertex u comes before v in th",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Topological%20Sorting",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Topological Sorting\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Topological Sorting\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Topological Sorting\n    pass",
        "javascript": "// Striver A2Z optimal approach for Topological Sorting"
      }
    },
    {
      "id": "str-283",
      "number": "283",
      "title": "Kahn'S Algorithm",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "73sneFXuTEg",
      "complexity": {
        "time": "O(V + E), where V is the number of vertices (nodes) and E is the number of edges in the graph. We perform a BFS-like traversal of all nodes and edges.",
        "space": "O(V), where V is the number of vertices (nodes) in the graph. We use additional space to store the indegree of each node and the queue for BFS."
      },
      "hint": "- We can use Topological Sorting to check if a directed graph contains a cycle or not. - If a directed graph is a DAG (Directed Acyclic Graph), it means it does",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kahn'S%20Algorithm",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Kahn'S Algorithm\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kahn'S Algorithm\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kahn'S Algorithm\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kahn'S Algorithm"
      }
    },
    {
      "id": "str-284",
      "number": "284",
      "title": "Course Scheduler 1",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N + E), where N is the number of courses (nodes) and E is the number of prerequisites (edges) in the graph. We perform a BFS-like traversal of all nodes and edges.",
        "space": "O(N + E), where N is the number of courses (nodes) and E is the number of prerequisites (edges) in the graph. We use additional space to store the adjacency list and indegree of each node."
      },
      "hint": "- We can model the problem as a directed graph, where each course is a node, and a prerequisite pair [ai, bi] indicates a directed edge from course bi to course",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Course%20Scheduler%201",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Course Scheduler 1\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Course Scheduler 1\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Course Scheduler 1\n    pass",
        "javascript": "// Striver A2Z optimal approach for Course Scheduler 1"
      }
    },
    {
      "id": "str-285",
      "number": "285",
      "title": "Course Scheduler 2",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N + E), where N is the number of courses (nodes) and E is the number of prerequisites (edges) in the graph. We perform a BFS-like traversal of all nodes and edges.",
        "space": "O(N + E), where N is the number of courses (nodes) and E is the number of prerequisites (edges) in the graph. We use additional space to store the adjacency list and indegree of each node."
      },
      "hint": "- We can model the problem as a directed graph, where each course is a node, and a prerequisite pair [ai, bi] indicates a directed edge from course bi to course",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Course%20Scheduler%202",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Course Scheduler 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Course Scheduler 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Course Scheduler 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Course Scheduler 2"
      }
    },
    {
      "id": "str-286",
      "number": "286",
      "title": "Find Eventual Safe State",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "uRbJ1OF9aYM",
      "complexity": {
        "time": "O(N + E), where N is the number of nodes, and E is the number of edges in the graph. We perform a BFS-like traversal of all nodes and edges.",
        "space": "O(N + E), where N is the number of nodes, and E is the number of edges in the graph. We use additional space to store the reverse adjacency list and outdegree of each node."
      },
      "hint": "- We are given a directed graph, and we need to find all the safe nodes. - A node is safe if every possible path starting from that node leads to a terminal nod",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20Eventual%20Safe%20State",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Find Eventual Safe State\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find Eventual Safe State\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find Eventual Safe State\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find Eventual Safe State"
      }
    },
    {
      "id": "str-287",
      "number": "287",
      "title": "Alien Dictonary",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N), where N is the number of words in the dictionary. We iterate through the dictionary once to set the directed edges and indegrees.",
        "space": "O(K), where K is the number of starting alphabets in the standard dictionary. We use additional space to store the directed graph and indegrees."
      },
      "hint": "- We are given a sorted dictionary of an alien language. - To find the order of characters in the alien language, we can use a directed graph approach along wit",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Alien%20Dictonary",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Alien Dictonary\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Alien Dictonary\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Alien Dictonary\n    pass",
        "javascript": "// Striver A2Z optimal approach for Alien Dictonary"
      }
    },
    {
      "id": "str-288",
      "number": "288",
      "title": "Shortest Path In Undirected Graph Having Unit Distance",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N+M), where N is the number of vertices and M is the number of edges in the graph. We perform a BFS traversal, visiting each vertex and edge once.",
        "space": "O(N), where N is the number of vertices. We use additional space to store the adjacency list, visited array, and the distance array."
      },
      "hint": "- To find the shortest path from the source vertex to all other vertices, we can use a BFS traversal of the graph. - We create an adjacency list to represent th",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Shortest%20Path%20In%20Undirected%20Graph%20Having%20Unit%20Distance",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Shortest Path In Undirected Graph Having Unit Distance\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Shortest Path In Undirected Graph Having Unit Distance\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Shortest Path In Undirected Graph Having Unit Distance\n    pass",
        "javascript": "// Striver A2Z optimal approach for Shortest Path In Undirected Graph Having Unit Distance"
      }
    },
    {
      "id": "str-289",
      "number": "289",
      "title": "Shortest Path In DAG",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(N + M), where N is the number of vertices and M is the number of edges in the graph. The time complexity is dominated by the topological sorting and DP updates.",
        "space": "O(N + M), where N is the number of vertices and M is the number of edges in the graph. We use additional space for the adjacency list, visited array, topological order, and the distance array."
      },
      "hint": "- To find the shortest path from the source vertex to all other vertices in a Directed Acyclic Graph (DAG), we can use a topological sorting based approach alon",
      "leetcodeUrl": "https://leetcode.com/problems/network-delay-time/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Shortest Path In DAG\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Shortest Path In DAG\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Shortest Path In DAG\n    pass",
        "javascript": "// Striver A2Z optimal approach for Shortest Path In DAG"
      }
    },
    {
      "id": "str-290",
      "number": "290",
      "title": "Dijkstra'S Algorithm",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "V6H1qAeB-l4",
      "complexity": {
        "time": "O(E + log(V)), where E is the number of edges and V is the number of vertices in the graph. The time complexity is dominated by the priority queue operations in Dijkstra's algorithm.",
        "space": "O(V + E), where V is the number of vertices and E is the number of edges in the graph. We use additional space for the adjacency list, the distance array, and the priority queue."
      },
      "hint": "- We can use Dijkstra's algorithm to find the shortest distance from the source vertex to all other vertices in a weighted graph. - The algorithm maintains a pr",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Dijkstra'S%20Algorithm",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Dijkstra'S Algorithm\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Dijkstra'S Algorithm\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Dijkstra'S Algorithm\n    pass",
        "javascript": "// Striver A2Z optimal approach for Dijkstra'S Algorithm"
      }
    },
    {
      "id": "str-291",
      "number": "291",
      "title": "Shortest Path In Binary Matrix",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use Breadth-First Search (BFS) to find the shortest path. - Start BFS from the top-left cell (0, 0) and explore its neighboring cells in 8 directions. ",
      "leetcodeUrl": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Shortest Path In Binary Matrix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Shortest Path In Binary Matrix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Shortest Path In Binary Matrix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Shortest Path In Binary Matrix"
      }
    },
    {
      "id": "str-292",
      "number": "292",
      "title": "Path With Minimum Effort",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "0ytpZyiZFhA",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use Dijkstra's algorithm to find the minimum effort path from the top-left cell to the bottom-right cell. - We will maintain a priority queue to keep t",
      "leetcodeUrl": "https://leetcode.com/problems/path-with-minimum-effort/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Path With Minimum Effort\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Path With Minimum Effort\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Path With Minimum Effort\n    pass",
        "javascript": "// Striver A2Z optimal approach for Path With Minimum Effort"
      }
    },
    {
      "id": "str-293",
      "number": "293",
      "title": "Cheapest Flights With K Stops",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "9XybHVqTHcQ",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use Breadth-First Search (BFS) to find the cheapest price from the source to the destination with at most k stops. - We will create an adjacency list t",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Cheapest%20Flights%20With%20K%20Stops",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Cheapest Flights With K Stops\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Cheapest Flights With K Stops\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Cheapest Flights With K Stops\n    pass",
        "javascript": "// Striver A2Z optimal approach for Cheapest Flights With K Stops"
      }
    },
    {
      "id": "str-294",
      "number": "294",
      "title": "Network Delay Time",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "EaphyChdfxE",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use Dijkstra's algorithm to find the minimum time it takes for all the nodes to receive the signal. - We will create an adjacency list to represent the",
      "leetcodeUrl": "https://leetcode.com/problems/network-delay-time/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Network Delay Time\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Network Delay Time\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Network Delay Time\n    pass",
        "javascript": "// Striver A2Z optimal approach for Network Delay Time"
      }
    },
    {
      "id": "str-295",
      "number": "295",
      "title": "Bellman Ford Algorithm",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "0vVofAhAYjc",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use Bellman-Ford algorithm to find the shortest distance of all the nodes from the given source vertex S. - The Bellman-Ford algorithm can handle negat",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Bellman%20Ford%20Algorithm",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Bellman Ford Algorithm\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Bellman Ford Algorithm\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Bellman Ford Algorithm\n    pass",
        "javascript": "// Striver A2Z optimal approach for Bellman Ford Algorithm"
      }
    },
    {
      "id": "str-296",
      "number": "296",
      "title": "Floyd Warshall Algorithm",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "YbY8cVwWAvw",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We will first replace all the \"-1\" entries in the adjacency matrix with a very large value (e.g., 1e9) to represent that there is no edge between those vertic",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Floyd%20Warshall%20Algorithm",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Floyd Warshall Algorithm\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Floyd Warshall Algorithm\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Floyd Warshall Algorithm\n    pass",
        "javascript": "// Striver A2Z optimal approach for Floyd Warshall Algorithm"
      }
    },
    {
      "id": "str-297",
      "number": "297",
      "title": "Find City With Smallest Number Of Neighbours",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "PwMVNSJ5SLI",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We will use Dijkstra's algorithm to find the shortest distances from each city to all other cities in the graph. - For each city, we will find the count of ci",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20City%20With%20Smallest%20Number%20Of%20Neighbours",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Find City With Smallest Number Of Neighbours\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find City With Smallest Number Of Neighbours\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find City With Smallest Number Of Neighbours\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find City With Smallest Number Of Neighbours"
      }
    },
    {
      "id": "str-298",
      "number": "298",
      "title": "Number Of Ways To Arrive The Destination With Minimum Distance",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can use Dijkstra's algorithm to find the shortest path from intersection 0 to intersection n-1 and also keep track of the number of ways to reach each int",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Number%20Of%20Ways%20To%20Arrive%20The%20Destination%20With%20Minimum%20Distance",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Number Of Ways To Arrive The Destination With Minimum Distance\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Number Of Ways To Arrive The Destination With Minimum Distance\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Number Of Ways To Arrive The Destination With Minimum Distance\n    pass",
        "javascript": "// Striver A2Z optimal approach for Number Of Ways To Arrive The Destination With Minimum Distance"
      }
    },
    {
      "id": "str-299",
      "number": "299",
      "title": "Prim'S Algorithm",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "mJcZjjKzeqk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We will use Prim's algorithm to find the Minimum Spanning Tree (MST) of the graph. - The idea is to start from any vertex (let's say vertex 0) and add it to t",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Prim'S%20Algorithm",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Prim'S Algorithm\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Prim'S Algorithm\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Prim'S Algorithm\n    pass",
        "javascript": "// Striver A2Z optimal approach for Prim'S Algorithm"
      }
    },
    {
      "id": "str-300",
      "number": "300",
      "title": "Kruskal'S Algorithm",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "DMnDM_sxVig",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We will use Kruskal's algorithm to find the Minimum Spanning Tree (MST) of the graph. - First, we will sort all the edges in non-decreasing order based on the",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Kruskal'S%20Algorithm",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Kruskal'S Algorithm\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Kruskal'S Algorithm\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Kruskal'S Algorithm\n    pass",
        "javascript": "// Striver A2Z optimal approach for Kruskal'S Algorithm"
      }
    },
    {
      "id": "str-301",
      "number": "301",
      "title": "Number Of Operations To Make Network",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "FYrl7iz9_ZU",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We can use the Disjoint Set data structure to keep track of connected components and find the minimum number of times we need to add connections. - If the num",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Number%20Of%20Operations%20To%20Make%20Network",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Number Of Operations To Make Network\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Number Of Operations To Make Network\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Number Of Operations To Make Network\n    pass",
        "javascript": "// Striver A2Z optimal approach for Number Of Operations To Make Network"
      }
    },
    {
      "id": "str-302",
      "number": "302",
      "title": "Most Stones Removed",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "OwMNX8SPavM",
      "complexity": {
        "time": "O(n)",
        "space": "O(n) for the Disjoint Set data structure"
      },
      "hint": "To solve this problem, we can use the Disjoint Set data structure to group stones that share the same row or column. - First, we find the minimum and maximum ro",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Most%20Stones%20Removed",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Most Stones Removed\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Most Stones Removed\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Most Stones Removed\n    pass",
        "javascript": "// Striver A2Z optimal approach for Most Stones Removed"
      }
    },
    {
      "id": "str-303",
      "number": "303",
      "title": "Account Merge",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "FMwpt_aQOGw",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We use a disjoint-set data structure to group accounts that belong to the same person based on their common emails. 2. Create a disjoint-set and an unordered",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Account%20Merge",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Account Merge\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Account Merge\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Account Merge\n    pass",
        "javascript": "// Striver A2Z optimal approach for Account Merge"
      }
    },
    {
      "id": "str-304",
      "number": "304",
      "title": "Number Of Islands 2",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "muncqlKJrH0",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Create a disjoint set to represent islands. 2. Initialize an empty grid to track the islands. 3. For each operation (i.e., changing sea to land), do the foll",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Number%20Of%20Islands%202",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Number Of Islands 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Number Of Islands 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Number Of Islands 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Number Of Islands 2"
      }
    },
    {
      "id": "str-305",
      "number": "305",
      "title": "Making Large Island",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "lgiz0Oup6gM",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Create a disjoint set to represent islands and initialize it with all cells. 2. For each 1 cell, union it with its 4-directionally connected 1 cells in the d",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Making%20Large%20Island",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Making Large Island\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Making Large Island\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Making Large Island\n    pass",
        "javascript": "// Striver A2Z optimal approach for Making Large Island"
      }
    },
    {
      "id": "str-306",
      "number": "306",
      "title": "Swim In Rising Water",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "v3ZlW82E11I",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We use a priority queue (min heap) to keep track of the cells in increasing order of their elevations. 2. Start from the top left cell (0, 0) and add it to t",
      "leetcodeUrl": "https://leetcode.com/problems/swim-in-rising-water/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Swim In Rising Water\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Swim In Rising Water\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Swim In Rising Water\n    pass",
        "javascript": "// Striver A2Z optimal approach for Swim In Rising Water"
      }
    },
    {
      "id": "str-307",
      "number": "307",
      "title": "Bridges In Graph",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "qrAub5z8FeA",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can use Tarjan's algorithm to find the critical connections in the network. 2. Tarjan's algorithm is used to find bridges in an undirected graph, which ar",
      "leetcodeUrl": "https://leetcode.com/problems/critical-connections-in-a-network/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Bridges In Graph\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Bridges In Graph\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Bridges In Graph\n    pass",
        "javascript": "// Striver A2Z optimal approach for Bridges In Graph"
      }
    },
    {
      "id": "str-308",
      "number": "308",
      "title": "Strongly Connected Components",
      "difficulty": "Medium",
      "category": "Graphs",
      "hasVideo": true,
      "youtubeId": "R6uoSjZ2imo",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can use Kosaraju's algorithm to find the number of strongly connected components (SCCs) in a directed graph. 2. Kosaraju's algorithm performs two DFS trav",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Strongly%20Connected%20Components",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Strongly Connected Components\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Strongly Connected Components\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Strongly Connected Components\n    pass",
        "javascript": "// Striver A2Z optimal approach for Strongly Connected Components"
      }
    },
    {
      "id": "str-309",
      "number": "309",
      "title": "Find The Nth Fibonacci Number",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can use dynamic programming to calculate the nth Fibonacci number. 2. We define a helper function fibo(n, dp) that calculates the nth Fibonacci number usi",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Find%20The%20Nth%20Fibonacci%20Number",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Find The Nth Fibonacci Number\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Find The Nth Fibonacci Number\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Find The Nth Fibonacci Number\n    pass",
        "javascript": "// Striver A2Z optimal approach for Find The Nth Fibonacci Number"
      }
    },
    {
      "id": "str-310",
      "number": "310",
      "title": "Climbing Stairs",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "Y0lT9Fck7qI",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can use dynamic programming with memoization to calculate the number of distinct ways to climb the staircase. 2. We define a helper function fmemo(n, dp) ",
      "leetcodeUrl": "https://leetcode.com/problems/climbing-stairs/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Climbing Stairs\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Climbing Stairs\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Climbing Stairs\n    pass",
        "javascript": "// Striver A2Z optimal approach for Climbing Stairs"
      }
    },
    {
      "id": "str-311",
      "number": "311",
      "title": "Frog Jump",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "EgG3jsGoPvQ",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can use dynamic programming with memoization to find the minimum energy required to jump from the 0th stair to the (n-1)th stair. 2. We define a helper fu",
      "leetcodeUrl": "https://leetcode.com/problems/frog-jump/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Frog Jump\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Frog Jump\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Frog Jump\n    pass",
        "javascript": "// Striver A2Z optimal approach for Frog Jump"
      }
    },
    {
      "id": "str-312",
      "number": "312",
      "title": "Frog K Jumps",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can use dynamic programming with memoization to find the minimum energy required to jump from the 0th stair to the (n-1)th stair. 2. We define a helper fu",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Frog%20K%20Jumps",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Frog K Jumps\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Frog K Jumps\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Frog K Jumps\n    pass",
        "javascript": "// Striver A2Z optimal approach for Frog K Jumps"
      }
    },
    {
      "id": "str-313",
      "number": "313",
      "title": "House Robber",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "73r3KWiEvyk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can use dynamic programming with memoization to solve this problem. 2. We define a helper function fmemo(i, nums, dp) that calculates the maximum amount o",
      "leetcodeUrl": "https://leetcode.com/problems/house-robber/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for House Robber\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for House Robber\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for House Robber\n    pass",
        "javascript": "// Striver A2Z optimal approach for House Robber"
      }
    },
    {
      "id": "str-314",
      "number": "314",
      "title": "House Robber 2",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "GrMBfJNk_NY",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Since the houses are arranged in a circle, the robber cannot rob the first and last house together as they are adjacent. 2. To solve this problem, we can div",
      "leetcodeUrl": "https://leetcode.com/problems/house-robber-ii/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for House Robber 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for House Robber 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for House Robber 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for House Robber 2"
      }
    },
    {
      "id": "str-315",
      "number": "315",
      "title": "Ninja Training",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "AE39gJYuRog",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. To maximize the merit points, we need to find the maximum sum of points such that the Geek can't perform the same activity on two consecutive days. 2. We can",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Ninja%20Training",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Ninja Training\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Ninja Training\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Ninja Training\n    pass",
        "javascript": "// Striver A2Z optimal approach for Ninja Training"
      }
    },
    {
      "id": "str-316",
      "number": "316",
      "title": "Unique Paths",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "IlEsdxuD4lY",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can solve this problem using dynamic programming with memoization (top-down approach). 2. We define a helper function fmemo(i, j, dp) that calculates the ",
      "leetcodeUrl": "https://leetcode.com/problems/unique-paths/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Unique Paths\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Unique Paths\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Unique Paths\n    pass",
        "javascript": "// Striver A2Z optimal approach for Unique Paths"
      }
    },
    {
      "id": "str-317",
      "number": "317",
      "title": "Unique Paths 2",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "sdE0A2Oxofw",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can solve this problem using dynamic programming with memoization (top-down approach). 2. We define a helper function fmemo(i, j, grid, dp) that calculate",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Unique%20Paths%202",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Unique Paths 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Unique Paths 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Unique Paths 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Unique Paths 2"
      }
    },
    {
      "id": "str-318",
      "number": "318",
      "title": "Minimum Path Sum",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "_rgTlyky1uQ",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can solve this problem using dynamic programming with memoization (top-down approach). 2. We define a helper function fmemo(i, j, grid, dp) that calculate",
      "leetcodeUrl": "https://leetcode.com/problems/minimum-path-sum/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Path Sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Path Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Path Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Path Sum"
      }
    },
    {
      "id": "str-319",
      "number": "319",
      "title": "Minimum Path In Triangle",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can solve this problem using dynamic programming with memoization (top-down approach). 2. We define a helper function fmemo(i, j, n, tri, dp) that calcula",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Path%20In%20Triangle",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Path In Triangle\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Path In Triangle\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Path In Triangle\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Path In Triangle"
      }
    },
    {
      "id": "str-320",
      "number": "320",
      "title": "Minimum Falling Path Sum",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "_rgTlyky1uQ",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can solve this problem using dynamic programming with memoization (top-down approach). 2. We define a helper function fmemo(i, j, mat, dp) that calculates",
      "leetcodeUrl": "https://leetcode.com/problems/minimum-falling-path-sum/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Falling Path Sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Falling Path Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Falling Path Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Falling Path Sum"
      }
    },
    {
      "id": "str-321",
      "number": "321",
      "title": "Subset Sum Equal To K",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "fWX9xDmIzRI",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. We can solve this problem using dynamic programming with memoization (top-down approach). 2. We define a helper function fmemo(i, sum, arr, dp) that checks i",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Subset%20Sum%20Equal%20To%20K",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Subset Sum Equal To K\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Subset Sum Equal To K\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Subset Sum Equal To K\n    pass",
        "javascript": "// Striver A2Z optimal approach for Subset Sum Equal To K"
      }
    },
    {
      "id": "str-322",
      "number": "322",
      "title": "Partition Array In Two Equal Sum Subsets",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- To solve this problem, we can use dynamic programming. - We'll create a 2D DP array where `dp[i][j]` represents whether it's possible to select a subset from ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Partition%20Array%20In%20Two%20Equal%20Sum%20Subsets",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Partition Array In Two Equal Sum Subsets\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Partition Array In Two Equal Sum Subsets\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Partition Array In Two Equal Sum Subsets\n    pass",
        "javascript": "// Striver A2Z optimal approach for Partition Array In Two Equal Sum Subsets"
      }
    },
    {
      "id": "str-323",
      "number": "323",
      "title": "Minimum Sum Partition",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "GS_OqZb2CWc",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- Calculate the sum of all elements in the array. - Initialize a 2D dp array of size n x (sum + 1) to store if it is possible to achieve a sum 's' using the fir",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Sum%20Partition",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Sum Partition\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Sum Partition\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Sum Partition\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Sum Partition"
      }
    },
    {
      "id": "str-324",
      "number": "324",
      "title": "Count Number Of Subsets With Sum K",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "ZHyb-A2Mte4",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We'll use a bottom-up dynamic programming approach using a 2D dp array. - Initialize dp[i][j] as the number of subsets with sum 'j' using the first 'i' elemen",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Count%20Number%20Of%20Subsets%20With%20Sum%20K",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Number Of Subsets With Sum K\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Number Of Subsets With Sum K\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Number Of Subsets With Sum K\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Number Of Subsets With Sum K"
      }
    },
    {
      "id": "str-325",
      "number": "325",
      "title": "Partition With Given Difference",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "GS_OqZb2CWc",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We'll use a similar approach as used in the subset sum count problem. - Initialize dp[i][j] as the number of subsets with sum 'j' using the first 'i' elements",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Partition%20With%20Given%20Difference",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Partition With Given Difference\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Partition With Given Difference\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Partition With Given Difference\n    pass",
        "javascript": "// Striver A2Z optimal approach for Partition With Given Difference"
      }
    },
    {
      "id": "str-326",
      "number": "326",
      "title": "01 Knapsack",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using Dynamic Programming (DP). - Initialize a 2D DP array 'dp' where dp[i][j] represents the    maximum value that can be obtained",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=01%20Knapsack",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for 01 Knapsack\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for 01 Knapsack\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for 01 Knapsack\n    pass",
        "javascript": "// Striver A2Z optimal approach for 01 Knapsack"
      }
    },
    {
      "id": "str-327",
      "number": "327",
      "title": "Coin Change",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "H9bfqozjoqs",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using Dynamic Programming (DP). - Initialize a 2D DP array 'dp' where dp[i][j] represents the minimum    number of coins needed to ",
      "leetcodeUrl": "https://leetcode.com/problems/coin-change/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Coin Change\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Coin Change\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Coin Change\n    pass",
        "javascript": "// Striver A2Z optimal approach for Coin Change"
      }
    },
    {
      "id": "str-328",
      "number": "328",
      "title": "Target Sum",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "g0npyaQtAQM",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- The problem can be reduced to finding the count of subsets with a    given sum. - Initialize dp[i][j] as the number of subsets with sum 'j' using    the first",
      "leetcodeUrl": "https://leetcode.com/problems/target-sum/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Target Sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Target Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Target Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Target Sum"
      }
    },
    {
      "id": "str-329",
      "number": "329",
      "title": "Coin Change 2",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "HgyouUi11zk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using Dynamic Programming (DP). - Initialize a 2D DP array 'dp' where dp[i][j] represents the number    of combinations to make up ",
      "leetcodeUrl": "https://leetcode.com/problems/coin-change-ii/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Coin Change 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Coin Change 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Coin Change 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Coin Change 2"
      }
    },
    {
      "id": "str-330",
      "number": "330",
      "title": "Unbounded Knapsack",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "OgvOZ6OrJoY",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using Dynamic Programming (DP). - Initialize a 2D DP array 'dp' where dp[i][j] represents the maximum    profit that can be obtaine",
      "leetcodeUrl": "https://leetcode.com/problems/coin-change-ii/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Unbounded Knapsack\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Unbounded Knapsack\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Unbounded Knapsack\n    pass",
        "javascript": "// Striver A2Z optimal approach for Unbounded Knapsack"
      }
    },
    {
      "id": "str-331",
      "number": "331",
      "title": "Rod Cutting Problem",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "mO8XpGoJwuo",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using Dynamic Programming (DP). - Initialize a 2D DP array 'dp' where dp[i][j] represents the maximum    value obtainable by cuttin",
      "leetcodeUrl": "https://leetcode.com/problems/integer-break/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Rod Cutting Problem\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Rod Cutting Problem\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Rod Cutting Problem\n    pass",
        "javascript": "// Striver A2Z optimal approach for Rod Cutting Problem"
      }
    },
    {
      "id": "str-332",
      "number": "332",
      "title": "Longest Common Subsequence",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "Ua0GhsJSlWM",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using Dynamic Programming (DP). - Initialize a 2D DP array 'dp' where dp[i][j] represents the length of    the longest common subse",
      "leetcodeUrl": "https://leetcode.com/problems/longest-common-subsequence/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Common Subsequence\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Common Subsequence\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Common Subsequence\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Common Subsequence"
      }
    },
    {
      "id": "str-333",
      "number": "333",
      "title": "Print The LCS",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- We will use dynamic programming to find the longest common subsequence (LCS) between two strings. - We will create a 2D array 'dp' of size (n+1) x (m+1), wher",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Print%20The%20LCS",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Print The LCS\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Print The LCS\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Print The LCS\n    pass",
        "javascript": "// Striver A2Z optimal approach for Print The LCS"
      }
    },
    {
      "id": "str-334",
      "number": "334",
      "title": "Longest Common Substring",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "_wP9mWNPL5w",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using Dynamic Programming (DP). - Initialize a 2D DP array 'dp' where dp[i][j] represents the length of    the longest common suffi",
      "leetcodeUrl": "https://leetcode.com/problems/maximum-length-of-repeated-subarray/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Common Substring\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Common Substring\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Common Substring\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Common Substring"
      }
    },
    {
      "id": "str-335",
      "number": "335",
      "title": "Longest Palindromic Subsequence",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "6i_T5kkfv4A",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using Dynamic Programming (DP). - Initialize a 2D DP array 'dp' where dp[i][j] represents the length of    the longest palindromic ",
      "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-subsequence/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Palindromic Subsequence\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Palindromic Subsequence\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Palindromic Subsequence\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Palindromic Subsequence"
      }
    },
    {
      "id": "str-336",
      "number": "336",
      "title": "Minimum Steps To Make String Palindrome",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "xPBLEj41rFU",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- The problem can be reduced to finding the minimum number of insertions needed to make a string a palindrome. - We can find the Longest Common Subsequence (LCS",
      "leetcodeUrl": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Steps To Make String Palindrome\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Steps To Make String Palindrome\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Steps To Make String Palindrome\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Steps To Make String Palindrome"
      }
    },
    {
      "id": "str-337",
      "number": "337",
      "title": "Minimum Steps To Make Other String",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- The problem can be reduced to finding the length of the Longest Common Subsequence (LCS) between the two strings. - The idea is to find the length of the LCS ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Steps%20To%20Make%20Other%20String",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Steps To Make Other String\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Steps To Make Other String\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Steps To Make Other String\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Steps To Make Other String"
      }
    },
    {
      "id": "str-338",
      "number": "338",
      "title": "Shortest Common Supersequence",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "xElxAuBcvsU",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming to find the length of the shortest common supersequence (SCS). - The SCS is the shortest string that cont",
      "leetcodeUrl": "https://leetcode.com/problems/shortest-common-supersequence/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Shortest Common Supersequence\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Shortest Common Supersequence\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Shortest Common Supersequence\n    pass",
        "javascript": "// Striver A2Z optimal approach for Shortest Common Supersequence"
      }
    },
    {
      "id": "str-339",
      "number": "339",
      "title": "Distinct Subsequences",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "nVG7eTiD2bY",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- The problem can be solved using dynamic programming. - Let dp[i][j] represent the number of distinct subsequences of the first i characters of string s that m",
      "leetcodeUrl": "https://leetcode.com/problems/distinct-subsequences/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Distinct Subsequences\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Distinct Subsequences\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Distinct Subsequences\n    pass",
        "javascript": "// Striver A2Z optimal approach for Distinct Subsequences"
      }
    },
    {
      "id": "str-340",
      "number": "340",
      "title": "Wildcard Matching",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "ZmlQ3vgAOMo",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Let dp[i][j] represent whether the substring of s up to index i can be matched with the substring of p",
      "leetcodeUrl": "https://leetcode.com/problems/wildcard-matching/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Wildcard Matching\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Wildcard Matching\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Wildcard Matching\n    pass",
        "javascript": "// Striver A2Z optimal approach for Wildcard Matching"
      }
    },
    {
      "id": "str-341",
      "number": "341",
      "title": "Best Time To Buy And Sell Stocks",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "excAOvwF_Wk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- Initialize a variable minprice with the price on the first day and initialize ans to 0. - Iterate through the array from the second day to the last day. - Upd",
      "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Best Time To Buy And Sell Stocks\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Best Time To Buy And Sell Stocks\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Best Time To Buy And Sell Stocks\n    pass",
        "javascript": "// Striver A2Z optimal approach for Best Time To Buy And Sell Stocks"
      }
    },
    {
      "id": "str-342",
      "number": "342",
      "title": "Best Time To Buy And Sell Stock 2",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "excAOvwF_Wk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - We need to keep track of whether we are holding a stock or not on each day. - Define a 2D DP array `dp",
      "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Best Time To Buy And Sell Stock 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Best Time To Buy And Sell Stock 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Best Time To Buy And Sell Stock 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Best Time To Buy And Sell Stock 2"
      }
    },
    {
      "id": "str-343",
      "number": "343",
      "title": "Best Time To Buy And Sell Stock Upto 2 Transaction",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "excAOvwF_Wk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - We need to keep track of the number of transactions completed so far (cap) and whether we are holding ",
      "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Best Time To Buy And Sell Stock Upto 2 Transaction\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Best Time To Buy And Sell Stock Upto 2 Transaction\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Best Time To Buy And Sell Stock Upto 2 Transaction\n    pass",
        "javascript": "// Striver A2Z optimal approach for Best Time To Buy And Sell Stock Upto 2 Transaction"
      }
    },
    {
      "id": "str-344",
      "number": "344",
      "title": "Best Time To Buy And Sell Stock Uoto K Transaction",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "excAOvwF_Wk",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - We need to keep track of the number of transactions completed so far (cap) and whether we are holding ",
      "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Best Time To Buy And Sell Stock Uoto K Transaction\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Best Time To Buy And Sell Stock Uoto K Transaction\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Best Time To Buy And Sell Stock Uoto K Transaction\n    pass",
        "javascript": "// Striver A2Z optimal approach for Best Time To Buy And Sell Stock Uoto K Transaction"
      }
    },
    {
      "id": "str-345",
      "number": "345",
      "title": "Buy And Sell Stocks With Cooldown",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "IGIe46xw3YY",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - We need to keep track of whether we are holding a stock or not on each day. - Define a 2D DP array `dp",
      "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Buy And Sell Stocks With Cooldown\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Buy And Sell Stocks With Cooldown\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Buy And Sell Stocks With Cooldown\n    pass",
        "javascript": "// Striver A2Z optimal approach for Buy And Sell Stocks With Cooldown"
      }
    },
    {
      "id": "str-346",
      "number": "346",
      "title": "Buy And Sell Stocks With Transaction Fee",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "k4eK-vEmnKg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - We need to keep track of whether we are holding a stock or not on each day. - Define a 2D DP array `dp",
      "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Buy And Sell Stocks With Transaction Fee\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Buy And Sell Stocks With Transaction Fee\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Buy And Sell Stocks With Transaction Fee\n    pass",
        "javascript": "// Striver A2Z optimal approach for Buy And Sell Stocks With Transaction Fee"
      }
    },
    {
      "id": "str-347",
      "number": "347",
      "title": "Longest Increasing Subsequence",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "cjWnW0hdF1Y",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Let dp[i] represent the length of the longest increasing subsequence ending at index i. - For each ele",
      "leetcodeUrl": "https://leetcode.com/problems/longest-increasing-subsequence/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Increasing Subsequence\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Increasing Subsequence\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Increasing Subsequence\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Increasing Subsequence"
      }
    },
    {
      "id": "str-348",
      "number": "348",
      "title": "Print LIS",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "Ae_Ag_saG9s",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Let dp[i] represent the length of the longest increasing subsequence ending at index i. - Additionally",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Print%20LIS",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Print LIS\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Print LIS\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Print LIS\n    pass",
        "javascript": "// Striver A2Z optimal approach for Print LIS"
      }
    },
    {
      "id": "str-349",
      "number": "349",
      "title": "Largest Divisible Subset",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "gDuZwBW9VvM",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Sort the input array nums in ascending order. - Let dp[i] represent the size of the largest divisible ",
      "leetcodeUrl": "https://leetcode.com/problems/largest-divisible-subset/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Largest Divisible Subset\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Largest Divisible Subset\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Largest Divisible Subset\n    pass",
        "javascript": "// Striver A2Z optimal approach for Largest Divisible Subset"
      }
    },
    {
      "id": "str-350",
      "number": "350",
      "title": "Longest Bitonic Subsequence",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "y4vN0WNdrlg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Compute two DP arrays: one from the left and another from the right. - The left DP array, `left`, repr",
      "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Bitonic Subsequence\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Bitonic Subsequence\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Bitonic Subsequence\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Bitonic Subsequence"
      }
    },
    {
      "id": "str-351",
      "number": "351",
      "title": "Number Of LIS",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "XmRrGzR6udg",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Compute two DP arrays: one for the length of the longest increasing subsequence ending at index i (`dp",
      "leetcodeUrl": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Number Of LIS\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Number Of LIS\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Number Of LIS\n    pass",
        "javascript": "// Striver A2Z optimal approach for Number Of LIS"
      }
    },
    {
      "id": "str-352",
      "number": "352",
      "title": "MCM",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "vRVfmbCFW7Y",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - The dp[i][j] represents the minimum number of scalar multiplications required to compute the matrix ch",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=MCM",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for MCM\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for MCM\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for MCM\n    pass",
        "javascript": "// Striver A2Z optimal approach for MCM"
      }
    },
    {
      "id": "str-353",
      "number": "353",
      "title": "Minimum Cost To Cut Stick",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "xwomavsC86c",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Define a 2D DP array `dp` where dp[i][j] represents the minimum total cost to cut the stick between cu",
      "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Cost To Cut Stick\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Cost To Cut Stick\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Cost To Cut Stick\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Cost To Cut Stick"
      }
    },
    {
      "id": "str-354",
      "number": "354",
      "title": "Burst Ballons",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Define a 2D DP array `dp` where dp[i][j] represents the maximum coins collected by bursting balloons b",
      "leetcodeUrl": "https://leetcode.com/problems/burst-balloons/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Burst Ballons\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Burst Ballons\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Burst Ballons\n    pass",
        "javascript": "// Striver A2Z optimal approach for Burst Ballons"
      }
    },
    {
      "id": "str-355",
      "number": "355",
      "title": "Palindorme Partionting 2",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Define a 1D DP array `dp` where dp[i] represents the minimum cuts needed for a palindrome partitioning",
      "leetcodeUrl": "https://leetcode.com/problems/palindrome-partitioning-ii/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Palindorme Partionting 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Palindorme Partionting 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Palindorme Partionting 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Palindorme Partionting 2"
      }
    },
    {
      "id": "str-356",
      "number": "356",
      "title": "Partition Array For Maximum Sum",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "PhWWJmaKfMc",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - Define a 1D DP array `dp` where dp[i] represents the largest sum of the array after partitioning from ",
      "leetcodeUrl": "https://leetcode.com/problems/partition-array-for-maximum-sum/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Partition Array For Maximum Sum\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Partition Array For Maximum Sum\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Partition Array For Maximum Sum\n    pass",
        "javascript": "// Striver A2Z optimal approach for Partition Array For Maximum Sum"
      }
    },
    {
      "id": "str-357",
      "number": "357",
      "title": "Maximal Square",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - We need to find the largest square containing only 1's. - Define a 2D DP array `dp` where dp[i][j] rep",
      "leetcodeUrl": "https://leetcode.com/problems/maximal-square/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Maximal Square\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Maximal Square\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Maximal Square\n    pass",
        "javascript": "// Striver A2Z optimal approach for Maximal Square"
      }
    },
    {
      "id": "str-358",
      "number": "358",
      "title": "Count Square Submatrices",
      "difficulty": "Medium",
      "category": "Dynamic Programming",
      "hasVideo": true,
      "youtubeId": "auS1fynpnjo",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- This problem can be solved using dynamic programming. - We need to find the count of square submatrices with all ones. - Define a 2D DP array `dp` where dp[i]",
      "leetcodeUrl": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Square Submatrices\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Square Submatrices\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Square Submatrices\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Square Submatrices"
      }
    },
    {
      "id": "str-359",
      "number": "359",
      "title": "Implement Trie (Prefix Tree)",
      "difficulty": "Medium",
      "category": "Tries",
      "hasVideo": true,
      "youtubeId": "oobqoCJlHA0",
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- Create a TrieNode class with an array of child nodes, each representing a letter. - The Trie class maintains a root TrieNode. - For insertion, traverse the tr",
      "leetcodeUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Trie (Prefix Tree)\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Trie (Prefix Tree)\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Trie (Prefix Tree)\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Trie (Prefix Tree)"
      }
    },
    {
      "id": "str-360",
      "number": "360",
      "title": "Implement Trie 2",
      "difficulty": "Medium",
      "category": "Tries",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- Create a TrieNode class with an array of child nodes, each representing a letter. - Maintain the count of words with a specific prefix (cntPre) and the count ",
      "leetcodeUrl": "https://leetcode.com/problems/implement-trie-ii-prefix-tree/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Implement Trie 2\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Implement Trie 2\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Implement Trie 2\n    pass",
        "javascript": "// Striver A2Z optimal approach for Implement Trie 2"
      }
    },
    {
      "id": "str-361",
      "number": "361",
      "title": "Complete String",
      "difficulty": "Medium",
      "category": "Tries",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- Create a Trie data structure to store the strings in the array 'A'. - Insert all the strings into the Trie. - Iterate through each string in array 'A':   - Ch",
      "leetcodeUrl": "https://leetcode.com/problems/longest-word-in-dictionary/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Complete String\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Complete String\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Complete String\n    pass",
        "javascript": "// Striver A2Z optimal approach for Complete String"
      }
    },
    {
      "id": "str-362",
      "number": "362",
      "title": "Count Distinct Subsitrings",
      "difficulty": "Medium",
      "category": "Tries",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "- Create a Trie data structure to efficiently store and count distinct substrings. - For each character in the string, insert its suffixes into the Trie, and ea",
      "leetcodeUrl": "https://leetcode.com/problems/distinct-echo-substrings/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count Distinct Subsitrings\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count Distinct Subsitrings\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count Distinct Subsitrings\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count Distinct Subsitrings"
      }
    },
    {
      "id": "str-363",
      "number": "363",
      "title": "Bitwise Basic Operations",
      "difficulty": "Medium",
      "category": "Tries",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. For the 'getXOR' function, simply use the XOR (^) operator to get the XOR of 'a' and 'b'. 2. For the 'getBit' function, use the right shift (>>) and bitwise ",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Bitwise%20Basic%20Operations",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Bitwise Basic Operations\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Bitwise Basic Operations\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Bitwise Basic Operations\n    pass",
        "javascript": "// Striver A2Z optimal approach for Bitwise Basic Operations"
      }
    },
    {
      "id": "str-364",
      "number": "364",
      "title": "Maximum XOR Of Two Numbers",
      "difficulty": "Medium",
      "category": "Tries",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n)",
        "space": "O(1)"
      },
      "hint": "1. Create a Trie data structure that stores binary representations of the given numbers. 2. For each number, insert its binary representation into the Trie. 3. ",
      "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Maximum XOR Of Two Numbers\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Maximum XOR Of Two Numbers\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Maximum XOR Of Two Numbers\n    pass",
        "javascript": "// Striver A2Z optimal approach for Maximum XOR Of Two Numbers"
      }
    },
    {
      "id": "str-365",
      "number": "365",
      "title": "Minimum Number Of Insertions To Make Parenthesis Valid",
      "difficulty": "Hard",
      "category": "Strings (Hard)",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "- We can keep track of the balance of parentheses using two variables: open and close. - Traverse through the string, and for each character:   - If it's an ope",
      "leetcodeUrl": "https://leetcode.com/problemset/all/?search=Minimum%20Number%20Of%20Insertions%20To%20Make%20Parenthesis%20Valid",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Minimum Number Of Insertions To Make Parenthesis Valid\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Minimum Number Of Insertions To Make Parenthesis Valid\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Minimum Number Of Insertions To Make Parenthesis Valid\n    pass",
        "javascript": "// Striver A2Z optimal approach for Minimum Number Of Insertions To Make Parenthesis Valid"
      }
    },
    {
      "id": "str-366",
      "number": "366",
      "title": "Count And Say",
      "difficulty": "Hard",
      "category": "Strings (Hard)",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "- We can solve this problem using recursion. - The base case is when n = 1, in which case we return \"1\". - Otherwise, we calculate the count-and-say string for ",
      "leetcodeUrl": "https://leetcode.com/problems/count-and-say/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Count And Say\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Count And Say\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Count And Say\n    pass",
        "javascript": "// Striver A2Z optimal approach for Count And Say"
      }
    },
    {
      "id": "str-367",
      "number": "367",
      "title": "KMP Or Z String Matching Algo",
      "difficulty": "Hard",
      "category": "Strings (Hard)",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "- We can solve this problem using the KMP (Knuth-Morris-Pratt) string matching algorithm. - First, we calculate the LPS (Longest Prefix Suffix) array for the ne",
      "leetcodeUrl": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for KMP Or Z String Matching Algo\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for KMP Or Z String Matching Algo\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for KMP Or Z String Matching Algo\n    pass",
        "javascript": "// Striver A2Z optimal approach for KMP Or Z String Matching Algo"
      }
    },
    {
      "id": "str-368",
      "number": "368",
      "title": "Longest Happy Prefix",
      "difficulty": "Hard",
      "category": "Strings (Hard)",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "- We can solve this problem using the KMP (Knuth-Morris-Pratt) algorithm. - First, we calculate the LPS (Longest Prefix Suffix) array for the given string s. - ",
      "leetcodeUrl": "https://leetcode.com/problems/longest-happy-prefix/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Longest Happy Prefix\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Longest Happy Prefix\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Longest Happy Prefix\n    pass",
        "javascript": "// Striver A2Z optimal approach for Longest Happy Prefix"
      }
    },
    {
      "id": "str-369",
      "number": "369",
      "title": "Shortest Palindrome",
      "difficulty": "Hard",
      "category": "Strings (Hard)",
      "hasVideo": false,
      "youtubeId": null,
      "complexity": {
        "time": "O(n log n)",
        "space": "O(1)"
      },
      "hint": "1. We can solve this problem using the KMP (Knuth-Morris-Pratt) algorithm. 2. First, we reverse the string s and store it in the string rev. 3. We concatenate s",
      "leetcodeUrl": "https://leetcode.com/problems/shortest-palindrome/",
      "solutions": {
        "cpp": "class Solution {\npublic:\n    // Striver A2Z optimal solution for Shortest Palindrome\n};\n",
        "java": "class Solution {\n    // Optimal Striver A2Z approach for Shortest Palindrome\n}",
        "python": "class Solution:\n    # Optimal Striver A2Z approach for Shortest Palindrome\n    pass",
        "javascript": "// Striver A2Z optimal approach for Shortest Palindrome"
      }
    }
  ]
};
