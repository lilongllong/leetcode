// DP[i][0] = Max(DP[i - 1][0], DP[i - 1][1] + prices[i] - free);
// DP[i][1] = Max(DP[i - 1][0] - prices[i], DP[i - 1][i])
function trade(nums, free) {
    const DP = [];
    function getNextStep(nums, free, i, j, DP) {
        if (DP[i][j] !== undefined) {
            return DP[i][j];
        }
        if (i === 0) {
            if (j === 1) {
                return -nums[i];
            } else {
                return 0;
            }
        }
        if (j === 0) {
            return Math.max(getNextStep(nums, free, i - 1, 0, DP), getNextStep(nums, free, i - 1, 1, DP) + nums[i] - free);
        } else {
            return Math.max(getNextStep(nums, free, i - 1, 0, DP) - nums[i], getNextStep(nums, free, i - 1, 1, DP));
        }
    }

    for(let i = 0; i < nums.length; i++) {
        DP.push([]);
        DP[i][0] = getNextStep(nums, free, i, 0, DP);
        DP[i][1] = getNextStep(nums, free, i, 1, DP);
    }
    return DP[nums.length - 1][0];
}

console.log(trade([7,1,5,3,6,4], 3));