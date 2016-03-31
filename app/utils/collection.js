'use strict';

import Events from './events';
import * as types from './types';

export default class Collections extends Events {
    constructor (...args) {
        let collection = types.isArray(args[0]) ? args[0] : [];
        super();
        this.collection = collection.map((item) => {
            item.on('change', () => {
                this.trigger('change', this);
            });
            return item;
        });
        this.on('change', () => {
            this.lastUpdate = new Date;
            this.length = this.collection.length;
        })
    }

    push (item) {
        item.on('change', () => {
            this.trigger('change', this);
        });
        this.trigger('change', this);
        return this.collection.push(item);
    }

    map (cb) {
        return this.collection.map(cb);
    }

    filter (cb) {
        return this.collection.filter(cb);
    }

    remove (obj) {
        let removed = false;
        this.collection = this.filter((item) => {
            for (let key in obj) {
                if (obj[key] !== item[key]) return true;
            }
            removed = true;
            return false;
        });
        removed && this.trigger('change', this);
        return this;
    }

    find (obj) {
        return this.filter((item) => {
            for (let key in obj) {
                if (obj[key] !== item[key]) return false;
            }
            return true;
        });
    }

    isEmpty() {
        return !this.length
    }
}