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
    const heap = nums.slice(0, k);

    const flatHeap = (arr, i) => {
        const l = i * 2 + 1, r = i * 2 + 2;
        if (l >= arr.length) {
            return;
        }
        if (l === arr.length - 1) {
            // 只有左侧
            if (arr[l] < arr[i]) {
                swap(arr, l, i);
            }
            return;
        }
        console.log(arr, arr[i], arr[l], arr[r]);
        if (arr[l] <= arr[r] && arr[l] < arr[i]) {
            // 左旋
            console.log('左旋');
            swap(arr, l, i);
            flatHeap(arr, l);
            return;
        }
        if (arr[r] <= arr[l] && arr[r] < arr[i]) {
            swap(arr, r, i);
            flatHeap(arr, r);
            console.log('右旋');
            return;
        }
    }

    const initHeap = (arr) => {
        for(let i = 1; i <= arr.length; i++) {
            flatHeap(arr, arr.length - i);
        }
    };
    initHeap(heap);
    for (let i = k; i < nums.length; i++) {
        if (nums[i] > heap[0]) {
            heap[0] = nums[i];
            flatHeap(heap, 0);
        }
    }
    return heap[0];
};

console.log(findKthLargest([3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6], 20));