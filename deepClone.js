// 循环引用如何解决

function deepClone(source, memory) {
    console.log(Object.prototype.toString.call(source));
    !memory && (memory = new WeakMap());
    const isPrimitive = (value) => {
        return /Number|Null|Boolean|String|Undefined|Symbol|Function/.test(Object.prototype.toString.call(value));
    };
    if (isPrimitive(source)) {
        return source;
    }
    if (Array.isArray(source)) {
        return source.map(item => deepClone(item, memory))
    }
    if (Object.prototype.toString.call(source) === '[object Date]') {
        return new Date(source);
    }
    if (Object.prototype.toString.call(source) === '[object Regex]') {
        return new RegExp(source);
    }
    if (/^\[object .*Element\]$/.test(Object.prototype.toString.call(source))) {
        return source;
    }
    if (Object.prototype.toString.call(source) === '[object Set]') {
        const result = new Set();
        for(const item of source) {
            result.add(deepClone(item, memory));
        }
        memory
        return result;
    }
    if (Object.prototype.toString.call(source) === '[object Map') {
        const result = new Map();
        source.keys().forEach(element => {
            result.set(element,  deepClone(source.get(element), memory));
        });
        return result;
    }
    if (memory.has(source)) {
        // 解决循环引用的问题
        return memory.get(source);
    }
    const result = Object.create(null);
    Object.keys(source).forEach(item => {
        result[item] = deepClone(source[item], memory);
    });
    memory.set(source, result);
    return result;
}

const value = {
    1: null,
    2: undefined,
    3: new Set(),
    4: new Map(),
    5: 1,
    6: 'sada',
    7: function Say() { console.log('xxxx') },
    8: Symbol('特殊的key'),
    9: [1,'2'],
    10: new Date('2022-11-10'),
    11: new RegExp(/regex/),
    12: {
        data: '23',
        date: new Date('2022-11-10'),
    },
};

value[3].add(1);
value[3].add(2);
value[3].add(3);

value[4].set('1',1);
value[4].set('2',2);

console.log(value, deepClone(value));