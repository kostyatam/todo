'use strict';

import React from 'react';
import {todoActions} from 'actions';
import {keys} from 'utils';
import history from 'routerHistory';

export default class ListTitle extends React.Component {
    constructor (props) {
        super(props);
        this.state = getStateFromProps(props);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.save = this.save.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange (event) {
        this.setState({title: event.target.value});
    }

    save (dest, title) {
        if (this.props.create) {
            todoActions.createList({id: dest.listId}, {
                after: (newList) => {
                    todoActions.changeTitle(dest, title);
                    history.replaceState(null, `/lists/${newList.id}`);
                }
            });
            return;
        }
        todoActions.changeTitle(dest, title);
    }

    onKeyPress (event) {
        let item = event.target;
        let title = item.value;
        let dest = this.props.dest;

        if (!keys.isEnter(event)) {
            return;
        }

        this.save(dest, title);
        item.blur();
    }

    onBlur (event) {
        let item = event.target;
        let title = item.value;
        let dest = this.props.dest;

        this.save(dest, title);
    }

    render () {
        let state = this.state;
        return (
            <input type="text"
                   value={state.title}
                   onChange={this.onChange}
                   onKeyPress={this.onKeyPress}
                   onBlur={this.onBlur}
                   placeholder="enter title"
            />
        )
    }
}

function getStateFromProps (props) {
    return {
        title: props.title
    }
}