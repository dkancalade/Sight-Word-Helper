const graphql = require('graphql');

const { buildSchema } = graphql;

const schema = buildSchema(
  `type Query {
      courses: [ String ]
  }`
);

module.exports = schema;


// getListsfromCourse(course: String!): [ String ]
//       getWordsFromList(list: String!): [ String ]