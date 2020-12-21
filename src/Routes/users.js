const express = require('express');

const routes = express.Router();
const controller = require('../Controllers/users');
const validate = require('../middleware/validate');

routes.get('/', validate(['admin']), controller.get);
routes.post('/', controller.add);
routes.put('/', validate(['admin', 'user']), controller.update);
routes.delete('/:id', validate(['admin', 'user']), controller.del);

module.exports = routes;
