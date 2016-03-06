'use strict'

export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

export function debouncer (cb, ms) {
    let id;
    return function () {
        let args = arguments;
        if (id) {
            clearTimeout(id);
        };

        id = setTimeout(function () {
            cb.apply(null, args);
            id = undefined;
        }, ms);
    }
}