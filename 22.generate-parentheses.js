/**
 * 括号生成
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function(n) {
    if (n <= 0) {
        return [];
    }
    if (n === 1) {
        return ['()'];
    }
    // 限定规则 letf >= right 2n 总长度 n 是指右括号使用次数 n - 1 指剩余可用右括号
    // DP[2n][n] = DP[2n - 1][n - 1] + DP[2n - 1][n]
    const track = (size, rUse) => {
        console.log(size, rUse);
        if (rUse < 0) {
            return [];
        }
        if (rUse === 0) {
            // 右括号使用完了
            let str = '';
            for(let i = 0; i < size; i++) {
                str += '(';
            }
            return [str];
        }
        if (size - rUse < rUse) {
            return [];
        }
        if (size === 1) {
            if (rUse > 0) {
                return [];
            } else {
                return ['('];
            }
        }
        // 先尝试右括号
        const subRRes = track(size - 1, rUse - 1);
        const subLRes = track(size - 1, rUse);
        const subRes = [];
        for(let i = 0; i < subRRes.length; i++) {
            subRes.push(subRRes[i] + ')');
        }
        for(let i = 0; i < subLRes.length; i++) {
            subRes.push(subLRes[i] + '(');
        }
        return subRes;
    }
    return track(2 * n, n);
};

console.log(generateParenthesis(3));