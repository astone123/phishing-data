const chai = require('chai');
const rp = require('request-promise');
const should = chai.should();

const { SERVER_URL = 'http://localhost:9000' } = process.env;

const to = promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
};

const PHISH_FIELDS = [
  { name: 'url', type: 'string' },
  { name: 'phishDetailUrl', type: 'string' },
  { name: 'submissionTime', type: 'string' },
  { name: 'verified', type: 'boolean' },
  { name: 'verificationTime', type: 'string' },
  { name: 'online', type: 'boolean' },
  { name: 'ip', type: 'string' },
  { name: 'country', type: 'string' },
  { name: 'target', type: 'string' }
];

const COUNTRY_FIELDS = [
  { name: 'code', type: 'string' },
  { name: 'name', type: 'string' },
  { name: 'coordinates', type: 'array' },
  { name: 'count', type: 'number' }
];

const TARGET_FIELDS = [
  { name: 'target', type: 'string' },
  { name: 'count', type: 'number' }
];

describe('Endpoint Tests', () => {
  it('Should return 404 when an unknown endpoint is requested', async () => {
    const [error, _] = await to(rp(`${SERVER_URL}/bogus-endpoint`));
    error.should.not.be.null;
    error.statusCode.should.equal(404);
  });

  it('Should return data in the correct format', async () => {
    const [_, res] = await to(rp(`${SERVER_URL}/phish`));
    const response = JSON.parse(res);

    response.phishData.length.should.not.equal(0);
    response.countryData.length.should.not.equal(0);
    response.targetCounts.length.should.not.equal(0);

    /* Phish Data */
    response.phishData.forEach(phish => {
      PHISH_FIELDS.forEach(field => {
        phish[field.name].should.exist;
        phish[field.name].should.be.a[field.type];
      });
    });

    /* Country Data */
    response.countryData.forEach(country => {
      COUNTRY_FIELDS.forEach(field => {
        country[field.name].should.exist;
        country[field.name].should.be.a[field.type];
      });
    });

    /* Target Data */
    response.targetCounts.forEach(count => {
      TARGET_FIELDS.forEach(field => {
        count[field.name].should.exist;
        count[field.name].should.be.a[field.type];
      });
    });
  });
});
