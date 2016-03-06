'use strict'
import React from 'react';
import {Router, Route, Redirect, Link} from 'react-router';
import {List, Otherwise} from 'routes';
import history from 'routerHistory';

class AppRouter {
    constructor() {
        return (
            <Router path="/" history={history}>
                <Route path="lists/:id" component={List}/>
                <Route path="error/404" component={Otherwise}/>
                <Redirect from="*" to="error/404" />
            </Router>)
    }
}

export default new AppRouter;
