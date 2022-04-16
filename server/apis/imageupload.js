const axios = require('axios');
const FormData = require('form-data');

module.exports = (file) => {
  const form = new FormData();
  form.append('image', Buffer.from(file.buffer).toString('base64'));
  form.append('key', process.env.IMAGEBB_API_KEY);
  // Attempt to upload image to ImageBB; return promise:
  return axios.post(
    'https://api.imgbb.com/1/upload',
    form,
    { headers: form.getHeaders() },
  );
};
