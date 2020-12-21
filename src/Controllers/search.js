const search = {};
const model = require('../Models/search');
const respon = require('../Helpers/respon');
const logger = require('../Helpers/logger');

search.getName = async (req, res) => {
  try {
    const Query = `
        SELECT public.products.id, public.products.nama, public.products.harga, public.products.url_img, public.category.tipe AS "kategori"
        FROM public.products 
        JOIN public.category ON public.products.kategori_id = public.category.id
        `;

    let queryData = '';

    if (Object.keys(req.params).length === 0) {
      queryData = '';
    } else {
      queryData = `WHERE nama LIKE '%${req.params.nama}%'`;
    }

    const result = await model.get(Query, queryData);
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

search.get = async (req, res) => {
  try {
    const Query = `
        SELECT public.products.id, public.products.nama, public.products.harga, public.products.url_img, public.category.tipe AS "kategori"
        FROM public.products 
        JOIN public.category ON public.products.kategori_id = public.category.id
        `;

    let queryData = '';

    if (req.query.nama === 'ASC' || req.query.nama === 'DESC' || req.query.kategori === 'ASC' || req.query.kategori === 'DESC' || req.query.terbaru === 'ASC' || req.query.terbaru === 'DESC' || req.query.harga === 'ASC' || req.query.harga === 'DESC') {
      queryData = 'ORDER BY';
      // Sort nama
      if (req.query.nama === 'ASC') {
        queryData += ' public.products.nama ASC';
      }
      if (req.query.nama === 'DESC') {
        queryData += ' public.products.nama DESC';
      }
      // Sort kategori
      if (req.query.kategori === 'ASC') {
        if (req.query.nama === 'ASC' || req.query.nama === 'DESC') {
          queryData += ', tipe ASC';
        } else {
          queryData += ' tipe ASC';
        }
      }
      if (req.query.kategori === 'DESC') {
        if (req.query.nama === 'ASC' || req.query.nama === 'DESC') {
          queryData += ', tipe DESC';
        } else {
          queryData += ' tipe DESC';
        }
      }
      // Sort terbaru
      if (req.query.terbaru === 'ASC') {
        if (req.query.nama === 'ASC' || req.query.nama === 'DESC' || req.query.kategori === 'ASC' || req.query.kategori === 'DESC') {
          queryData += ', public.products.id ASC';
        } else {
          queryData += ' public.products.id ASC';
        }
      }
      if (req.query.terbaru === 'DESC') {
        if (req.query.nama === 'ASC' || req.query.nama === 'DESC' || req.query.kategori === 'ASC' || req.query.kategori === 'DESC') {
          queryData += ', public.products.id DESC';
        } else {
          queryData += ' public.products.id DESC';
        }
      }
      // Sort harga
      if (req.query.harga === 'ASC') {
        if (req.query.nama === 'ASC' || req.query.nama === 'DESC' || req.query.kategori === 'ASC' || req.query.kategori === 'DESC' || req.query.terbaru === 'ASC' || req.query.terbaru === 'DESC') {
          queryData += ', harga ASC';
        } else {
          queryData += ' harga ASC';
        }
      }
      if (req.query.harga === 'DESC') {
        if (req.query.nama === 'ASC' || req.query.nama === 'DESC' || req.query.kategori === 'ASC' || req.query.kategori === 'DESC' || req.query.terbaru === 'ASC' || req.query.terbaru === 'DESC') {
          queryData += ', harga DESC';
        } else {
          queryData += ' harga DESC';
        }
      }
    } else {
      queryData = '';
    }
    // else if (Object.keys(req.query).length === 0) {
    //   queryData = '';
    // } else {
    //   queryData = `WHERE nama LIKE '%${req.query.nama}%'`;
    // }
    // console.log(`${Query}${queryData}`);
    // Kirim Query ke Model
    const result = await model.get(Query, queryData);
    return respon(res, 200, result);
  } catch (error) {
    logger.error(error);
    return respon(res, 500, error);
  }
};

module.exports = search;
