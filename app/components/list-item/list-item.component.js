'use strict';

import React from 'react';
import actions from 'actions';

let todoActions = actions.todoActions;

export default class ListItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = getStateFromProps(props);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onDoneChange = this.onDoneChange.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState(getStateFromProps(props));
    }

    onKeyPress (event) {
        if (!isEnter(event)) {
            return false;
        }
        let item = event.target;
        let value = item.value;
        let key = this.state.id;
        todoActions.itemChange(key, 'task', value);
    }

    onDoneChange (event) {
        let checkbox = event.target;
        let value = checkbox.checked;
        let key = this.state.id;
        todoActions.itemChange(key, 'isDone', value);
    }

    render () {
        let state = this.state;

        return (
            <div>
                <input
                    defaultChecked={state.isDone}
                    onChange={this.onDoneChange}
                    type="checkbox"/>
                <input
                    defaultValue={state.task}
                    onKeyPress={this.onKeyPress}
                    type="text"/>
            </div>
        )
    }
}

function getStateFromProps (props) {
    return {
        task: props.data.task,
        isDone: props.data.isDone,
        id: props.id
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