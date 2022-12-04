/**
 * @param {string} s
 * @return {number}
 */
 var minCut = function(s) {
    // DP 状态转移
    // 判断是否为回文串
    const huiwenMap = [];
    const checkHuiWen = (s, i, j) => {
        if (huiwenMap[j]?.[i] !== undefined) {
            return huiwenMap[j][i];
        }
        if (huiwenMap[j] === undefined) {
            huiwenMap[j] = [];
        }
        if (j - i <= 1) {
            huiwenMap[j][i] = (i === j) || (s[i] === s[j]);
            return huiwenMap[j][i];
        } else {
            const res = s[i] === s[j] ? checkHuiWen(s, i + 1, j - 1) : false;
            huiwenMap[j][i] = res;
            return res;
        }
    };
    for (let i = 0; i < (s.length - 1); i++) {
        for (let j = i + 1;  j < s.length; j++) {
            checkHuiWen(s, i, j);
        }
    }

    // DP 转移
    // 判断最短分割次数
    const minCutMap = [0];
    const getMinCut = (j) => {
        if (minCutMap[j] !== undefined) {
            return minCutMap[j];
        }
        let minCut = j + 1;
        for (let i = 0; i < huiwenMap[j].length; i++) {
            if (i === 0 && huiwenMap[j][i]) {
                minCut = 0;
                break;
            } else if(huiwenMap[j][i]) {
                const res = 1 + getMinCut(i - 1);
                minCut = Math.min(res, minCut);
            } else {
                const res = 1 + getMinCut(j - 1);
                minCut = Math.min(res, minCut);
            }
        }
        minCutMap[j] = minCut;
        return minCut;
    };
    for(let i = 0; i < s.length; i++) {
        getMinCut(i);
    }
    console.log(minCutMap, huiwenMap);
    return minCutMap[s.length - 1];
};