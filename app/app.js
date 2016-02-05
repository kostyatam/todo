'use strict';

import './index.html';
import 'babel-polyfill'
import React from 'react';
import ReactDom from 'react-dom';

import routes from './routes/routes';
let List = routes.list;

let content = document.getElementsByClassName('content')[0];
ReactDom.render(<List />, content);