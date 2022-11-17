const unique = (arr) => {
    return Array.from(new Set(arr));
}

const uniqueMap = (arr) => {
    return Array.from(arr.reduce((target, curr) => {
        if (!target.get(curr)) {
            target.set(curr, true);
        }
        return target;
    }, new Map()).keys());
}

const mockValue = [1,2,3,4,4,5,5,6,7,234,3234];

console.log(uniqueMap(mockValue));

var removeDuplicates = function (nums) {
    if (nums.length === 0) {
        return 0;
    }
    let i = 0;
    let j = 1;
    let n = nums.length;

    while (j < n) {
        if (nums[i] === nums[j]) {
            j++;
        } else {
            i++;
            nums[i] = nums[j];
        }
    }
    console.log(nums);
    return nums.slice(0, i + 1);
};

console.log(removeDuplicates(mockValue));
