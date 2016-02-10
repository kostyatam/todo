'use strict'
import React from 'react';
import {Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from 'routes';

let browserHistory = createBrowserHistory();
let List = routes.list;

class AppRouter {
    constructor() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={List}>
                </Route>
            </Router>)
    }
}

export default new AppRouter;
