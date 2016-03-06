'use strict';

import Events from './events';
import * as types from './types';

export default class Collections extends Events {
    constructor (...args) {
        let collection = types.isArray(args[0]) ? args[0] : [];
        super();
        this.collection = collection;
    }
    push (item) {
        this.collection.push(item);
    }
}