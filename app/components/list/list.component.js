'use strict'

import React from 'react';
import ListItem from './list-item/list-item.component';
import ListTitle from './list-title/list-title.component';
import ListHeader from './list-header/list-header.component';

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
        let items = buildListItems(state.tasks, state.listId, state.create);
        let dest = {
            listId: state.listId
        };

        return (
            <section>
                <div>
                    <ListTitle dest={dest} title={state.title} create={state.create}/>
                </div>
                <div>
                    <ListHeader dest={dest} task={state.task} create={state.create}/>
                </div>
                <ul>
                    {items}
                </ul>
            </section>
        );

        function buildListItems (tasks, listId, create) {
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
                            data={item}
                            create={create}/>
                    </li>)
            });
        }
    }
}

function getStateFromProps (props) {
    let {list, create} = props;
    return {
        tasks: list.tasks,
        listId: list.id,
        title: list.title,
        create: create
    }
}