/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function(nums, k) {
    const swap = (arr, i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

    const randomPartion = (arr, left, right) => {
        const pv = arr[left];
        let index = left + 1;
        for(let i= index; i <= right; i++) {
            if (arr[i] >= pv) {
                swap(arr, i, index);
                index++;
            }
        }

        swap(arr, left, index - 1);
        return index - 1;
    };

    const quickSort = (arr, left, right) => {
        const q = randomPartion(arr, left, right);
        if (q === (k - 1)) {
            return arr[q];
        } 
        if (q > (k - 1)) {
            return quickSort(arr, left, q - 1);
        } else {
            return quickSort(arr, q + 1, right);
        }
    };
    return quickSort(nums, 0, nums.length - 1);
};

console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4));