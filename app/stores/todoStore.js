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
    onCreateList: onCreateList
});

let saveLocal = helpers.debouncer((lists) => {
    localStorage.setItem('lists', JSON.stringify(lists));
}, 1000);

todoStore.onGetLists();

export default todoStore;

function onCreateList (list, options = {}) {
    this.lists.addList(list, options);
}

function onDeleteList (id) {
    this.lists.removeList(id);
}

function onGetLists () {
    let savedLists = localStorage.getItem('lists') !== 'undefined' ? localStorage.getItem('lists') : '[]';
    let localLists = JSON.parse(savedLists);
    if (!this.lists) {
        this.lists = new Lists(localLists);
        this.lists.on('change', () => {
            this.trigger(this.lists);
            saveLocal(this.lists);
        });
    }
    if (!this.loaded) {
        let getLists = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open('GET', '/api/lists', true);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;
                let res = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    resolve(res);
                    return;
                }
                if (xhr.status === 500) {
                    reject(500);
                    return;
                }
            }
        });
        getLists
            .then((res) => {
                let lists = res.lists;
                this.lists.merge(lists);
                this.loaded = true;
            })
            .catch((err) => {
                this.loaded = true;
            });
        return;
    }
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
