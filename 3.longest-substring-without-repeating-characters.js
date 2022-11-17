/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    if (s.length <= 1) {
        return s.length;
    }
    const inMap = new Map();
    inMap.set(s[0], 1);
    let maxCount = 1;
    // 将0插入
    let i = 0, j = 1;
    while(i < s.length && j < s.length) {
        if (!inMap.has(s[j])) {
            inMap.set(s[j], 1);
            j++;
            maxCount = Math.max(maxCount, j - i);
        } else {
            inMap.delete(s[i]);
            i++;
            if (i === j) {
                maxCount = Math.max(maxCount, 1);
                inMap.clear();
                inMap.set(s[i], 1);
                j++;
            }
        }
    }
    return maxCount;
};

console.log(lengthOfLongestSubstring(' '));