'use strict'

export {
    isEnter
}

function isEnter (event) {
    if (event.which == null) {
        if (event.keyCode === 13) return true;
        return false;
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which === 13) return true;
        return false;
    }

    return false;
}