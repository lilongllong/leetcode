/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
 var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {
    const barrelMap = new Map();

    const splitBarrelIndex = (x, t) => {
        if (x >= 0) {
            return Math.floor(x / (t + 1));
        } else {
            return -Math.floor( Math.abs(x + 1) / (t + 1)) - 1;
        }
    }

    for(let i = 0; i < nums.length; i++) {
        const currId = splitBarrelIndex(nums[i], valueDiff);
        console.log(barrelMap, currId, nums[i]);
        if (barrelMap.has(currId)) {
            return true;
        } else if (barrelMap.has(currId - 1) && Math.abs(barrelMap.get(currId - 1) - nums[i]) <= valueDiff) {
            return true;
        } else if (barrelMap.has(currId + 1) && Math.abs(barrelMap.get(currId + 1) - nums[i]) <= valueDiff) {
            return true;
        } 
        barrelMap.set(currId, nums[i]);
        if (i >= indexDiff) {
            const preId = splitBarrelIndex(nums[i - indexDiff], valueDiff);
            barrelMap.delete(preId);
        }
    }
    return false;
};

console.log(containsNearbyAlmostDuplicate([-3, 3], 2, 4));