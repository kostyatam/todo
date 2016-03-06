'use strict';

import {types, helpers, Events} from 'utils';

export default class List extends Events {
    constructor (list = {}, options = {}) {
        super();
        this.title = list.title || '';
        this.createDate = list.createDate || new Date;
        this.changeDate = list.changeDate || undefined;
        this.id = list.id || this.createId();
        this.tasks = list.tasks || [];
        this.on('change', () => {
            this.changeDate = new Date;
        });

        if (options.on) {
            let events = options.on
            for (let event in events) {
                if (!events.hasOwnProperty(event)) {
                    continue;
                }
                this.on(event, events[event]);
            }
        }
    }

    addTask (...params) {
        if (params.length === 1 && typeof params[0] === 'string') {
            let task = params[0];
            this.tasks.push({
                task,
                isDone: false
            });
            this.trigger('change');
            return;
        };
    }

    createId () {
        return helpers.guid()
    }
    changeTask (id, ...params) {
        if (!id) {
            throw new Error('can\'t find task for changing without id param');
            return;
        };

        let task = this.tasks[id];

        if (!task) {
            throw new Error('Warning: key is absent');
            return;
        };

        this.changeDate = new Date;

        if (params.length === 1 && types.isObject(params[0])) {
            let changes = params[0];
            for(let prop in changes) {
                if (!changes.hasOwnProperty(prop)) {
                    continue;
                }
                this.changeTask(id, prop, changes[prop]);
            };
        };

        if (params.length === 2 && typeof params[0] === 'string' && params[1] !== undefined) {
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
        };

        this.trigger('change');
    }

    deleteTask (id) {
        this.tasks.splice(id, 1)[0];
        this.trigger('change');
        return this.tasks;
    }
}