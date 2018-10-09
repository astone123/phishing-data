const rp = require('request-promise');

const { PHISHTANK_API_KEY } = process.env;

const PHISHTANK_DATA_URL = `http://data.phishtank.com/data/${PHISHTANK_API_KEY}/online-valid.json`;

/* If no API key is provided, just fetch the data without one. */
const URL = PHISHTANK_API_KEY
  ? PHISHTANK_DATA_URL
  : 'http://data.phishtank.com/data/online-valid.json';

/* Reach out to PhishTank and get the most recent data. */
const fetchData = async () => {
  console.log('Fetching data...');
  return rp(URL);
};

module.exports = fetchData;
