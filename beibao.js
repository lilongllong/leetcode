function beibao(prices, money) {
    const dpSub = (i, leaveMoney) => {
        console.log(i, leaveMoney);
        if (dp?.[i]?.[leaveMoney] !== undefined) {
            return dp?.[i]?.[leaveMoney];
        }
        if (i < 0) {
            // 分配完成
            return 0;
        }
        if (leaveMoney <= 0) {
            dp[i][leaveMoney] = 0;
            return 0;
        }
        // 不放入
        let case1 = dpSub(i - 1, leaveMoney);
        if ((leaveMoney - prices[i][0]) >= 0) {
            case1 = Math.max(dpSub(i - 1, leaveMoney - prices[i][0]) + prices[i][0] * prices[i][1], case1); 
        }
        if (prices[i][2].length === 1 && (leaveMoney - prices[i][0] - prices[i][2][0][0]) >= 0) {
            case1 = Math.max(dpSub(i - 1, leaveMoney - prices[i][0] - prices[i][2][0][0]) + prices[i][0] * prices[i][1] + prices[i][2][0][0] * prices[i][2][0][1], case1);
        }
        if (prices[i][2].length === 2 && (leaveMoney - prices[i][0] - prices[i][2][1][0]) >= 0) {
            case1 = Math.max(dpSub(i - 1, leaveMoney - prices[i][0] - prices[i][2][1][0]) + prices[i][0] * prices[i][1] + prices[i][2][1][0] * prices[i][2][1][1], case1);
        }
        if (prices[i][2].length === 2 && (leaveMoney - prices[i][0] - prices[i][2][0][0] - prices[i][2][1][0]) >= 0) {
            case1 = Math.max(dpSub(i - 1, leaveMoney - prices[i][0] - prices[i][2][0][0] - prices[i][2][1][0]) + prices[i][0] * prices[i][1] + prices[i][2][0][0] * prices[i][2][0][1] + prices[i][2][1][0] * prices[i][2][1][1], case1);
        }
        dp[i][leaveMoney] = case1;
        return dp[i][leaveMoney];
    }
    const dp = [];
    for (let i = 0; i < prices.length; i++) {
        dp.push([]);
        dpSub(i, money);
    }
    // console.log(dp);
    return dp[prices.length - 1][money] * 10;
}

const prices = [
    [50,1,0],
    [40,4,0],
    [30,5,1],
    [40,5,1],
    [20,5,0],
    [50,4,5],
    [40,4,0],
    [32,2,0],
    [41,3,0],
    [40,3,5],
];

function formatInput(prices) {
    prices.forEach((item, index) => {
        if (item[2] !== 0) {
            if (Array.isArray(item[2])) {
                return;
            }
            // 存在父节点
            if (Array.isArray(prices[item[2] - 1][2])) {
                prices[item[2] - 1][2].push(item.slice(0, 2));
            } else {
                prices[item[2] - 1][2] = [item.slice(0, 2)];
            }
        } else {
            prices[index][2] = [];
        }
    });
    return prices.filter(item => Array.isArray(item[2]));
}

const money = 200;

console.log(beibao(formatInput(prices), money));

