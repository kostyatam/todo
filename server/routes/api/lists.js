'use strict'
const router = require('koa-router')();
const listsController = require('../../controllers/lists');

router.get('/api/lists', listsController.getLists);

module.exports = router.routes();