const graphql = require('graphql');

const { buildSchema } = graphql;

const schema = buildSchema(
  `type Query {
      Courses: [ String ]
      getListsfromCourse(course: String!): [ String ]
      getWordsFromList(list: String!): [ String ]
`);

module.exports = schema;
