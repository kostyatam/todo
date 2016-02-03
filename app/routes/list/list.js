'use strict';

import React from 'react';
import components from 'components';
import mock from 'mock';
let List = components.list;

let tasks = mock.tasks;

export default class ListPage extends React.Component {
    render () {
        return (<List tasks={tasks}/>);
    }
}

