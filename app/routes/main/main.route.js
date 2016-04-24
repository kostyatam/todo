'use strict';

import React from 'react';
import {list as ListComponent} from 'components';
import {Link} from 'react-router';
import {List} from 'models';
import {todoStore} from 'stores';
import {todoActions} from 'actions';
import history from 'routerHistory';

export default class MainPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            lists: [],
            loading: true,
            marked: []
        };
        this.onChange = this.onChange.bind(this);
        this.createNewList = this.createNewList.bind(this);
        this.deleteMarked = this.deleteMarked.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.mark = this.mark.bind(this);
    }

    onChange(lists) {

        this.setState({
            lists: lists,
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

    deleteMarked () {
        todoActions.deleteList(this.state.marked);
        this.state.marked = [];
    }

    selectAll () {
        this.setState((previousState) => {
            let alreadySelected = previousState.marked.length === previousState.lists.length;
            previousState.marked = (alreadySelected) ? [] : previousState.lists.map((list) => list.id);
            return previousState;
        })
    }

    mark (e) {
        let target = e.target;
        let checked = target.checked;
        let id = target.value;
        this.setState((previousState) => {
            let marked = previousState.marked;
            checked ? marked.push(id) : marked.splice(marked.indexOf(id), 1);
            return previousState;
        })
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
        let mark = this.mark;
        if (state.loading) {
            return (
                <div>...Loading</div>
            )
        };

        let Lists = state.lists.map((item, index) => {
            let id = item.id;
            let title = item.title || 'untitled';
            let isChecked = state.marked.indexOf(id) !== -1;
            return (
                <li key={index}>
                    <input type="checkbox" onChange={mark} checked={isChecked} value={id}/>
                    <Link to={`lists/${id}`}>{title}</Link>
                </li>
            )
        });
        let selectionText = state.marked.length !== state.lists.length ? 'select all' : 'unselect all';
        let controls = state.marked.length ? (<button onClick={this.deleteMarked}>{'delete'}</button>) : '';
        return (
            <section>
                <div>
                    <Link to="/lists/new">create new</Link>
                </div>
                <button onClick={this.selectAll}>{selectionText}</button>
                {controls}
                <ul>
                    {Lists}
                </ul>
            </section>
        );
    }
}