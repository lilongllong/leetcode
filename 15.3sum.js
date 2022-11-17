/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    const result = [];
    // 双指针
    const swap = (arr, i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };
    const partion = (arr, left, right) => {
        const pv = arr[left];
        let l = left + 1;
        let r = l;
        while(r <= right) {
            if (pv >= arr[r]) {
                swap(arr, r, l);
                l++;
                r++;
            } else {
                r++;
            }
        }
        swap(arr, left, l - 1)
        return l - 1;
    }
    const quickSort = (arr, left, right) => {
        const q = partion(arr, left, right);
        if (q - left > 1) {
            quickSort(arr, left, q - 1);
        }
        if (right - q > 1) {
            quickSort(arr, q + 1, right);
        }
    };

    quickSort(nums, 0, nums.length - 1);

    let i = 0;

    while(i < nums.length) {
        if (nums[i] > 0) {
            return result;
        }
        if (i > 0 && nums[i - 1] === nums[i]) {
            // 前面已经处理的，因此跳过
            i++;
            continue;
        }
        let j = i + 1, k = nums.length - 1;
        while(j < k) {
            const data = nums[i] + nums[j] + nums[k];
            if (data === 0) {
                result.push([nums[i], nums[j], nums[k]]);
                while(j < k && (nums[j] === nums[j + 1])) {
                    j++;
                }
                j++;
                while (j < k && (nums[k] === nums[k - 1])) {
                    k--;
                } 
                k--;
            } else if (data > 0) {
                k--;
            } else {
                j++;
            }
        }
        i++;
    }
    return result;
};

console.log(threeSum([-1,0,1,2,-1,-4]));