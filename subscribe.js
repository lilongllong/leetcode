class EventHub {
    constructor() {
        this.callbacks = new Map();
    }
    on(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(event);
        } else {
            this.callbacks[event] = [callback];
        }
        return this;
    }
    off(event, callback) {
        if (!this.callbacks[event]) {
            return;
        }
        this.callbacks[event] = this.callbacks[event].filter(item => {
            return typeof item.fn === 'function' ? item.fn !== callback : item !== callback;
        });
        return this;
    }
    once(event, callback) {
        function on() {
            this.off(event, callback);
            console.log('解除执行');
            callback.call(this, ...arguments);
        }
        on.fn = callback;
        this.on(event, on);
        return this;
    }
    emit(event, ...rest) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(item => item.call(this, ...rest));
        }
    }
}

const eventBus = new EventHub();

function handler(...rest) {
    console.log('输出', ...rest);
}

eventBus.on('click', handler);
eventBus.once('dbclick', handler);

eventBus.emit('click', 1,2,3);
eventBus.off('click', handler);
eventBus.emit('click', 1,2,3);

eventBus.off('dbclick', handler);
eventBus.emit('dbclick', 4,5,6);
eventBus.emit('dbclick', 7,8,9);
