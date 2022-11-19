/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
    let l = 0; r = nums.length - 1;

    while(l <= r) {
        const middle = Math.floor((l + r ) / 2);

        if (nums[l] === target) {
            return l;
        }
        if (nums[r] === target) {
            return r;
        }
        if (nums[middle] === target) {
            return middle;
        }
        if (r - l < 1) {
            return -1;
        }
        if (nums[l] < nums[middle]) {
            // 左侧分布在递增区间
            if (nums[l] < target && nums[middle] > target) {
                r = middle - 1;
                l = l - 1;
                continue;
            } else {
                l = middle + 1;
                r = r - 1;
                continue;
            }
        } else {
            // 右侧有序区间
            if (nums[r] > target && nums[middle] < target) {
                l = middle + 1;
                r = r - 1;
                continue;
            } else {
                l = l + 1;
                r = middle - 1;
                continue;
            }
        }
    }
    return -1;
};

console.log(search([4,5,6,7,0,1,2], 0));