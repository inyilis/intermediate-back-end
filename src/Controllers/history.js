const history = {};
const model = require('../Models/history');
const respon = require('../Helpers/respon');
const logger = require('../Helpers/logger');

history.get = async (req, res) => {
  try {
    const result = await model.get();
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

history.add = async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 3) {
      logger.error('Data tidak lengkap, silahkan isi kembali !');
      const result = { msg: 'Data tidak lengkap, silahkan isi kembali !' };
      return respon(res, 209, result);
    }
    const result = await model.addHistory(req.body);
    return respon(res, 201, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

history.del = async (req, res) => {
  try {
    const result = await model.delHistory(req.params.id);
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

module.exports = history;
