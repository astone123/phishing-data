const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const db = require('./database');

const app = express();
const port = process.env.PORT || 9000;

// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
const root = {
  message: () => 'Hello World!'
};

app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(port, () => console.log(`Server listening on port ${port}`));
