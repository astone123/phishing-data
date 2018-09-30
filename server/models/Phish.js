const Sequelize = require('sequelize');

const Phish = {
  url: {
    type: Sequelize.STRING
  },
  phishDetailUrl: {
    type: Sequelize.STRING,
    field: 'phish_detail_url'
  },
  submissionTime: {
    type: Sequelize.TIME,
    field: 'submission_time'
  },
  verified: {
    type: Sequelize.BOOLEAN
  },
  verificationTime: {
    type: Sequelize.TIME,
    field: 'verification_time'
  },
  online: {
    type: Sequelize.BOOLEAN
  },
  ip: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  target: {
    type: Sequelize.STRING
  }
};

module.exports = Phish;
