'use strict';

import './index.html';
import 'babel-polyfill'
import React from 'react';
import ReactDom from 'react-dom';

import appRouter from './routes/router';

let content = document.getElementsByClassName('content')[0];

ReactDom.render(appRouter, content);