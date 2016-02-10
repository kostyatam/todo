'use strict';

import Reflux from 'reflux';
import actions from 'actions';
import mock from 'mock';
let {lists} = mock;
let {todoActions} = actions;
let todoStore = Reflux.createStore({
    listenables: todoActions,
    onChangeItem: onItemChange,
    onCreateItem: onCreateItem,
    onDeleteItem: onDeleteItem,
    onGetLists: function () {
        this.trigger(lists);
    }
});

export default todoStore;

function isObject (item) {
    return item !== null && typeof item === 'object';
}

function onCreateItem (dest, ...params) {
    let {listId} = dest;
    let tasks = getTasksById(listId);
    console.log(params[0])
    if (params.length === 1 && typeof params[0] === 'string') {
        let task = params[0];
        tasks.push({
            task,
            isDone: false
        })
        this.trigger(lists);
        return;
    };
};

function onItemChange (dest, ...params) {
    let {listId, itemId} = dest;
    let tasks = getTasksById(listId);
    if (params.length === 1 && isObject(params[0])) {
        let changes = params[0];
        let task = tasks[itemId];
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
        this.trigger(lists);
        return;
    };
    if (params.length === 2 && typeof params[0] === 'string' && params[1] !== undefined) {
        let task = tasks[itemId];
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
        console.log('changed')
        this.trigger(lists);
        return;
    }
}

function onDeleteItem (dest, ...params) {
    let {listId, itemId} = dest;
    let tasks = getTasksById(listId);
    if (params.length === 0) {
        tasks.splice(itemId, 1);
        this.trigger(lists);
    }
}

function getTasksById (listId) {
    for(let i = 0; i < lists.length; i++) {
        if (lists[i].id === listId) {
            return lists[i].tasks;
        }
    };
    throw new Error('wrong listId, nothing was found');
}