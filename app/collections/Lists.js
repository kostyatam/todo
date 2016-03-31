'use strict';

import {types, helpers, Collection} from 'utils';
import {List} from 'models';

export default class Lists extends Collection {
    constructor(lists = []) {
        let collection = lists.map(item => {
            let list = new List(item);
            return list;
        });
        super(collection);
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
            let list = new List(item);
            list.on('change', () => this.trigger('change', this));
            return list;
        });

        this.collection = mergeLists.concat(newLists);
        this.trigger('change', this);
    }

    removeList (id) {
        let ids = types.isArray(id) ? id : [id];
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
