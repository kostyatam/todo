'use strict';

import React from 'react';
import components from 'components';
import mock from 'mock';
import stores from 'stores';

let todoStore = stores.todoStore;
let List = components.list;
let tasks = mock.tasks;

export default class ListPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks: props.tasks || tasks
        };
    }
    onChange() {
        debugger
    }
    componentDidMount () {
        this.unsubscribe = todoStore.listen(this.onChange);
    }
    render () {
        var state = this.state;
        return (<List tasks={state.tasks}/>);
    }
}