'use strict'

export {isObject, isString, isFunction, isArray};

function isObject (...items) {
    return items.every(item => item !== null && typeof item === 'object' && !Array.isArray(item));
};

function isString (...items) {
    return items.every(item => typeof item === 'string');
};

function isFunction (...items) {
    return items.every(item => typeof item === 'function');
};

function isArray (...items) {
    return items.every(item => Array.isArray(item));
}