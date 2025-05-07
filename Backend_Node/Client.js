// client.js
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Jee_Registration_Portal',
  password: 'yashsavera',
  port: 5432,
});

client.connect();

// Export the client to use it in other files
module.exports = client;
