'use strict';

import Reflux from 'reflux';
import actions from 'actions';
import mock from 'mock';
let {tasks} = mock;
let {todoActions} = actions;

let todoStore = Reflux.createStore({
    listenables: todoActions,
    onItemChange: function (key, ...params) {
        if (params.length === 1 && isObject(params[0])) {
            let changes = params[0];
            let task = tasks[key];
            if (!task) {
                throw new Error('Warning: key is absent');
                return;
            };
            for(let prop in changes) {
                if (!changes.hasOwnProperty(prop)) {
                    return;
                }
                if (!task.hasOwnProperty(prop)) {
                    task[prop] = changes[prop];
                }
            };
            this.trigger(tasks);
        };
        if (params.length === 2 && typeof params[0] === 'string' && params[1] !== undefined) {
            let task = tasks[key];
            let prop = params[0];
            let val = params[1];
            if (!task) {
                throw new Error('Warning: key is absent');
                return;
            };
            if (!task.hasOwnProperty(prop)) {
                throw new Error('Warning: wrong property');
                return;
            }
            task[prop] = val;
            this.trigger(tasks);
        }
    },
    onCreateNew: function () {
        debugger
    },
    onGetTasks: function () {
        this.trigger(tasks);
    }
});

export default todoStore;

function isObject (item) {
    return item !== null && typeof item === 'object';
}