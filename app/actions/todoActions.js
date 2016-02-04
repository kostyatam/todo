'use strict'

import Reflux from 'reflux';

let todoActions = Reflux.createActions([
    "itemChange",
    "createNew"
]);

export default todoActions;