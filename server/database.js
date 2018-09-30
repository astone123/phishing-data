const Sequelize = require('sequelize');
const config = require('./config')[process.env.NODE_ENV || 'development'];
const phish = require('./models/Phish');

/* Configure Postgres connection. */
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/* Connect to Postgres database. */
sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

/* Define Phish model. */
const Phish = sequelize.define('phish', phish, {
  freezeTableName: true
});

/* Ensure that the Phish table exists */
Phish.sync();

module.exports = sequelize;
