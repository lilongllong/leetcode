/**
 * @param {number[]} ratings
 * @return {number}
 */
 var candy = function(ratings) {
    let dec = null;
    if (ratings.length <= 1) {
        return ratings.length;
    }
    const result = [1];
    for(let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            // 递增序列
            dec = null;
            if ((i - 2) >= 0 && ratings[i - 1] === ratings[i - 2]) {
                result[i] = 1;
            } else {
                result[i] = result[i - 1] + 1;
            }
        } else {
            // 递减序列
            if (dec === null) {
                // 首个递减
                result[i] = 1;
                dec = i;
                if (ratings[i - 1] > ratings[i] && result[i - 1] <= result[i]) {
                    result[i - 1] = result[i] + 1;
                } else if (ratings[i - 1] === ratings[i]) {

                }

            } else {
                if (ratings[i]  === ratings[i - 1] && dec === (i - 1)) {
                    result[i - 1] = 1;
                    result[i] = 1;
                    dec = i;
                    continue;
                } else if (ratings[i]  === ratings[i - 1]) {
                    result[i - 1] = 1;
                    result[i] = 1;
                    continue;
                }
                // 递增
                for(let next = dec; next < i; next++) {
                    result[next] += 1;
                }
                if ((dec - 1) >= 0 && ratings[dec - 1] > ratings[dec] && result[dec - 1] <= result[dec-1]) {
                    result[dec - 1] = result[dec] + 1;
                }
                result[i] = 1;
            }
        }
    }
    console.log(result);
    return result.reduce((target, curr) => target + curr, 0);
};

candy([3,2,1,1,4,3,3]);