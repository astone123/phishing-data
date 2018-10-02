const databaseConfig = {
  development: {
    username: 'postgres',
    password: '',
    database: '',
    host: 'db',
    dialect: 'postgres',
    url: 'postgresql://postgres@db'
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    url: process.env.DATABASE_URL
  }
};

module.exports = databaseConfig;
