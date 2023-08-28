export class EventEmitter {
    constructor() {
        this._listenerMap = new Map();
    }

    on(eventName, listener, context) {
        if (!this._listenerMap.has(eventName)) {
            this._listenerMap.set(eventName, []);
        }
    }

    emit(eventName , ...params){

    }
}