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
            lists: []
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(lists) {
        this.setState({
            lists: lists
        });
    }
    componentDidMount () {
        this.unsubscribe = todoStore.listen(this.onChange);
        todoActions.getLists();
    }
    render () {
        var state = this.state;
        var Lists = state.lists.map((list, key) => {return <List key={key} list={list}/>});
        return (
            <div>
                {Lists}
            </div>
        );
    }
}