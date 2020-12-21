const express = require('express');

const routes = express.Router();
const controller = require('../Controllers/products');
const upload = require('../middleware/multer');
const validate = require('../middleware/validate');
const cache = require('../middleware/cache');

routes.get('/', validate(['admin']), cache, controller.get);
routes.post('/', validate(['admin']), upload.single('url_img'), controller.add);
routes.put('/', validate(['admin']), upload.single('url_img'), controller.update);
routes.delete('/:id', validate(['admin']), controller.del);

module.exports = routes;
