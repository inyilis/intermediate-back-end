const respon = require('../Helpers/respon');
const { redisdb } = require('../Configs/redis');

const getAll = (req, res, next) => {
  redisdb.get('products', (err, data) => {
    if (err) {
      return respon(res, 500, err);
    }

    if (data !== null) {
      const result = JSON.parse(data);
      console.log('Data Dari Redis');
      return respon(res, 200, result);
    }
    return next();
  });
};

module.exports = getAll;
