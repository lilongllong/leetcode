function sortByDelete(arr) {
    // 寻找凸起或者凹起进行回溯验证
    if (arr.length <= 2) {
        return arr[0];
    }
    const increArr = [0];
    for(let i = 1; i < arr.length; i++) {
        increArr.push(arr[i] - arr[i-1]);
    }
    const checkSorted = (increArr) => {
        let hasIncre = -1;
        let hasDec = -1;
        for(let i = 0; i < arr.length; i++) {
            if ((hasIncre > -1) && (hasDec > - 1)) break;
            if (increArr[i] > 0) {
                hasIncre = i;
                if (hasDec > -1) {
                    // 找到距离最近的递减
                    let j = i - 1;
                    while(j >= 0) {
                        if (increArr[j] < 0) {
                            hasDec = j;
                            break;
                        }
                        j--;
                    }
                    // 向右探索
                }
                continue;
            }
            if (increArr[i] < 0) {
                hasDec = i;
                if (hasIncre > -1) {
                    // 找到距离最近的递增
                    let j = i - 1;
                    while(j >= 0) {
                        if (increArr[j] > 0) {
                            hasIncre = j;
                            break;
                        }
                        j--;
                    }
                    // 向右探索
                }
            }
        }
        return [hasIncre, hasDec];
    };
    const [ hasDec, hasIncre] = checkSorted(increArr);
    if (!((hasDec > -1) && (hasIncre > -1))) {
        return arr[0];
    } else if (Math.abs(hasDec - hasIncre) > 1) {
        return -1;
    } else {
        console.log(hasDec, hasIncre, increArr);
        const tempInc = increArr[hasIncre];
        // const tempDec = arr[hasDec];
        // 递减序列
        increArr[hasIncre] = 0;
        let nextResult = checkSorted(increArr);
        if (!((nextResult[0] > -1) && (nextResult[1] > -1))) {
            // 有序
            return arr[hasIncre]
        }
        increArr[hasDec] = 0;
        increArr[hasIncre] = increArr;
        nextResult = checkSorted(increArr);
        if (!((nextResult[0] > -1) && (nextResult[1] > -1))) {
            // 有序
            return arr[hasDec]
        }
        return -1;
    }
    return -1;
}
console.log(sortByDelete([1,2]));
console.log(sortByDelete([4,5,3,2]));
console.log(sortByDelete([1,2,3,4,3]));