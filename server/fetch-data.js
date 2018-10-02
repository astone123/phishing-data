const rp = require('request-promise');

const PHISHTANK_DATA_URL = 'http://data.phishtank.com/data/online-valid.json';

/* Reach out to PhishTank and get the most recent data. */
const fetchData = async () => {
  console.log('Fetching data...');
  return rp(PHISHTANK_DATA_URL);
};

module.exports = fetchData;
