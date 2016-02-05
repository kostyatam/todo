'use strict'

import Reflux from 'reflux';

let todoActions = Reflux.createActions([
    "itemChange",
    "createNew",
    "getTasks"
]);

export default todoActions;