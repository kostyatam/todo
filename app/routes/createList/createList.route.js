'use strict';

import React from 'react';
import {list as ListComponent} from 'components';
import {List} from 'models';
import {todoStore} from 'stores';
import {todoActions} from 'actions';
import history from 'routerHistory';

export default class CreateListPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            list: new List
        };
    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }
    render () {
        let state = this.state;
        return (
            <div>
                <ListComponent create={true} list={state.list}/>
            </div>
        );
    }
}