'use strict';

import React from 'react';
import {todoActions} from 'actions';

export default class ListItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = getStateFromProps(props);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onDoneChange = this.onDoneChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentWillReceiveProps (props) {
        this.setState(getStateFromProps(props));
    }

    onChangeItem (event) {
        let item = event.target;
        let value = item.value;
        let dest = this.state.dest;

        todoActions.changeItem(dest, 'task', value);
    }

    onDoneChange (event) {
        let checkbox = event.target;
        let value = checkbox.checked;
        let dest = this.state.dest;

        todoActions.changeItem(dest, 'isDone', value);
    }

    deleteItem (event) {
        let dest = this.state.dest;

        todoActions.deleteItem(dest);
    }

    render () {
        let state = this.state;
        return (
            <div>
                <input
                    checked={state.isDone}
                    onChange={this.onDoneChange}
                    type="checkbox"/>
                <input
                    value={state.task}
                    onChange={this.onChangeItem}
                    type="text"/>
                <button onClick={this.deleteItem}>delete</button>
            </div>
        )
    }
}

function getStateFromProps (props) {
    return {
        task: props.data.task,
        isDone: props.data.isDone,
        dest: props.dest
    }
}