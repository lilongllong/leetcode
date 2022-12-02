fo() // 1s
fo() // 1.5 console.log([size, size])
fo() // 2
fo() // 8
fo() // 9

// 间隔时间，队列2个，5秒打印一次
// 
function bufferTimeFo(fn) {
    return bufferTime(5000, 2, fn);
}

function bufferTime(time, Size, fn) {
    let token = Size;
    let 

    const fnList = []; // fn 队列 按照间隔执行

    setInterval(() => {
        token = 2;
    }, time);

    setInterval(() => {
        const size = fn();
        // 此时检查 
        const
    }, 100);;
}

const debundce = (fn, time) => {
    // 防抖
    let timer = null;
    return (...rest) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...rest);
            clearTimeout(timer);
            timer = null;
        }, time);
    }
}


