const a = {};

const proxyObj = new Proxy({}, {
    get: function(target, propKey, receiver) {
        console.log(target, propKey, receiver);
        return Reflect.get(target, propKey, receiver);
    },
    set:  function(target, propKey, value, receiver) {
        console.log(target, propKey, value, receiver);
        return Reflect.set(target, propKey, value, receiver);
    },
    has: function(target, propKey) {
        console.log(target, propKey, 'has');
        return Reflect.has(target, propKey);
    }
});

proxyObj.a = '你好';

for(let key in proxyObj) {
    console.log(key);
}

