const Sequelize = require('sequelize');
const fetchData = require('./fetch-data');
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
Phish.sync().then(() =>
  /* If there aren't any records in the database, fetch the data from
   PhishTank*/
  Phish.count().then(async count => {
    if (count == 0) {
      const records = await fetchData();
      writeData(JSON.parse(records));
    }
  })
);

const writeData = data => {
  data.slice(0, 500).forEach(record =>
    db.Phish.create({
      url: record.url,
      phishDetailUrl: record.phish_detail_url,
      submissionTime: record.submission_time,
      verified: record.verified == 'yes',
      verificationTime: record.verification_time,
      online: record.online == 'yes',
      ip: record.details[0].ip_address,
      country: record.details[0].country,
      target: record.target
    })
  );
};

const db = { sequelize, Sequelize, Phish };

module.exports = { db, writeData };
