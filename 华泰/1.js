// 1 [a]
// 2 [b]
// 
function findSubQueue(str) {
    const frequeueMap = new Map();
    const keyMap = new Map();
    for(let i = 0; i < str.length; i++) {
        keyMap.set(str[i], (keyMap.get(str[i] || 0)) + 1);
    }
    // 翻转
    for(let key of keyMap) {
        const fre = keyMap.get(key);
        if (frequeueMap.has(fre)) {
            frequeueMap.set(fre, [...frequeueMap.get(fre), key])
        } else {
            frequeueMap.set(fre, [key]);
        }
    }
    let result = '';
    // 双指针

    const iterator = (i, j, keyMap) => {
        // 尝试缩进
        if ()
    }

    let i = 0;
    let j = str.length;
    while(i < j) {
        // 左右指针逼近，同时去找重复的key
        if (!keyMap.get(str[i]) > 1) {
            // 是重复字符
            // 移除重复字符并且往前走
            keyMap.set(str[i], keyMap.get(str[i]) - 1);
            i++;
        } else if (!keyMap.get(str[j]) > 1) {
            // 是重复字符
            // 移除重复字符并且往前走
            keyMap.set(str[j], keyMap.get(str[j]) - 1);
            j--;
        } else {
            // 左右两端均为非重复字符，此时检查是否还有重复字符，没有重复则为最终结果
            let isUnq = true;
            keyMap.forEach((value, key) => {
                if (value > 1) {
                    isUnq = false;
                }
            });
            if (isUnq) {
                return str.slice(i, j+1);
            } else {
                // 尝试左右缩进
                
            }
        }
    }
}