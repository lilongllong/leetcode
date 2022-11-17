const o = {};

Object.defineProperty(o, 'a', {
    configurable: false, // 是否可被删除
    enumerable: false, // 是否可被枚举，主要是 Object.keys()
    writable: true, // 是否可以改写
    value: 3, // 属性值
});

o.a = 5;
delete o.a;
console.log(o);