const express = require('express');

const routes = express.Router();
const controller = require('../Controllers/history');
const validate = require('../middleware/validate');

routes.get('/', validate(['admin', 'user']), controller.get);
routes.post('/', validate(['admin', 'user']), controller.add);
routes.delete('/:id', validate(['admin']), controller.del);

module.exports = routes;
