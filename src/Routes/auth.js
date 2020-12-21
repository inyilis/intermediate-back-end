const express = require('express');

const routes = express.Router();
const controller = require('../Controllers/auth');

routes.post('/', controller.login);

module.exports = routes;
