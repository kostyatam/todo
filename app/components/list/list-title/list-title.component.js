'use strict';

import React from 'react';
import {todoActions} from 'actions';

export default class ListTitle extends React.Component {
    constructor (props) {
        super(props);
        this.state = getStateFromProps(props);
    }
    render () {
        let state = this.state;
        return (<h2>{state.title}</h2>)
    }
}

function getStateFromProps (props) {
    return {
        title: props.title
    }
}