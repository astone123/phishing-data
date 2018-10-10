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

describe('Server Tests', function() {
  describe('Endpoint Tests', function() {
    it('Should return 404 when an unknown endpoint is requested', async () => {
      const [error, _] = await to(rp(`${SERVER_URL}/bogus-endpoint`));
      error.should.not.be.null;
      error.statusCode.should.equal(404);
    });
  });
});
