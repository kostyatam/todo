'use strict'

import React from 'react';
import ListItem from '../list-item';

export default class List extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks: props.tasks || ['']
        };
    }
    render() {
        let state = this.state;
        let items = buildListItems(state.tasks);

        return (
            <ul>
                {items}
            </ul>
        );

        function buildListItems (tasks) {
            return tasks.map((item, index) => {
                return (
                    <li key={index}>
                        <ListItem key={index} data={item}/>
                    </li>)
            });
        }
    }
}