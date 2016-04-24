'use strict';

import {types, helpers, Collection} from 'utils';
import {List} from 'models';

export default class Lists extends Collection {
    constructor(lists = [], params = {}) {
        let collection = lists.map(item => {
            let list = new List(item);
            return list;
        });
        super(collection);
        this.deleted = [];
        this.lastUpdate = params.lastUpdate;
        this.on('change', () => {
            this.lastUpdate = new Date;
        })
    }

    toJSON () {
        return {collection: this.collection, lastUpdate: this.lastUpdate};
    }

    merge(lists) {

        let intersection = lists.filter((list) => {
            let finded = this.getListById(list.id);
            if (finded) {
                return finded.lastUpdate > list.lastUpdate ? finded : list;
            }
        });

        let newFromThere = lists.filter((list) => {
            let finded = this.getListById(list.id);
            if (!finded && this.deleted.indexOf(list.id) === -1) {
                return list;
            }
        });

        let newLocal= this.filter((list) => {
            let finded = lists.getListById(list.id);
            if (!finded && list.lastUpdate >= lists.lastUpdate) {
                return list;
            }
        });

        this.collection = [].concat(intersection, newFromThere, newLocal).map((list) => {
            list.on('change', ()=> {
                this.trigger('change', this);
            });
            return list;
        });
        this.trigger('change', this);
    }

    updateFromLocal () {
        let savedState = localStorage.savedState || '{}';
        let {collection, lastUpdate} = JSON.parse(savedState);
        this.merge(new Lists(collection, {lastUpdate}));
        return this;
    }

    updateFromServer () {
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
        return getLists
            .then((res) => {
                let {lists, lastUpdate} = res;
                this.merge(new Lists(lists, {lastUpdate}));
            })
            .catch((err) => {
            });
    }

    removeList (id) {
        let ids = types.isArray(id) ? id : [id];
        this.deleted.concat(ids);
        ids.map((id) => this.remove({id}));
    }

    addList (list, options = {}) {
        if (!list) {
            list = new List;
        }

        if (types.isObject(list) && !(list instanceof List)) {
            list = new List(list);
        }

        if (!(list instanceof List)) {
        }

        this.push(list);

        if (!options.silence) {
            this.trigger('change', this);
        }
        if (types.isFunction(options.after)) {
            options.after(list);
        }
        return list;
    }

    getListById(id) {
        return this.find({id})[0];
    }
}
