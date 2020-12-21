const express = require('express');

const routes = express.Router();
const controller = require('../Controllers/category');
const validate = require('../middleware/validate');

routes.get('/', validate(['admin']), controller.get);
routes.post('/', validate(['admin']), controller.add);
routes.put('/', validate(['admin']), controller.update);
routes.delete('/:id', validate(['admin']), controller.del);

module.exports = routes;
