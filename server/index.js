require('dotenv').config();

const express = require('express');

const app = express();

const PORT = 3000 || process.env.PORT;
const router = require('./routes');

app.use(express.static('client/dist')); // serve up the static files like index.html
app.use(express.json());
app.use('', router);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
