const express = require('express');
const middlewareAuth = require('../middleware/MiddlewareAuth');

let routerAuth = express.Router();
routerAuth.get('/', middlewareAuth);

module.exports = routerAuth;
