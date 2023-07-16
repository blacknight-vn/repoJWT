const express = require('express');
const middlewareLogout = require('../middleware/MiddlewareLogout');
const middlewareVerifyJWT = require('../middleware/VerifyJWT/MiddlewareVerifyJWT');

let routerLogout = express.Router();
routerLogout.get('/', middlewareVerifyJWT, middlewareLogout);

module.exports = routerLogout;