var dotenv = require('dotenv');

dotenv.load();

console.log(process.env.DATABASE_URL);
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};
    // port: process.env.DB_PORT,
