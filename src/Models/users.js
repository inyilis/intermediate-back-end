const db = require('../Configs/db');
const logger = require('../Helpers/logger');

const users = {};

users.get = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM public.users ORDER BY id DESC')
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({ msg: 'Data Kosong' });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

users.getByEmail = (email) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM public.users WHERE email = '${email}'`)
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({ msg: 'Data Kosong' });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

users.getByName = (name) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM public.users WHERE name = '${name}'`)
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({ msg: 'Data Kosong' });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

users.addUser = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO public.users(name, email, pswd, role)
            VALUES ('${data.name}', '${data.email}', '${data.pswd}', '${data.role}')`)
    .then(() => {
      resolve(data);
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

users.updateUser = (data) => new Promise((resolve, reject) => {
  db.query(`UPDATE public.users SET name='${data.name}', email='${data.email}', pswd='${data.pswd}' WHERE id = ${data.id}`)
    .then(() => {
      resolve(data);
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

users.delUser = (id) => new Promise((resolve, reject) => {
  db.query(`DELETE FROM public.users WHERE id = ${id}`)
    .then(() => {
      resolve('Deleted');
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

module.exports = users;
