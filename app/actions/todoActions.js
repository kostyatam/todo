'use strict'

import Reflux from 'reflux';

let todoActions = Reflux.createActions([
    "init",
    "changeTitle",
    "createList",
    "deleteList",
    "changeItem",
    "deleteItem",
    "createItem",
    "getLists"
]);

export default todoActions;