const express = require('express');
const middlewareRefreshJWT = require('../middleware/MiddlewareRefreshJWT');

let routerRefresh = express.Router();

routerRefresh.get('/', middlewareRefreshJWT);

module.exports = routerRefresh;