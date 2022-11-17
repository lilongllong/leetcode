/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    let result = 0;
    let i = 0;
    let minValue = prices[i];
    while(i < prices.length) {
        result = Math.max(prices[i] - minValue, result);
        minValue = Math.min(minValue, prices[i]);
        i++;
    }
    return result;
};

maxProfit([7,1,5,3,6,4]);
maxProfit([7,6,4,3,1]);