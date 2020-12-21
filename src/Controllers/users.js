const users = {};
const model = require('../Models/users');
const respon = require('../Helpers/respon');
const hashPswd = require('../Helpers/hash');
const logger = require('../Helpers/logger');

users.get = async (req, res) => {
  try {
    const result = await model.get();
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

users.add = async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 4) {
      const result = { msg: 'Data tidak lengkap, silahkan isi kembali !' };
      logger.error('Data tidak lengkap, silahkan isi kembali !');
      return respon(res, 209, result);
    }

    const cekName = await model.getByName(req.body.name);
    const cekEmail = await model.getByEmail(req.body.email);

    if (cekName.length !== undefined || cekEmail.length !== undefined) {
      logger.error('Nama / Email sudah terdaftar!');
      return respon(res, 401, { msg: 'Nama / Email sudah terdaftar!' });
    }

    const newPswd = await hashPswd(req.body.pswd);
    const user = {
      name: req.body.name,
      email: req.body.email,
      pswd: newPswd,
      role: req.body.role,
    };
    const result = await model.addUser(user);
    return respon(res, 201, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

users.update = async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 4) {
      const result = { msg: 'Data tidak lengkap, silahkan isi kembali !' };
      logger.error('Data tidak lengkap, silahkan isi kembali !');
      return respon(res, 209, result);
    }
    const newPswd = await hashPswd(req.body.pswd);
    const user = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      pswd: newPswd,
    };
    const result = await model.updateUser(user);
    return respon(res, 201, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

users.del = async (req, res) => {
  try {
    const result = await model.delUser(req.params.id);
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

module.exports = users;
