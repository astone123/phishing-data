const Sequelize = require('sequelize');
const fetchData = require('./fetch-data');
const config = require('./config')[process.env.NODE_ENV || 'development'];
const phish = require('./models/Phish');

const { RECORD_LIMIT = 2000 } = process.env;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/* Configure Postgres connection. */
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/* Define Phish model. */
const Phish = sequelize.define('phish', phish, {
  freezeTableName: true
});
let db;

(async () => {
  /* Connect to Postgres database. When it starts up for the first time it creates volumes which
  takes a while. Hence the sleep timer. */
  console.log('Waiting for database...');
  await sleep(12000);
  await sequelize
    .authenticate()
    .then(() => {
      console.log('Successfully connected to the database');
    })
    .catch(err => {
      console.log('Unable to connect to the database:', err);
    });

  /* Ensure that the Phish table exists */
  Phish.sync().then(() => {
    /* If there aren't any records in the database, fetch the data from
   PhishTank. */
    Phish.count().then(async count => {
      if (count == 0) {
        const records = await fetchData();
        const recordsParsed = JSON.parse(records);
        await writePhishData(recordsParsed.splice(0, RECORD_LIMIT));
      }
    });
  });
})();

db = { sequelize, Sequelize, Phish };

const writePhishData = data => {
  return data.forEach(record =>
    Phish.create({
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

module.exports = { db, writePhishData };
