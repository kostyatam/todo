'use strict'

import Reflux from 'reflux';

let todoActions = Reflux.createActions([
    "createList",
    "changeItem",
    "deleteItem",
    "createItem",
    "getLists"
]);

export default todoActions;