const express = require('express');
const middlewareVerifyJWT = require('../middleware/VerifyJWT/MiddlewareVerifyJWT');
const middlewareAdmin = require('../middleware/MiddlewareAdmin'); 
const middlewareVerifyRoleAdmin = require('../middleware/VerifyJWT/MiddlewareVerifyRoleAdmin');

let routerAdmin = express.Router();
routerAdmin.get('/', middlewareVerifyJWT, middlewareVerifyRoleAdmin, middlewareAdmin);

module.exports = routerAdmin;