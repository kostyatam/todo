'use strict';

import React from 'react';
import {list as ListComponent} from 'components';
import {Link} from 'react-router';
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
        this.deleteList = this.deleteList.bind(this);
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

    deleteList (e) {
        e.preventDefault();
        let id = this.state.list.id;
        todoActions.deleteList(id);
        history.push('/');
    }

    componentDidMount () {
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
                <button onClick={this.deleteList}>Delete list</button>
                <ListComponent list={state.list}/>
            </div>
        );
    }
}