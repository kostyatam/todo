'use strict';

import Reflux from 'reflux';
import actions from 'actions';

let todoActions = actions.todoActions;

let todoStore = Reflux.createStore({
    listenables: todoActions,
    onItemChange: function () {
        debugger
    },
    onCreateNew: function () {
        debugger
    }
});

export default todoStore;