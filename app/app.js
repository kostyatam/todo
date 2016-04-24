'use strict';

import './index.html';
import 'babel-polyfill'
import React from 'react';
import ReactDom from 'react-dom';
import {todoActions} from 'actions';
import appRouter from './routes/router';

todoActions.init();
let content = document.getElementsByClassName('content')[0];

ReactDom.render(appRouter, content);