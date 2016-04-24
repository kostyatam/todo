'use strict';

import Reflux from 'reflux';
import {todoActions} from 'actions';
import {types, Collection, Events, helpers} from 'utils';
import {Lists} from 'collections';

let todoStore = Reflux.createStore({
    listenables: todoActions,
    onChangeItem: onItemChange,
    onCreateItem: onCreateItem,
    onDeleteItem: onDeleteItem,
    onGetLists: onGetLists,
    onDeleteList: onDeleteList,
    onCreateList: onCreateList,
    onChangeTitle: onChangeTitle,
    onInit: onInit
});

let saveLocal = helpers.debouncer((lists) => {
    localStorage.setItem('savedState', JSON.stringify(lists));
}, 300);

export default todoStore;

function onCreateList (list, options = {}) {
    this.lists.addList(list, options);
}

function onDeleteList (id) {
    this.lists.removeList(id);
}
function onInit () {
    this.lists = new Lists;
    this.lists
        .on('change', () => {
            this.trigger(this.lists);
            saveLocal(this.lists);
        })
        .updateFromLocal()
        .updateFromServer()
        .then(() => {
            this.loaded = true;
        });
}
function onGetLists () {
    if (!this.loaded) {
        return;
    };
    this.trigger(this.lists)
}

function onCreateItem (...params) {
    let {listId} = params.shift();
    this.lists
        .getListById(listId)
        .addTask(...params);
};

function onItemChange (...params) {
    let {listId, itemId} = params.shift();
    this.lists
        .getListById(listId)
        .changeTask(itemId, ...params);
}

function onDeleteItem (...params) {
    let {listId, itemId} = params.shift();
    this.lists
        .getListById(listId)
        .deleteTask(itemId);
}

function onChangeTitle (dest, title) {
    let {listId} = dest;
    this.lists
        .getListById(listId)
        .changeTitle(title);
}
