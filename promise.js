/** 手写 promise 函数 */
function MyPromise(fn) {
    let state = 'pending'; // 内部状态机
    let value = null;
    let callbacks = [];

    function handleCallback(callback) {
        // 处理生命周期
        if (state === 'pending') {
            // 注册阶段
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
            callback.resolve(ret);
        } catch (error) {
            callback.reject(error);
        }
        
    }
    this.then = function(onFullfilled, onRejected) {
        // 返回吱声
        return new MyPromise((resolve, reject) => {
            // 处理回调
            handleCallback({
                resolve,
                reject,
                onFullfilled,
                onRejected,
            });
        });
    }

    this.catch = function(onError) {
        return this.then(null, onError);
    }

    this.finally = function(onFinally) {
        this.then((newValue) => {
            return MyPromise.resolve(onFinally()).then(() => newValue);
        }, (newError) => {
            return MyPromise.resolve(onFinally()).then(() => {
                if (newError instanceof Error) {
                    throw newError;
                } else {
                    throw new Error(newError)
                }
            })
        });
    }

    function resolve(newValue) {
        if (typeof newValue === 'object' && newValue instanceof MyPromise) {
            newValue.then(resolve, reject);
            return;
        }
        state = 'fullfilled';
        value = newValue;
        // 执行onFullfilled
        callbacks.forEach(callback => handleCallback(callback));
    }

    function reject(error) {
        state = 'rejected';
        value = error;
        callbacks.forEach(callback => handleCallback(callback));
    }

    fn(resolve, reject);
}

MyPromise.resolve = (data) => {
    return new MyPromise(resolve => {
        console.log('执行data', data);
        resolve(data);
    });
}

MyPromise.reject = (data) => {
    return new MyPromise((resolve, reject) => {
        reject(data);
    });
}

MyPromise.resolve(1).then(console.log)

function getUserJob(id) {
    console.log(id, 'id');
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('123');
        }, 1000);
    });
}

const p = new MyPromise((resolve) => {
    resolve('ok');
}).then((res) => {
    console.log('then1', res);
    return 2;
}).then((res) => {
    console.log('then2', res);
    return 4;
}).then(getUserJob).then((res) => {
    console.log('then3', res)
    return 4;
  }).finally((res) => {
    console.log('最终执行',res);
  });

  setTimeout(() => {
    p?.then((res) => console.log('final res', res));
  }, 3000);


Promise.resolve()
.then(() => {
  console.log(0);
  return Promise.resolve('4x'); // 推迟两次微应用 new Promise(promise)
})
.then((res) => console.log(res))

Promise.resolve().then(() => console.log(1))
.then(() => console.log(2))
  .then(() => console.log(3))
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6))

/**
 * microTask:
 * resolveA0 => resolveB1
 * => resolveA* => resolveB2 
 * resolveA4x => resolveB3
 * resolveARes => resolveB4
 * resolveB5
 * resolveB6
 */