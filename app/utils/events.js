'use strict'
import {types} from 'utils';

export default class Events {
    constructor () {
        this.events = {};
    }

    on (...params) {
        if (params.length === 2 && types.isString(params[0]) && types.isFunction(params[1])) {
            let name = (params[0].split(':').length === 1) ? params[0] : params[0].split(':')[0].trim();
            let handler = params[1];
            this.events[name] = this.events[name] || [];
            this.events[name].push(handler);
        }
        return this;
    }

    trigger (name, data) {
        if (!types.isArray(this.events[name])) {
            console.log(`warning: try to call not existing handler for event: ${name}`);
            return;
        }
        this.events[name].map(event => event(data));
    }
}