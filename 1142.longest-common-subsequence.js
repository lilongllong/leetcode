/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 * 最长公共子串
 */
 var longestCommonSubsequence = function(text1, text2) {
    // 依旧是反向拆解
    // DP[i][j] 代表 text1 i内和text2 j内的最长子序列
    // 假如 text1[i] === text2[j] 有可能是最长序列的一个
    // 假如 text1[i] !== text2[j] 只能是 text1 或者 text2 缩短长度的一个了
    const DP = [];
    for(let i = 0; i <= text1.length; i++) {
        const col = [];
        for (let j = 0; j <= text2.length; j++) {
            col.push((i === 0 || j === 0) ? 0 : -1);
        }
        DP.push(col);
    }

    const findDP = (i, j) => {
        if (DP[i][j] !== -1) {
            return DP[i][j];
        }
        if (text1[i - 1] === text2[j - 1]) {
            const data =  1 + findDP(i - 1, j - 1);
            DP[i][j] = data;
            return data
        } else {
            const data = Math.max(findDP(i - 1, j), findDP(i, j-1))
            DP[i][j] = data;
            return data;
        }
    }
    findDP(text1.length, text2.length);
    return DP[text1.length][text2.length];
};

console.log(longestCommonSubsequence('abcde', 'ace'));