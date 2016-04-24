'use strict'

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

module.exports =  [{
    title: 'first todo list ever',
    createDate: new Date('Fri Feb 05 2016 23:40:01 GMT+0300 (MSK)'),
    lastUpdate: undefined,
    id: guid(),
    tasks: [{
        task: 'do more things',
        isDone: false
    }, {
        task: 'do more things better than ever',
        isDone: false
    }, {
        task: 'trying hard',
        isDone: true
    }]
}, {
    title: 'second todo list',
    createDate: new Date('Fri Feb 02 2016 13:40:01 GMT+0300 (MSK)'),
    lastUpdate: undefined,
    id: guid(),
    tasks: [{
        task: 'do something',
        isDone: false
    }, {
        task: 'do more things',
        isDone: false
    }, {
        task: 'trying hard',
        isDone: true
    }]
}]