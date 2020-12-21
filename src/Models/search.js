const db = require('../Configs/db');
const logger = require('../Helpers/logger');

const search = {};

search.getName = (query, data) => new Promise((resolve, reject) => {
  db.query(`${query}${data}`)
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({
          id: 1, nama: 'Data Kosong', url_img: '', harga: 0, kategori: 0,
        });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

search.get = (query, data) => new Promise((resolve, reject) => {
  db.query(`${query}${data}`)
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({
          id: 1, nama: 'Data Kosong', url_img: '', harga: 0, kategori: 0,
        });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      logger.error(err);
      reject(err);
    });
});

module.exports = search;
