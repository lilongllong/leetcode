/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
 var isMatch = function(s, p) {
    const DP = [];
    const matches = (i, j) => {
        if (i === 0) {
            return false;
        }
        return p[j - 1] === '.' || s[i - 1] === p[j - 1];
    };
    for (let i = 0; i <= s.length; i++) {
        DP[i] = [];
        if (i=== 0) {
            DP[i] = [true];
        }
        for (let j = 0; j <= p.length; j++) {
            if (p[j - 1] === '*') {
                DP[i][j] = DP[i][j] || DP[i][j-2]; // 不匹配
                if (matches(i, j - 1)) {
                    DP[i][j] = DP[i][j] || DP[i - 1][j];
                }
            } else {
                if (matches(i, j)) {
                    DP[i][j] = DP[i][j] || DP[i-1][j-1];
                }
            }
        }
    }
    return DP[s.length][p.length] || false;
};