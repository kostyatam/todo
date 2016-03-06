'use strict';
let todoTasks = require('../../mock/todoTasks');

module.exports.getLists = function* (next) {
    console.log('%s request url', this.url);
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > .3) {
                resolve(todoTasks);
                return;
            };
            resolve();
        }, 1500);
    });
    let res = yield promise;
    if (!res) {
        this.body = {
            message: 'Error'
        }
        this.status = 500;
        return;
    };
    this.body = {lists: res};
};