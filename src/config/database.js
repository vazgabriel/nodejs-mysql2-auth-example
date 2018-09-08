/**
 * Getting mysql as Promise Module
 */
const mysql = require('mysql2/promise');

/**
 * Return a promise where require connection
 */
module.exports = async() => await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'study'
});
