

function jinzhan(arr) {
    const nextHandle = (record, queue, next, max) => {
        if (queue.length === 0) {
            // 进站
            if (next >= max) {
                console.log(...record);
                return [record];
            } else {
                return nextHandle(record, [next, ...queue], next + 1, max);
            }
        }
        if (next >= max) {
            // 出站
            if (queue.length > 0) {
                return nextHandle([...record, arr[queue[0]]], queue.slice(1), next, max);
            } else {
                console.log(...record);
                return [record];
            }
        }
        // 出站 出站
        return [...nextHandle([...record, arr[queue[0]]], queue.slice(1), next, max), ...nextHandle([...record], [next,...queue], next + 1, max)]
    }
    return nextHandle([], [], 0, arr.length);
}

console.log(jinzhan([1,2,3]));