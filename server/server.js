'use strict'

const koa = require('koa');
const fs = require('fs');
const router = require('koa-router')();
const app = koa();
const path = require('path');

router.get('*', function* (next) {
    yield next;
    console.log('body %s \n method %s \n url %s', !!this.body, this.method, this.url);
    if (this.body) {
        return;
    };
    if (this.method !== 'GET') {
        return;
    };
    if (this.url.indexOf('/public') === 0) {
        let parseUrl = path.parse(this.url);
        if (!parseUrl.ext) {
            return;
        }
        switch (parseUrl.ext) {
            case '.js': {
                this.type = 'application/javascript';
                break;
            }
            default: {
                this.type = 'text/html;charset=utf-8';
            }
        }
        let filepath = path.join(__dirname, this.url);
        let access = new Promise((resolve, reject) => {
            fs.stat(filepath, (err, stats) => {
                if (err) {
                    reject(false);
                    return;
                }
                if (!stats.isFile()) {
                    reject(false);
                    return;
                }
                resolve(true);
            })
        });

        let isFile = yield access;
        if (!isFile) {
            return;
        }
        var file = fs.ReadStream(filepath);
        this.body = file;
        return
    }
    var index = fs.ReadStream(path.resolve(__dirname, 'public/index.html'));
    this.type = 'text/html;charset=utf-8';
    this.body = index;
});

app.use(require('./routes/api/lists.js'));

app.use(router.routes());

app.listen(8080);
