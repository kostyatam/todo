'use strict';

import {types, helpers, Collection} from 'utils';
import {List} from 'models';

export default class Lists extends Collection {
    constructor(lists = [], options = {}) {
        let collection = lists.map(item => {
            let list = new List(item, {
                on: {
                    change: () => {
                        this.trigger('change', this);
                    }
                }
            });
            return list;
        });

        super(collection);

        if (options.on) {
            let events = options.on
            for (let event in events) {
                if (!events.hasOwnProperty(event)) {
                    continue;
                }
                this.on(event, events[event]);
            }
        }
        this.trigger('create', this);
    }

    isEmpty() {
        return !this.collection.length
    }

    toJSON () {
        return this.collection;
    }

    merge(newLists) {

        let mergeLists = this.collection.map((list) => {
            for (let i = 0, l = newLists.length; i < l; i++) {
                if (newLists[i].id !== list.id) {
                    continue;
                }
                let serverList = newLists.splice(i, 1)[0];
                let serverDate = new Date(serverList.changeDate);
                let localDate = new Date(list.changeDate);
                return serverDate.getTime() > localDate.getTime() ? serverList : list;
            };
            return list;
        });

        newLists = newLists.map((item) => {
            let list = new List(item, {
                on: {
                    change: () => {
                        this.trigger('change', this);
                    }
                }
            });
            return list;
        });

        this.collection = mergeLists.concat(newLists);
        this.trigger('change', this);
    }

    addList(list, options = {}) {
        if (!list) {
            list = new List;
        }

        if (types.isObject(list) && !(list instanceof List)) {
            list = new List(list);
        }

        if (!(list instanceof List)) {
        }

        list.on('change', () => {
            this.trigger('change', this);
        });

        this.collection.push(list);

        if (!options.silence) {
            this.trigger('change', this);
        }
        if (types.isFunction(options.after)) {
            options.after(list);
        }
        return list;
    }

    getListById(listId) {
        let lists = this.collection;

        for (let i = 0; i < lists.length; i++) {
            if (lists[i].id === listId) {
                return lists[i]
            }
        }
        ;
        return;
    }
}
