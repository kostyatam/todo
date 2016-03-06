'use strict';

import React from 'react';
import components from 'components';
import {Link} from 'react-router';
import {todoStore} from 'stores';
import {todoActions} from 'actions';
import history from 'routerHistory';

export default class Otherwise extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div>404 page</div>
        )
    }
}