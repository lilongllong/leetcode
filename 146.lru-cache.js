/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
    this.firstKey = null;
    this.lastKey = null;
    this.readyUse = 0;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.capacity === 1) {
        return this.cache.get(key) === undefined ? -1 : this.cache.get(key).value;
    }
    if (this.cache.get(key) === undefined) {
        return -1;
    } else {
        const { pre, value, next } = this.cache.get(key);
        if (pre !== null) {
            const preObj = this.cache.get(pre);
            this.cache.set(pre, { ...preObj, pre: preObj.pre === null ? key : preObj.pre, next: next });
        } else {
            return value;
        }
        if (next !== null) {
            this.cache.set(next, { ...this.cache.get(next), pre: pre });
        } else {
            this.lastKey = pre;
        }

        this.cache.set(key, { pre: null, value, next: this.firstKey });
        this.firstKey = key;
        console.log(this.cache, key, this.firstKey, this.lastKey);
        return value;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.capacity === 1) {
        this.cache.clear();
        this.cache.set(key, { pre: null, value, next: null });
        return;
    }
    if (this.cache.get(key) !== undefined) {
        const { pre, next } = this.cache.get(key);
        if (pre !== null) {
            const preObj = this.cache.get(pre);
            this.cache.set(pre, { ...preObj, pre: preObj.pre === null ? key : preObj.pre, next: next });
        }
        if (next !== null) {
            this.cache.set(next, { ...this.cache.get(next), pre: pre });
        } else {
            this.lastKey = pre;
        }
        this.cache.set(key, { pre: null, value, next: this.firstKey });
        this.firstKey = key;
        return;
    } else if (this.readyUse >= this.capacity) {
        // 先删除一个
        const lastPre = this.cache.get(this.lastKey).pre;
        this.cache.delete(this.lastKey);
        this.cache.set(lastPre, { ...this.cache.get(lastPre), next: null });
        this.lastKey = lastPre;
        this.readyUse--;
    }
    // 新增
    this.cache.set(key, { pre: null, value, next: this.firstKey });
    if (this.firstKey !== null) {
        this.cache.set(this.firstKey, { ...this.cache.get(this.firstKey), pre: key });

        if (this.lastKey === null) {
            this.lastKey = this.firstKey;
        }
    }
    this.firstKey = key;
    this.readyUse++;
    // console.log('put', this.cache, this.firstKey, this.lastKey);
};

const lRUCache = new LRUCache(2);
lRUCache.put(2, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get(2));

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */