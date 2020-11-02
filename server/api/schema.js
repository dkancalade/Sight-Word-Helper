const graphql = require('graphql');

const { buildSchema } = graphql;

const schema = buildSchema(
  `type Query {
      default: String
  }`,
);

module.exports = schema;
