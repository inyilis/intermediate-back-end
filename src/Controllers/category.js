const category = {};
const model = require('../Models/category');
const respon = require('../Helpers/respon');
const logger = require('../Helpers/logger');

category.get = async (req, res) => {
  try {
    const result = await model.get();
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

category.add = async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 1) {
      logger.error('Data tidak lengkap, silahkan isi kembali !');
      const result = { msg: 'Data tidak lengkap, silahkan isi kembali !' };
      return respon(res, 209, result);
    }
    const result = await model.addCategory(req.body);
    return respon(res, 201, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

category.update = async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 2) {
      logger.error('Data tidak lengkap, silahkan isi kembali !');
      const result = { msg: 'Data tidak lengkap, silahkan isi kembali !' };
      return respon(res, 209, result);
    }
    const result = await model.updateCategory(req.body);
    return respon(res, 201, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

category.del = async (req, res) => {
  try {
    const result = await model.delCategory(req.params.id);
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

module.exports = category;
