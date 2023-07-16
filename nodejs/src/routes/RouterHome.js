const express = require('express');
const middlewareVerifyJWT = require('../middleware/VerifyJWT/MiddlewareVerifyJWT');
const middlewareHome = require('../middleware/MiddlewareHome');

let routerHome = express.Router();
routerHome.get('/', middlewareVerifyJWT, middlewareHome);

module.exports = routerHome;