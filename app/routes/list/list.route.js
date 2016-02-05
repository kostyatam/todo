'use strict';

import React from 'react';
import components from 'components';
import mock from 'mock';
import stores from 'stores';
import actions from 'actions';

let {todoStore} = stores;
let {todoActions} = actions;
let List = components.list;

export default class ListPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks: []
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(tasks) {
        this.setState({
            tasks: tasks
        });
    }
    componentDidMount () {
        this.unsubscribe = todoStore.listen(this.onChange);
        todoActions.getTasks();
    }
    render () {
        var state = this.state;
        return (<List tasks={state.tasks}/>);
    }
}