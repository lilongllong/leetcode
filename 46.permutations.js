/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    // 全排列 本质是交换的方案
    const queue = [[nums, 0]];
    const result = [];
    while(queue.length > 0) {
        const currPath = queue.shift();
        const [value, index] = currPath;
        if (index < (value.length - 1)) {
            for(let subIndex = index + 1; subIndex < value.length; subIndex++) {
                const newArray = Array.from(value);
                const temp = newArray[index];
                newArray[index] = newArray[subIndex];
                newArray[subIndex] = temp;
                queue.push([newArray, index + 1]);
            }
            queue.push([value, index + 1]);
        } else {
            result.push(value);
        }
    }
    return result;
};

console.log(permute([1,2,3]));