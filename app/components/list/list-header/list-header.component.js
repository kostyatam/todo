'use strict'

import React from 'react';
import {todoActions} from 'actions';
import {keys} from 'utils';

export default class ListHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = getStateFromProps(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState(getStateFromProps(props));
    }

    onChange (e) {

    }
    onKeyPress (event) {
        let item = event.target;
        let task = item.value;
        let dest = this.state.dest;
        if (keys.isEnter(event)) {
            todoActions.createItem(dest, task);
            item.value = '';
            return;
        }
    }
    render () {
        let state = this.state;

        return (
            <input type="text"
                   defaultVaule={state.task}
                   onKeyPress={this.onKeyPress}
                   onChange={this.onChange}
                />
        )
    }
}

function getStateFromProps (props) {
    return {
        task: props.task,
        dest: props.dest
    }
}


function isEnter (event) {
    if (event.which == null) {
        if (event.keyCode === 13) return null;
        return true;
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 13) return null;
        return true;
    }

    return null;
}
