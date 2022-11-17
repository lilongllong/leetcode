/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
 var fourSumCount = function(nums1, nums2, nums3, nums4) {
    let count = 0;
    // 转换成map帮助查询
    function formatNums(value1, value2) {
        const numMap = new Map();
        (value1 || []).forEach(element1 => {
            (value2 || []).forEach(element2 => {
                numMap.set(element1 + element2, (numMap.get(element1 + element2) || 0) + 1) 
            });
        });
        return numMap;
    }
    const numMap1 = formatNums(nums1, nums3);
    const numMap2 = formatNums(nums2, nums4);
    
    for(let key1 of numMap1.keys()) {
        for(let key2 of numMap2.keys()) {
            const sum = key1 + key2;
            if (sum === 0) count += (numMap1.get(key1) * numMap2.get(key2));
        }
    }
    return count;
};
const nums1 = [-1,-1], nums2 = [-1,1], nums3 = [-1,1], nums4 = [1,-1];
console.log(fourSumCount(nums1, nums2, nums3, nums4));