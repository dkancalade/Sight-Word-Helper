const graphql = require('graphql');

const { buildSchema } = graphql;

const schema = buildSchema(
  `type Query {
      hello: String
  }`,
);

module.exports = schema;
