/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permuteUnique = function(nums) {
    const readyUse = new Map();
    nums.forEach(item => {
        readyUse.set(item, (readyUse.get(item) || 0) + 1);
    });

    function nextSelect(currArray, readyUse) {
        if (readyUse.size === 0) {
            return [currArray];
        }
        let nextArray = [];
        readyUse.forEach((value, key) => {
            const nextUse = new Map(readyUse);
            if (value <= 1) {
                nextUse.delete(key);
            } else {
                nextUse.set(key, value - 1);
            }
            nextArray = [...nextArray, ...nextSelect([...currArray, key], nextUse)];
        });
        return nextArray;
    }
    return nextSelect([], readyUse);
};

console.log(permuteUnique([1,1,2]));