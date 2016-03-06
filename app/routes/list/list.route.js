'use strict';

import React from 'react';
import {list as ListComponent} from 'components';
import {List} from 'models';
import {todoStore} from 'stores';
import {todoActions} from 'actions';
import history from 'routerHistory';

export default class ListPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            lists: [],
            loading: true
        };
        this.onChange = this.onChange.bind(this);
        this.createNewList = this.createNewList.bind(this);
    }

    onChange(lists) {
        let {id} = this.props.params;
        let list = lists.getListById(id);

        if (!list && id) {
            history.push('error/404');
            return;
        }

        this.setState({
            list: list,
            loading: false
        });
    }

    createNewList () {
        todoActions.createList(null, {
            after: (newList) => {
                history.replaceState(null, `lists/${newList.id}`);
                console.log('redirect to new list');
            }
        });
        return;
    }

    componentDidMount () {
        let {query} = this.props.location;

        if (query.create) {
            this.createNewList();
        };

        this.unsubscribe = todoStore.listen(this.onChange);
        todoActions.getLists();
    }

    componentWillUnmount () {
        this.unsubscribe();
    }
    render () {
        let state = this.state;
        if (state.loading) {
            return (
                <div>...Loading</div>
            )
        };
        return (
            <div>
                <ListComponent list={state.list}/>
            </div>
        );
    }
}