'use strict'

import React from 'react';
import ListItem from './list-item';
import ListTitle from './list-title';
import ListHeader from './list-header';

export default class List extends React.Component {
    constructor (props) {
        super(props);
        this.state = getStateFromProps(props);
    }
    componentWillReceiveProps (props) {
        this.setState(getStateFromProps(props));
    }
    render() {
        let state = this.state;
        let items = buildListItems(state.tasks, state.listId);
        let dest = {
            listId: state.listId
        };

        return (
            <section>
                <ListTitle title={state.title}/>
                <ListHeader dest={dest} task={state.task}/>
                <ul>
                    {items}
                </ul>
            </section>
        );

        function buildListItems (tasks, listId) {
            return tasks.map((item, index) => {
                let dest ={
                    listId,
                    itemId: index
                };
                return (
                    <li key={index}>
                        <ListItem
                            key={index}
                            dest={dest}
                            data={item}/>
                    </li>)
            });
        }
    }
}

function getStateFromProps (props) {
    let {list} = props;
    return {
        tasks: list.tasks,
        listId: list.id,
        title: list.title
    }
}