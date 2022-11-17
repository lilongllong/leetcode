/**
 * 每日一遍，手写promise
 */

function MyPromise(fn) {
    let state = 'pending';
    let value = null;
    let callbacks = []; // 数据结构 { onRejected, onFullfilled, resolve, reject }

    function handleCallback(callback) {
        if (state === 'pending') {
            // 挂载 阶段
            callbacks.push(callback);
            return;
        }
        const cb = state === 'fullfilled' ? callback.onFullfilled : callback.onRejected;
        if (!cb) {
            // Promise.resolve 的声明模式
            const PCB = state === 'fullfilled' ? callback.resolve : callback.reject;
            PCB(value);
            return;
        }
        try {
            const returnValue = cb(value);
            callback.resolve(returnValue);
        } catch (error) {
            callback.reject(error)
        }
    }

    function resolve(newValue) {
        if (typeof newValue === 'object' && newValue instanceof MyPromise) {
            // 将内部状态机传入
            newValue.then(resolve, reject);
            return;
        }
        state = 'fullfilled';
        value = newValue;
        callbacks.forEach(element => {
            handleCallback(element);
        });
    }

    function reject(newValue) {
        state = 'rejected';
        value = newValue;
        callbacks.forEach(element => {
            handleCallback(element);
        });
    }

    this.then = function(onFullfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            handleCallback({ reject, resolve, onFullfilled, onRejected });
        });
    };

    this.catch = function(onCatch) {
        return this.then(null, onCatch);
    };

    this.finally = function(onFinally) {
        return this.then((res) => {
            return MyPromise.resolve(onFinally()).then(() => res);
        }, (error) => {
            return MyPromise.resolve(onFinally()).then(() => {
                if (error instanceof Error ) {
                    throw error;
                } else {
                    throw new Error(error);
                }
            });
        });
    };

    fn(resolve, reject);
}

MyPromise.resolve = function(value) {
    return new MyPromise((resolve, reject) => {
        resolve(value);
    });
}

MyPromise.reject = function(value) {
    return new MyPromise((resolve, reject) => {
        reject(value);
    });
}



const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve('5'), 300);
});

promise.then((res) => {
    console.log('promise then', res);
    return 'then res';
}).then((res) => {
    console.log('then2', res);
    throw new Error('errorsss');
}).catch((error) => {
    console.log('promise error', error)
}).finally(() => {
    console.log('promise finally');
});