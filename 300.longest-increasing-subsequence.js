function flatClassmate(arr) {
    const dpl = arr.map(item => 0);
    const dpr = arr.map(item => 0);
    const revArr = Array.from(arr);
    let i = 0;
    while(i < Math.floor(arr.length / 2)) {
        const temp = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = temp;
        i++;
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j]) {
                dpl[i] = Math.max(dpl[i], 1 + dpl[j], 0);
            }
            if (revArr[i] > revArr[j]) {
                dpr[i] = Math.max(dpr[i], 1 + dpr[j], 0);
            }
        }
    }
    let maxQueue = 0;
    for (let i = 0; i < arr.length; i++) {
        maxQueue = Math.max(1 + dpl[i] + dpr[arr.length - 1 - i], maxQueue);
    }
    return arr.length - maxQueue;
};

const arr = [186,186,150,200,160,130,197,200];

console.log(flatClassmate(arr));