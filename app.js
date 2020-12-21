require('dotenv/config');
const express = require('express');

const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./src/main');
const db = require('./src/Configs/db');
const redis = require('./src/Configs/redis');
const logger = require('./src/Helpers/logger');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan((tokens, req, res) => {
  logger.info([
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' '));
}));
server.use(cors());
server.use('/public', express.static('public'));
server.use(routes);

db.connect()
  .then(() => {
    logger.info('Database Connected');
  })
  .catch(() => {
    logger.error('Database not Connected');
  });

redis.redisCheck()
  .then((res) => {
    logger.info(res);
  })
  .catch((err) => {
    logger.error(err);
  });

server.listen(4000, () => {
  logger.info('Server running on port 4000');
});
