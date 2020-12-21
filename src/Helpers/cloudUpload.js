const { uploader } = require('cloudinary').v2;

const uploads = async (filePath) => {
  try {
    const result = await uploader.upload(filePath, {
      folder: 'products',
      use_filename: true,
    });

    return result.url;
  } catch (error) {
    return error;
  }
};

module.exports = uploads;
