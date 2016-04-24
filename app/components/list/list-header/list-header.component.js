'use strict'

import React from 'react';
import {todoActions} from 'actions';
import {keys} from 'utils';
import history from 'routerHistory';

export default class ListHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = getStateFromProps(props);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange () {}

    componentWillReceiveProps (props) {
        this.setState(getStateFromProps(props));
    }

    onKeyPress (event) {
        let item = event.target;
        let task = item.value;
        let dest = this.state.dest;

        if (!keys.isEnter(event)) {
            return;
        }

        if (this.props.create) {
            todoActions.createList({id: dest.listId}, {
                after: (newList) => {
                    todoActions.createItem(dest, task);
                    history.replaceState(null, `/lists/${newList.id}`);
                }
            });
            return;
        }
        todoActions.createItem(dest, task);
        item.value = '';
    }

    render () {
        let state = this.state;

        return (
            <input type="text"
                   value={state.task}
                   onChange={this.onChange}
                   onKeyPress={this.onKeyPress}
                   placeholder="enter new task"
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
