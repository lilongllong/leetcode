/**
 * @param {string} s
 * @return {number} 双指针 + 堆栈 很笨
 */
 var longestValidParentheses = function(s) {
    const findLastVariableIndex = (s, j) => {
        let index = j;
        let maxArrived = j;

        const queue = [];
        let queueIndex = 0;

        while(index < s.length) {
            if (s[index] === '(') {
                queue[queueIndex] = s[index];
                queueIndex++;
                index++;
                continue;
            }

            if (s[index] === ')') {
                if (queue[queueIndex - 1] !== '(') {
                    break;
                } else {
                    queueIndex--;
                    index++;
                    if (queueIndex === 0) {
                        maxArrived = index;
                    }
                }
            }
        }
        return maxArrived;
    }
    let j = 0;
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            j = findLastVariableIndex(s, Math.max(i, j));
            maxLen = Math.max(j - i, maxLen);
        }
    }
    return maxLen;
};


// DP 算法
/**
 * @param {string} s
 * @return {number}
 */
 var longestValidParentheses2 = function(s) {
    // DP算法
    const DP = [0];
    let max = 0;
    for(let i =0; i < s.length; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                DP[i] = (i > 2 ? DP[i - 2] : 0) + 2;
            } else if (((i - DP[i - 1]) > 0) && s[i - DP[i - 1] - 1] === '(') {
                DP[i] = DP[i - 1] + ((i - DP[i - 1]) >= 2 ? DP[i - DP[i - 1] - 2] : 0) + 2;
            } else {
                DP[i] = 0;
            }
            max = Math.max(max, DP[i] || 0);
        } else {
            DP[i] = 0;
        }
        console.log(DP);
    }
    return max;
};

console.log(longestValidParentheses2('()(())'))