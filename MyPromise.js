/**
 * 每日一遍，手写promise
 */
function MyPromise(fn) {
    let state = 'pending';
    let callbacks = []; // { resolve, reject, onFullfilled, onRejectd }
    let value = null;

    function handleCallback(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        const cb = state === 'fullfilled' ? callback.onFullfilled : callback.onRejected;
        if (!cb) {
            const promiseCb = state === 'fullfilled' ? callback.resolve : callback.reject;
            promiseCb(value);
            return;
        }
        try {
            const ret = cb(value);
            // 二次注册,变更值
            callback.resolve(ret);
        } catch (e) {
            callback.reject(e);
        }
    }

    function resolve(newValue) {
        if (typeof newValue === 'object' && newValue instanceof MyPromise) {
            newValue.then(resolve, reject);
            return;
        }
        state = 'fullfilled';
        value = newValue;
        // 执行 callback
        callbacks.forEach(callback => handleCallback(callback));
    }

    function reject(error) {
        state = 'rejected';
        value = error;
        callbacks.forEach(callback => handleCallback(callback));
    }

    this.then = function(onFullfilled, onRejected) {
        // 二次对象抛出注册
        return new MyPromise((resolve, reject) => {
            handleCallback({ reject, resolve, onRejected, onFullfilled })
        });
    }

    this.catch = function(onError) {
        return this.then(null, onError); // 返回？还是不返回
    }

    this.finally = function(onFinally) {
        // 创建一个100% resolve的callback
        this.then((newValue) => {
            MyPromise.resolve(onFinally()).then(() => newValue);
        }, (error) => {
            MyPromise.resolve(onFinally()).then(() => {
                throw new Error(error);
            });
        });
    }

    fn(resolve, reject);
}

MyPromise.resolve = function(data) {
    return new MyPromise((resolve, reject) => {
        resolve(data);
    });
}

MyPromise.reject = function(erorr) {
    return new MyPromise((resolve, reject) => {
        reject(error);
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