const express = require('express');

const routes = express.Router();
// const respon = require('./Helpers/respon');
const product = require('./Routes/products');
const category = require('./Routes/category');
const search = require('./Routes/search');
const history = require('./Routes/history');
const users = require('./Routes/users');
const auth = require('./Routes/auth');
const { configCloud } = require('./Configs/cloudinary');

routes.use('*', configCloud);
routes.use('/product', product);
routes.use('/category', category);
routes.use('/search', search);
routes.use('/history', history);
routes.use('/users', users);
routes.use('/auth', auth);
// routes.use('*', (req, res) => respon(res, 404, { msg: 'Not Found' }));

module.exports = routes;
