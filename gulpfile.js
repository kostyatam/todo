'use strict';

let gulp = require('gulp');
let nodemon =require('nodemon');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let open = require('open');

gulp.task('run-dev', ['wds', 'dev-server', 'open']);

gulp.task('wds', (cb) => {
    let config = require("./webpack.config.js");
    config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
    let compiler = webpack(config);
    let server = new WebpackDevServer(compiler, {
        contentBase: "/server/public",
        proxy: {
            '*': 'http://localhost:3000'
        }
    });
    server.listen(8080, cb);
});

gulp.task('dev-server', (cb) => {
    nodemon({
        script: 'server/server',
        watch: ['server']
    }).once('start', cb);
});

gulp.task('open', (cb) => {
    open('http://localhost:8080');
});
