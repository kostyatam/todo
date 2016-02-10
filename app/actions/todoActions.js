'use strict'

import Reflux from 'reflux';

let todoActions = Reflux.createActions([
    "changeItem",
    "deleteItem",
    "createItem",
    "getLists"
]);

export default todoActions;