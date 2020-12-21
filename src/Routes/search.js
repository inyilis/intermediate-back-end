const express = require('express');

const routes = express.Router();
const controller = require('../Controllers/search');
const validate = require('../middleware/validate');

routes.get('/', validate(['admin', 'user']), controller.get);
routes.get('/:nama', validate(['admin', 'user']), controller.getName);

module.exports = routes;
