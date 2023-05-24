const mongoose = require('mongoose');
require('dotenv').config();

async function DBConnection() {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log('Database Connection Successful!');
    })
    .catch(err => console.log(err));
}

module.exports = DBConnection();
